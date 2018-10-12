//выбор диапазона эксплуатации
Vue.component('years-selector', {
    data: function () {
      return {
        //yearsFromTo будет формироваться динамически от года появления модели
        //            ДО текущего года
        yearsFromTo: ['2010','2011','2012','2013','2014','2015','2016','2017','2018'], //года в диапазоне ОТ ДО
        selectedYearFrom:'',//выбранный год ОТ
        selectedYearTo:''//выбранный год ДО
      }
    },
    methods: {
      getValidYears: function () {
        console.log('years-selectort->getValidYears: FROM:%s TO:%s', this.selectedYearFrom, this.selectedYearTo);
      }
    },   
    template: `
      <div>
        <select v-model="selectedYearFrom">
            <option v-for="year in yearsFromTo">
                {{ year }}
            </option>
        </select>
        <select v-model="selectedYearTo">
            <option v-for="year in yearsFromTo">
                {{ year }}
            </option>
        </select>
      </div>
    `
  })