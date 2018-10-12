//список брэндов
Vue.component('brand-list', {
    data: function () {
      return {
        brands: ['Select a brand...','Brilliance', 'Ford', 'Toyota','Mazda','BMW'],//массив заказов
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
    template: `
      <div>
        <select v-model="selected" v-on:change="getModels">
          <option v-for="brand in brands">
            {{ brand }}
          </option>
        </select>
        <models-list v-show = "seen" v-bind:selectedBrand = "selectedBrand" >  </models-list>
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