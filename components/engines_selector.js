//выбор типа двигателя доступного для данной модели
Vue.component('engine-selector', {
    data: function () {
      return {
        engines: ['Gasoline','Diesel','Hybrid','Electric'], //доступные типы двигателей
        selectedEngine:''//выбранный двигатель
      }
    },
    methods: {
      getEngines: function () {
        console.log('engine-selector->geEngines: %s', this.selectedEngine);
      }
    },   
    template: `
        <div>
            <u>Select Engine Type</u></br>
            <template v-for="engine in engines">
                <input type="radio" v-bind:value="engine" v-model="selectedEngine">
                <label>{{engine}}</label><br>
            </template>
        </div>
    `
  })
/*
<span>Выбрано:{{selectedMotors}}</span>
*/