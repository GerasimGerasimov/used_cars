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