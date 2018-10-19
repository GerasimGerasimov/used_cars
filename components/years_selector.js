//выбор года появления модели
Vue.component('year-selector', {
    props: {
      years:{//года выпуска
        type: Array,
        default: function(){
          return []
        }
      }
    },
    data: function () {
      return {
        selectedYear:'',//выбранный год ОТ
      }
    },
    methods: {
      onChange: function () {
        console.log('years-selectort->getSelectYear: FROM:%s', this.selectedYear);
        var value = this.selectedYear;
        this.$emit('select-year', value);
      }
    },   
    template: `
        <select v-model="selectedYear" v-on:change="onChange">
          <option v-for="year in years">
            {{ year }}
          </option>
        </select>
    `
  })

  /*
        <select v-model="selectedYear" v-on:change="onChange">
            
            <option v-for="year in years">
                {{ year }}
            </option>
        </select>
    `
  */