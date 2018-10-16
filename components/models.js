//список автомобилей заданного брэнда
Vue.component('models-list', {
    props: {
      selectedBrand: ''
    },
    data: function () {
      return {
        models: ['Select a model...'], //существующие модели этого брэнда
        model:'Select a model...',   //выбранная модель
        years: [], //года выпуска
        selectedYear:'',//выбранный год
        engines:[],//типы двигателей
        selectedEngine:'',//выбранный двигатель
        gearboxes:[],//типы трансмиссий
        selectedGearBox:'',//выбранная трансмиссия
        mileage:''//пробег
      }
    },
    watch: {
      // эта функция запускается при любом изменении selectedBrand
      selectedBrand: function () {
        console.log('models-list->selectedBrand:',this.selectedBrand);
        this.model  =  'Select a model...';
        this.models = [this.model];
        if (this.selectedBrand !='')
          this.getBrandModels(this.selectedBrand);
      }
    },
    methods: {
      getBrandModels: function (brand) {
          var url = "https://uscar.ga/data/get_models_for="+brand;
          axios
            .get(url)
            .then(response => {
              this.models = response.data;// JSON.parse(response.data);
              this.model  = 'Select a model...';
              this.models.splice(0,0,this.model);
              console.log(this.models);
            })
            .catch(error => {
              console.log(error);
              this.model  =  'Select a model...';
              this.models    =  [this.model];
            })
      },
      
      //получить год выпуска модели
      getYears: function () {
          this.years = [];//смена модели, обнуляет список лет
          /* data/get_years_for/<brandname>&<modelname> */
          console.log('model-list->getYears:', this.model);
          var url = "https://uscar.ga/data/get_years_for="+
                      this.selectedBrand+'&'+
                        this.model;
          axios
            .get(url)
            .then(response => {
              this.years = response.data;//JSON.parse(response.data);
              console.log('model-list->getYears:', this.model,'->', this.years);
            })
            .catch(error => {
              console.log(error);
              this.years = [];
            })
        },
      //событие "выбран год выпуска модели"
      onSelectYear:function(value){
        console.log('model-list->onSelectYear:', value);
        this.selectedYear = value;
        //узнать доступные для брэнда/модели/года - доступные движки
        // /data/get_engines_for/<brandname>&<modelname>&<year>
        var url = "https://uscar.ga/data/get_engines_for="+
                      this.selectedBrand+'&'+
                        this.model+'&'+
                          this.selectedYear;
          axios
            .get(url)
            .then(response => {
              this.engines = response.data;//JSON.parse(response.data);
              console.log('model-list->getSelectYears:', this.model,'->', this.engines);
            })
            .catch(error => {
              console.log(error);
              this.engines = [];
            })
      },
      //событие "выбран двигатель"
      onSelectEngine:function(value){
        console.log('model-list->onSelectEngine:', value);
        this.selectedEngine = value;
        //узнать доступные для брэнда/модели/года/двигателя - доступные трансмиссии
        // /data/get_gearboxes_for/<brandname>&<modelname>&<year>&<engine>
        var url = "https://uscar.ga/data/get_gearboxes_for="+
                      this.selectedBrand+'&'+
                        this.model+'&'+
                          this.selectedYear+'&'+
                            this.selectedEngine;
          axios
            .get(url)
            .then(response => {
              this.gearboxes = response.data;//JSON.parse(response.data);
              console.log('model-list->getSelectYears:', this.model,'->', this.gearboxes);
            })
            .catch(error => {
              console.log(error);
              this.gearboxes = [];
            })
      },
      //событие "выбран тип трансмиссии"
      onSelectGearBox:function(value){
        console.log('model-list->onSelectGearBox:', value);
        this.selectedGearBox = value;
      }
    },

    computed: {
      //если не выбрана модель, то все зависимые блоки скрыты
      seen: function (){
        var res = (this.model == 'Select a model...')? false: true;
        console.log('models-list->seen:',this.model,':',res);
        return res;  
      }
    },
    template: `
      <div>
        <select v-model="model" v-on:change="getYears">
          <option v-for="model in models" v-bind:value="model">
            {{ model }}
          </option>
        </select>
        <div v-show = "seen">
          <year-selector    v-bind:years     = "years"     v-on:select-year   ="onSelectYear"></year-selector>
          <engine-selector  v-bind:engines   = "engines"   v-on:select-engine ="onSelectEngine"></engine-selector>
          <gearbox-selector v-bind:gearboxes = "gearboxes" v-on:select-gearbox="onSelectGearBox"></gearbox-selector>
          <label>Пробег</label>
          <input type="text" v-model="mileage"></br>
          <button>Submit</button>
        </div>
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