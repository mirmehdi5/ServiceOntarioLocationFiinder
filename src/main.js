import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import "./assets/style.css";
import * as VueGoogleMaps from "vue2-google-maps";
import VueGeolocation from "vue-browser-geolocation";
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDDop_7W3xKiXou6xXa7H3pCkiLeKJnMew",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
