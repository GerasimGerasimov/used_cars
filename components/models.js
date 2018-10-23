//список автомобилей заданного брэнда
Vue.component('models-list', {
    props: {
      selectedBrand:{//строка брэндов
        type: String,
          default: function(){
          return 'Select a brand...'
        }
      }
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
        mileage:'',//пробег
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
        this.gearboxes=[];//типы трансмиссий
        this.selectedGearBox='';//выбранная трансмиссия
        this.mileage='';//пробег
        this.Cost = '';//цена
        if (this.selectedBrand !='')
          this.getBrandModels(this.selectedBrand);
      }
    },
    methods: {
      getBrandModels: function (brand) {
        if (DEBUG_MODE) {
          console.log("models-list->getBrandModels->DEBUG_MODE");
          this.models = getDebugModels (brand);
          this.models.sort();//сортировка
          this.model  = 'Select a model...';
          this.models.splice(0,0,this.model);
          console.log(this.models);
          //почистить предыдущий выбор
          this.years = []; //года выпуска
          this.selectedYear ='';//выбранный год
          this.engines=[];//типы двигателей
          this.selectedEngine='';//выбранный двигатель
          this.gearboxes=[];//типы трансмиссий
          this.selectedGearBox='';//выбранная трансмиссия
          this.Cost = '';//цена
          //////////////////////////////////////////////
          return;
        }
          var url = "https://uscar.ga/data/get_models_for="+brand;
          axios
            .get(url)
            .then(response => {
              this.models = response.data;// JSON.parse(response.data);
              this.models.sort();//сортировка
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
        //почистить предыдущий выбор
        this.years = []; //года выпуска
        this.selectedYear ='';//выбранный год
        this.engines=[];//типы двигателей
        this.selectedEngine='';//выбранный двигатель
        this.gearboxes=[];//типы трансмиссий
        this.selectedGearBox='';//выбранная трансмиссия
        this.Cost = '';//цена
        //////////////////////////////////////////////
        if (DEBUG_MODE) {
          console.log("models-list->getYears->DEBUG_MODE");
          this.years = getDebugYears();
          this.years.sort();//сортировка
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
              this.years.sort();//сортировка
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
         //почистить предыдущий выбор
        this.engines=[];//типы двигателей
        this.selectedEngine='';//выбранный двигатель
        this.gearboxes=[];//типы трансмиссий
        this.selectedGearBox='';//выбранная трансмиссия
        this.Cost = '';//цена
        //////////////////////////////////////////////
        if (DEBUG_MODE) {
          console.log("models-list->onSelectYear->DEBUG_MODE");
          this.engines = getDebugEngines();
          this.engines.sort();//сортировка
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
              this.engines.sort();//сортировка
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
         //почистить предыдущий выбор
         this.gearboxes=[];//типы трансмиссий
         this.Cost = '';//цена
         //this.selectedGearBox='';//выбранная трансмиссия
        if (DEBUG_MODE) {
          console.log("models-list->onSelectEngine->DEBUG_MODE");
          this.gearboxes = getDebugGearBoxes();
          this.gearboxes.sort();//сортировка
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
              this.gearboxes.sort();//сортировка
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
        //почистить предыдущий выбор
        this.Cost = '';//цена
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
            if (a.hasOwnProperty ('avg_price'))
              this.Cost = addPriceSpaces(a.avg_price);
            else
              this.Cost = app_data_cost_error();
         })
         .catch (error =>{
           console.log(error);
           this.Cost = "повторите запрос";
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
      seenIfYearSelected:function (){
        var res = (this.selectedYear == '')? false: true;
        console.log('models-list->seenIfYearSelected:',this.selectedYear,':',res);
        return res;  
      },
      seenIfEngineSelected:function (){
        var res = (this.selectedEngine == '')? false: true;
        console.log('models-list->seenIfEngineSelected:',this.selectedEngine,':',res);
        return res;  
      },
      seenIfGearBoxSelected:function (){
        var res = (this.selectedGearBox == '')? false: true;
        console.log('models-list->seenIfGearBoxSelected:',this.selectedGearBox,':',res);
        return res;  
      },
      seenIfMileageSelected:function (){
        var res = (this.mileage == '')? false: true;
        console.log('models-list->seenIfMileageSelected',this.mileage,':',res);
        return res;  
      },
      //Изменения стилей
      //если в цене ошибка то показываю стиль cost-error
      isCostError: function (){
        if (!isNumericSimple(this.Cost)) {
          return true;
        }
        return false;
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
          <div v-show = "seenIfYearSelected">
            <engine-selector  v-bind:engines   = "engines"   v-on:select-engine ="onSelectEngine"></engine-selector>
            <div v-show = "seenIfEngineSelected">
              <gearbox-selector
                v-bind:gearboxes = "gearboxes"
                v-on:select-gearbox="onSelectGearBox">
              </gearbox-selector>
              <div v-show = "seenIfGearBoxSelected">
                <hr>
                <input type="text" v-model="mileage" placeholder="Пробег"></br>
                <hr>
                <div v-show = "seenIfMileageSelected">
                  <button v-on:click ="getPrice">Узнать цену</button>
                  <p class="cost" v-bind:class="{ cost_error : isCostError}" >{{Cost}}</p>
                </div>              
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
  
/*
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
*/