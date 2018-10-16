var app = new Vue({
  el: '#app',
  data: {
    message: 'Оценка подержанных автомобилей',
  },
  template:`
  <div>
    <brand-list> </brand-list>
  </div>
  `
})

/*
  /data/get_brands
        * /data/get_models_for=brandname
        * /data/get_years_for/<brandname>&<modelname>
        * /data/get_engines_for/<brandname>&<modelname>&<year>
        * /data/get_gearboxes_for/<brandname>&<modelname>&<year>&<engine>
*/

/*
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