var app = new Vue({
  el: '#app',
  data: {
    message: 'Оценка подержанных автомобилей',
  },
  template:`
  <div class="wrapper">
    <div class="header">
      USEDCARS
      <p class="header_info">on-line сервис оценки автомобилей с пробегом</p>
    </div>
    <div class="content">
      <brand-list> </brand-list>
    </div>
    <div class="footer">2018 usedcars &#169</div>
  </div>
  `
})

/* 17.10.2018
  /data/get_brands
        * /data/get_models_for=brandname
        * /data/get_years_for=<brandname>&<modelname>
        * /data/get_engines_for=<brandname>&<modelname>&<year>
        * /data/get_gearboxes_for=<brandname>&<modelname>&<year>&<engine>
        * 
  https://uscar.ga//search?brand=Brilliance&model=M2 (BS4) I&year=2009&kmage=1000&engine=1.8 л&gearbox=механика
*/

/* 15.10.2018
* /data/get_brands
        * /data/get_models_for/<brandname>
        * /data/get_years_for/<brandname>&<modelname>
        * /data/get_engines_for/<brandname>&<modelname>&<year>
        * /data/get_gearboxes_for/<brandname>&<modelname>&<year>&<engine>

*/
/*

    <button v-on:click="getOrdersInfo">{{message}}</button>
  <div>
    <button v-on:click="getOrdersInfo">{{}}</button>
    <ol>
      <li v-for="order in orders">
        <process-diagram
          v-bind:orderInfo = order>
        </process-diagram>
      </li>
    </ol>
  </div>
  `
*/