//выбор типа трансмиссии доступного для данной модели
Vue.component('gearbox-selector', {
    props: {
      gearboxes:{//доступные коробки
        type: Array,
          default: function(){
          return []
        }
      }
      /*,
      selectedGearBox:{//доступные коробки
        type: String,
          default: function(){
          return ''
        }
      }*/
    },
    data: function () {
      return {
        selectedGearBox:null//выбранный тип трансмиссии
      }
    },
    methods: {
      getGearBox: function () {
        console.log('gearbox-selector->getGearBox: %s',
                        this.selectedGearBox);
      },
      onChange: function (e) {
        //value = e.target.value;
        console.log('gearbox-selector->-onChange:', this.selectedGearBox);
        var value = this.selectedGearBox;
        this.$emit('select-gearbox', value);
      }
    },   
    template: `
        <div>
          <hr>
            <template v-for="gearbox in gearboxes">
                <label>{{gearbox}}</label>
                <input type="radio"
                    v-bind:value="gearbox"
                      v-model="selectedGearBox"
                        v-on:change="onChange">
                <br>
            </template>
        </div>
    `
  })
/*
        <div>
          <hr>
            <template v-for="gearbox in gearboxes">
                <label>{{gearbox}}
                  <input type="radio"
                    v-bind:value="gearbox"
                      v-model="selectedGearBox"
                        v-on:change="onChange">
                </label><br>
            </template>
        </div>
*/