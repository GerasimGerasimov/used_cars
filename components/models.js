//список автомобилей заданного брэнда
Vue.component('models-list', {
    props: {
      selectedBrand: ''
    },
    data: function () {
      return {
        models: ['Select a model...'], //существующие модели этого брэнда
        selected:'Select a model...',   //выбранная модель
        mileage:''//пробег
      }
    },
    watch: {
      // эта функция запускается при любом изменении selectedBrand
      selectedBrand: function () {
        console.log('models-list->selectedBrand:',this.selectedBrand);
        this.selected  =  'Select a model...';
        this.models = [this.selected];
        if (this.selectedBrand !='')
          this.getBrandModels(this.selectedBrand);
      }
    },
    methods: {
      getBrandModels: function (brand) {
          var url = "https://uscar.ga/data/get_models_for/"+brand;
          axios
            .get(url)
            .then(response => {
              this.models = JSON.parse(response.data);
              this.selected  = 'Select a model...';
              this.models.splice(0,0,this.selected);
              console.log(this.models);
            })
            .catch(error => {
              console.log(error);
              this.selected  =  'Select a model...';
              this.models    =  [this.selected];
            })
      }
    },
    computed: {
      //если не выбрана модель, то все зависимые блоки скрыты
      seen: function (){
        var res = (this.selectedBrand == '')? false: true;
        console.log('models-list->seen:',this.selectedBrand,':',res);
        return res;  
      }
    },
    template: `
      <div>
        <select v-model="selected">
          <option v-for="model in models" v-bind:value="model">
            {{ model }}
          </option>
        </select>
        <years-selector></years-selector>
        <engine-selector></engine-selector>
        <transmission-selector></transmission-selector>
        <label>Пробег</label>
        <input type="text" v-model="mileage"></br>
        <button>Submit</button>
      </div>
    `
  })
  
  /*
   <span>Выбрано: {{ selectedBrand }}</span>


        /*selectedBrand: function (newValue, oldValue) {
        console.log(this.selected+': from '+oldValue+' to '+newValue);
        if (newValue != '')
          this.getBrandModels(newValue);
        else
          this.models = [];
      } 
  */