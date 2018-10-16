//список брэндов
Vue.component('brand-list', {
    data: function () {
      return {
        brands: ['Select a brand...'],//массив заказов
        selected: 'Select a brand...',
        selectedBrand:''//выбранный брэнд минуя 'Select a brand...'
      }
    },
    methods: {
      getModels: function () {
        this.selectedBrand = this.selected;
        if (this.selected == this.brands[0])
            this.selectedBrand = '';
        console.log('brand-list->getModels:', this.selectedBrand);
      }
    },
    computed: {
      //если не выбран брэнд то див-блок с моделями скрыт
      seen: function (){
        var res = (this.selectedBrand == '')? false: true;
        console.log('brand-list->seen:',this.selectedBrand,':',res);
        return res;  
      }
    },    
    created: function () {
      console.log("brand-list->created");
      var url = "https://uscar.ga/data/get_brands";
      axios
        .get(url)
        .then(response => {
          this.brands = JSON.parse(response.data);
          this.selected  = 'Select a brand...';
          this.brands.splice(0,0,this.selected);
          console.log(this.models);
        })
        .catch(error => {
          console.log(error);
          this.selected  =  'Select a brand...';
          this.brands    =  [this.selected];
        })
    },
    template: `
      <div>
        <select v-model="selected" v-on:change="getModels">
          <option v-for="brand in brands">
            {{ brand }}
          </option>
        </select>
        <models-list v-show = "seen" v-bind:selectedBrand = "selectedBrand">  </models-list>
      </div>
    `
  })
  
  /*
        <span>Выбрано: {{ selected }}</span>
        <ul>
          <li v-for="(model, index) in models">
            {{ index }}:{{ model }}
          </li>
        </ul>  
  */