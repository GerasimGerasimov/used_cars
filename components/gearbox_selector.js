//выбор типа трансмиссии доступного для данной модели
Vue.component('gearbox-selector', {
    props: {
      gearboxes:{//доступные коробки
        type: Array,
          default: function(){
          return []
        }
      }
    },
    data: function () {
      return {
        selectedGearBox:''//выбранный тип трансмиссии
      }
    },
    methods: {
      getGearBox: function () {
        console.log('gearbox-selector->getGearBox: %s',
                        this.selectedGearBox);
      },
      onChange: function () {
        console.log('gearbox-selector->-onChange:', this.selectedGearBox);
        var value = this.selectedGearBox;
        this.$emit('select-gearbox', value);
      }
    },   
    template: `
        <div>
            <template v-for="gearbox in gearboxes">
                <label>{{gearbox}}
                  <input type="radio"
                    v-bind:value="gearbox"
                      v-model="selectedGearBox"
                        v-on:change="onChange">
                </label><br>
            </template>
        </div>
    `
  })
