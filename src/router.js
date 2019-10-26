import Vue from "vue";
import Router from "vue-router";
import Results from "./components/results.vue";
import Endpoint from "./components/endpoint.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "results",
      component: Results
    },
    {
      path: "/result/:service/:location",
      name: "resultsparam",
      component: Results
    },
    {
      path:
        "/endpoint/:city/:intersection/:cardMessage/:waitTime/:id/:services",
      name: "endpoint",
      component: Endpoint
    }
  ]
});
