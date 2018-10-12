//выбор типа трансмиссии доступного для данной модели
Vue.component('transmission-selector', {
    data: function () {
      return {
        transmissions: ['МКПП','АКПП','Вариатор'], //доступные типы трансмиссий
        selectedTransmission:''//выбранный тип трансмиссии
      }
    },
    methods: {
      getTransmission: function () {
        console.log('transmission-selector->getTransmission: %s',
                        this.selectedTransmission);
      }
    },   
    template: `
        <div>
            <u>Select Transmission Type</u></br>
            <template v-for="transmission in transmissions">
                <input type="radio" v-bind:value="transmission" v-model="selectedTransmission">
                <label>{{transmission}}</label><br>
            </template>
        </div>
    `
  })
