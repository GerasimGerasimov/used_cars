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
        mileage:'5000',//пробег
        Cost:'' //цена
      }
    },
    watch: {
      // эта функция запускается при любом изменении selectedBrand
      selectedBrand: function () {
        console.log('models-list->selectedBrand:',this.selectedBrand);
        //при смене брэнда, все предыдущие записи очищаю
        this.model  =  'Select a model...';
        this.models = [this.model];
        this.years = []; //года выпуска
        this.selectedYear ='';//выбранный год
        this.engines=[];//типы двигателей
        this.selectedEngine='';//выбранный двигатель
        this.gearboxe=[];//типы трансмиссий
        this.selectedGearBox='';//выбранная трансмиссия
        this.mileage='5000';//пробег
        if (this.selectedBrand !='')
          this.getBrandModels(this.selectedBrand);
      }
    },
    methods: {
      getBrandModels: function (brand) {
        if (DEBUG_MODE) {
          console.log("models-list->getBrandModels->DEBUG_MODE");
          this.models = getDebugModels (brand);
          this.model  = 'Select a model...';
          this.models.splice(0,0,this.model);
          console.log(this.models);
          return;
        }
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
        if (DEBUG_MODE) {
          console.log("models-list->getYears->DEBUG_MODE");
          this.years = getDebugYears();
          console.log(this.years);
          return;
        }
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
        this.selectedYear = value;
        if (DEBUG_MODE) {
          console.log("models-list->onSelectYear->DEBUG_MODE");
          this.engines = getDebugEngines();
          console.log(this.engines);
          return;
        }
        console.log('model-list->onSelectYear:', value);
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
        if (DEBUG_MODE) {
          console.log("models-list->onSelectEngine->DEBUG_MODE");
          this.gearboxes = getDebugGearBoxes();
          console.log(this.gearboxes);
          return;
        }
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
      },
      //отправка POST запроса на сервер и получение от него цены и JSON
      getPrice:function(){
        if (DEBUG_MODE) {
          console.log("models-list->getPrice->DEBUG_MODE");
          this.Cost = getDebugPrice();
          console.log(this.Cost);
          return;
        }
        //brand=Brilliance&model=M2 (BS4) I&year=2009&kmage=1000&engine=1.8 л&gearbox=механика
        var s = 'brand='+(this.selectedBrand)+'&'+
                  'model='+(this.model)+'&'+
                    'year='+(this.selectedYear)+'&'+
                      'kmage='+(this.mileage)+'&'+
                        'engine='+(this.selectedEngine)+'&'+
                          'gearbox='+(this.selectedGearBox);
        console.log('postData:',s);
         axios ({
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: 'https://uscar.ga/search',
            data: s
         })
         .then (response=>{
           console.log('model-list->getPrice:',response.data);
           var a = response.data;
           this.Cost = a.avg_price;
         })
         .catch (error =>{
           console.log(error);
         })
      }
    },

    computed: {
      //если не выбрана модель, то все зависимые блоки скрыты
      seen: function (){
        var res = (this.model == 'Select a model...')? false: true;
        console.log('models-list->seen:',this.model,':',res);
        return res;  
      },
      seenAtferYear:function (){
        var res = (this.selectedYear == '')? false: true;
        console.log('models-list->seenAtferYear:',this.selectedYear,':',res);
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
          <div v-show = "seenAtferYear">
            <hr>
            <engine-selector  v-bind:engines   = "engines"   v-on:select-engine ="onSelectEngine"></engine-selector>
            <hr>
            <gearbox-selector v-bind:gearboxes = "gearboxes" v-on:select-gearbox="onSelectGearBox"></gearbox-selector>
            <hr>
            <label style="width:49%">Пробег</label>
            <input style="width:49%" type="text" v-model="mileage"></br>
            <hr>
            <button v-on:click ="getPrice">Узнать цену</button>
            <p class="cost">{{Cost}}</p>
          </div>
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