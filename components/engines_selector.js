//выбор типа двигателя доступного для данной модели
Vue.component('engine-selector', {
    props: {
      engines:{//доступные типы двигателей
        type: Array,
        default: function(){
          return []
        }
      }
    },
    data: function () {
      return {
        selectedEngine:''//выбранный двигатель
      }
    },
    methods: {
      getEngines: function () {
        console.log('engine-selector->geEngines: %s', this.selectedEngine);
      },
      onChange: function () {
        console.log('engine-selector->-onChange: FROM:%s', this.selectedEngine);
        var value = this.selectedEngine;
        this.$emit('select-engine', value);
      }
    },   
    template: `
        <div>
            <u>Engine:</u></br>
            <template v-for="engine in engines">
                <input type="radio"
                  v-bind:value="engine"
                    v-model="selectedEngine"
                      v-on:change="onChange">
                <label>{{engine}}</label><br>
            </template>
        </div>
    `
  })
/*
<span>Выбрано:{{selectedMotors}}</span>
*/