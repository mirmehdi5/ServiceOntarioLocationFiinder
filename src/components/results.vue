<template>
  <div class="container">
    <b-row class="noleft-right-margin">
      <a href="https://www.ontario.ca/page/serviceontario">ServiceOntario</a>
      <img src="/arrow.png" alt="arrow" class="arrow" />
      <p>Find a ServiceOntario</p>
    </b-row>

    <b-row class="noleft-right-margin top-padding-one">
      <h3 style=" font-weight:bold; font-family:'Raleway'">Find a ServiceOntario</h3>
    </b-row>
    <b-row>
      <b-col sm="12" md="5" class="padding-right-one">
        <b-row>
          <b-col cols="7">
            <b style="font-family:'Raleway';">Search for locations</b>
          </b-col>

          <b-col style="font-size:12px;text-align:right;">
            <div class="link-text" @click="mylocate">Use Current Location</div>
          </b-col>
        </b-row>
        <div>
          <div style="border: 1px solid #999; border-radius:5px;">
            <b-row style="padding-right: 0rem;border: none;width: 100%;">
              <b-col>
                <places
                  style="border: none;"
                  placeholder="Enter a location"
                  :options="{ countries: 'ca' }"
                  v-model="address"
                  @change="changed"
                ></places>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>

      <b-col sm="12" md="7" class="padding-right-one mobile-padding-top-two">
        <div>
          <b style="font-family:'Raleway';">Filter by service(s)</b>
        </div>
        <div>
          <multiselect
            openDirection="below"
            selectLabel
            v-model="chosenFilters"
            placeholder="Enter a service"
            @input="optionSelected"
            @remove="removeFromArray"
            :options="options"
            :multiple="true"
            tagPlaceholder
            :hide-selected="true"
          ></multiselect>
        </div>
      </b-col>
    </b-row>
    <hr />
    <b-row>
      <b-col sm="12" md="5" style="overflow:scroll;  height:58vh">
        <div v-if="goData.length===0">
          <p>To find out if a service is available near you, enter your location and the services you need</p>
        </div>

        <div
          v-for="(value,i) in goData"
          :key="value.id"
          :ref="`card_${value.id}`"
          class="padding-bottom-one"
        >
          <router-link
            v-if="goData"
            :to="{ name: 'endpoint' , params: { city:value._source.city, intersection:value._source.intersection ,cardMessage:value._source.cardMessage,waitTime:value._source.waitTime,id:value._source.id, services:String(value._source.services)}}"
          >
            <b-row class="card-header centre-content grey-border">
              <b-col cols="7" class="head">
                <h6 v-if="currentPage < 2" class="title-card">{{i+1}}{{". "}}{{value._source.city}}</h6>
                <h6 v-else class="title-card">{{i+5}}{{". "}}{{value._source.city}}</h6>
              </b-col>

              <b-col cols="3" class="black-color text-location">
                <b-row class="no-left-padding no-right-padding">
                  <img src="/loc.png" class="one-width" />
                  {{value.sort[0].toFixed(1)}} km
                </b-row>
              </b-col>
            </b-row>
          </router-link>
          <b-card class="card">
            <b-row>
              <b-col cols="11">
                <b-row class="top-padding-half">
                  <b-col cols="12">
                    <router-link
                      v-if="goData"
                      :to="{ name: 'endpoint' , params: { city:value._source.city, intersection:value._source.intersection ,cardMessage:value._source.cardMessage,waitTime:value._source.waitTime,id:value._source.id, services:String(value._source.services)}}"
                    >
                      <p
                        class="card-font point-two-bottom-margin margin-top-one"
                      >{{value._source.name}}</p>
                    </router-link>
                    <p class="point-two-bottom-margin">
                      <span class="card-font">Phone:</span>
                      <a
                        :href="'tel:'+value._source.displayNumber"
                      >{{" "}}{{value._source.displayNumber}}</a>
                    </p>
                  </b-col>
                </b-row>

                <router-link
                  v-if="goData"
                  :to="{ name: 'endpoint' , params: { city:value._source.city, intersection:value._source.intersection ,cardMessage:value._source.cardMessage,waitTime:value._source.waitTime,id:value._source.id, services:String(value._source.services)}}"
                >
                  <b-row class="card-font">
                    <b-col>
                      <p :class="timeMessage(value._source.cardMessage)">
                        <span v-if="!value._source.cardMessage.includes('Closed')">
                          <b class="black-color">Open</b>
                        </span>
                        {{value._source.cardMessage}}
                      </p>
                      <b-col>
                        <b-row v-if="!value._source.cardMessage.includes('Closed')">
                          Average wait time:
                          <p
                            class="time"
                            :class="waitTimeColor(value._source.waitTime)"
                            v-if="value._source.waitTime<60 && value._source.waitTime >0 "
                          >{{value._source.waitTime}} min</p>
                          <p
                            v-else-if="value._source.waitTime < 0"
                            class="time"
                            :class="waitTimeColor(value._source.waitTime)"
                          >not tracked</p>
                          <p
                            v-else
                            class="time"
                            :class="waitTimeColor(value._source.waitTime)"
                          >over 1hr</p>
                        </b-row>
                      </b-col>
                    </b-col>
                  </b-row>
                </router-link>
              </b-col>

              <div class="centre-content">
                <router-link
                  v-if="goData"
                  :to="{ name: 'endpoint' , params: { city:value._source.city, intersection:value._source.intersection ,cardMessage:value._source.cardMessage,waitTime:value._source.waitTime,id:value._source.id, services:String(value._source.services)}}"
                >
                  <img src="/slide.png" width="18px" />
                </router-link>
              </div>
            </b-row>
          </b-card>
        </div>
        <b-row v-if="goData.length!==0" class="margin-top-one">
          <b-col v-if="totalCards > 4" @click="pageChange('0')" :class="paginate('-1')">Prev</b-col>
          <b-col v-if="totalCards < 4" @click="pageChange('0')" :class="paginate('-1')">Prev</b-col>
          <b-col @click="pageChange('0')" :class="paginate('0')">1</b-col>
          <b-col v-if="totalCards < 4" :class="paginate('-1')">Next</b-col>
          <b-col v-if="totalCards > 4" @click="pageChange('4')" :class="paginate('4')">2</b-col>
          <b-col v-if="totalCards > 4" @click="pageChange('4')" :class="paginate('4')">Next</b-col>
        </b-row>
      </b-col>
      <b-col class="hidden-xs" md="7">
        <gmap-map id="op" :center="center" :zoom="zoom" style="width:100%; height: 58vh;">
          <gmap-marker
            v-for="(item, key) in goData"
            :key="key"
            :position="getPosition(item)"
            :clickable="true"
          />
        </gmap-map>
      </b-col>
    </b-row>
  </div>
</template>
 
<script>
import Places from "vue-places";
import Multiselect from "vue-multiselect";
import "vue-simple-suggest/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "results",
  components: {
    Places,
    Multiselect
  },

  data() {
    return {
      mylocation: { lat: 0, lon: 0 },
      center: { lat: 43.660632, lng: -79.3867157 },
      zoom: 5,
      address: "",
      goData: [],
      searchlatitude: "",
      searchLongitude: "",
      chosen: "",
      searchData: "",
      chosenFilters: [],
      currentPage: 0,
      totalCards: 0,
      value: null,
      options: [
        "Renew an Ontario photo card",
        "Replace health card",
        "Register a vehicle",
        "Renew a driver's licence",
        "Replace a driver's licence",
        "Register a birth",
        "Replace an outdoors card",
        "Reinstate driver's licence",
        "Change address on a driver's licence",
        "Get a driver's licence",
        "Order or replace a birth certificate",
        "Renew accessible parking permit",
        "Replace licence plate(s)",
        "Apply for an Ontario photo card",
        "Change Information on an Ontario photo card",
        "Change or cancel business name"
      ]
    };
  },
  created() {
    if (this.$route.params.location) {
      this.address = this.$route.params.location;
      let serviceArray = this.$route.params.service.split(",");
      if (serviceArray[0] === "['bug']") {
        serviceArray = [];
      }
      for (let i = 0; i < serviceArray.length; i++) {
        this.chosenFilters.push(serviceArray[i]);
      }
      this.changed();
    }
  },
  methods: {
    mylocate() {
      this.$getLocation()
        .then(coordinates => {
          this.mylocation.lat = coordinates.lat;
          this.mylocation.lon = coordinates.lng;
        })
        .then(
          this.axios
            .get(
              "https://us1.locationiq.com/v1/reverse.php?key=69ecd6da32c15e&lat=" +
                this.mylocation.lat +
                "&lon=" +
                this.mylocation.lon +
                "&format=json"
            )
            .then(response => {
              if (response.data.display_name == "Atlas Buoy 0.00E 0.00N") {
                this.mylocate();
              } else {
                this.address = response.data.display_name;
                this.changed();
              }
            })
        );
    },
    getPosition(marker) {
      this.center.lat = 43.9485185;
      this.center.lon = -79.0184346;
      this.zoom = 8;
      return {
        lat: marker._source.location.lat,
        lng: marker._source.location.lon
      };
    },
    paginate(page) {
      if (page === "-1" && this.currentPage === 0) {
        return "";
      } else if (page === this.totalCards * 2 && this.currentPage === 6) {
        return "";
      } else if (this.currentPage !== parseInt(page)) {
        return "link-text";
      } else {
        return "";
      }
    },
    pageChange(page) {
      if (page === "prev") {
        if (this.currentPage !== 0) {
          this.currentPage = this.currentPage - 2;
        }
      } else if (page === "next") {
        if (this.currentPage !== 6) {
          this.currentPage = this.currentPage + 2;
        }
      } else {
        this.currentPage = parseInt(page);
      }

      this.axios
        .get(
          // "http://localhost:5000/search?lat=" +
          "https://location-so.herokuapp.com/search?lat=" +
            this.searchData[0].lat +
            "&lon=" +
            this.searchData[0].lon +
            "&service=" +
            JSON.stringify(this.chosenFilters) +
            "&pageNumber=" +
            this.currentPage
        )
        .then(response => {
          this.goData = response.data.data.result;
          this.totalCards = response.data.data.total;
          // this.totalCards =
          //   parseInt(this.totalCards / 2) + parseInt(this.totalCards % 2);
          this.addCardMessage();
        });
    },
    changed() {
      setTimeout(() => {
        if (this.address !== "" && this.address !== null) {
          this.axios
            .get(
              "https://us1.locationiq.com/v1/search.php?key=69ecd6da32c15e&q=" +
                this.address +
                "&format=json"
            )
            .then(response => {
              this.searchData = response.data;
              this.axios
                .get(
                  // "http://localhost:5000/search?lat=" +
                  "https://location-so.herokuapp.com/search?lat=" +
                    this.searchData[0].lat +
                    "&lon=" +
                    this.searchData[0].lon +
                    "&service=" +
                    JSON.stringify(this.chosenFilters) +
                    "&pageNumber=" +
                    this.currentPage
                )
                .then(response => {
                  this.goData = response.data.data.result;
                  this.totalCards = response.data.data.total;
                  this.searchlatitude = this.searchData[0].lat;
                  this.searchLongitude = this.searchData[0].lon;
                  this.addCardMessage();
                });
            });
        }
      }, 1000);
    },
    addCardMessage() {
      let months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
      ];
      for (let i = 0; i < this.goData.length; i++) {
        for (let j = 0; j < this.goData[i]._source.schedules.length; j++) {
          for (
            let k = 0;
            k < this.goData[i]._source.schedules[j].openings.length;
            k++
          ) {
            let today = new Date();
            let yyyy = today.getFullYear();
            var startDate =
              String(
                months.indexOf(
                  this.goData[i]._source.schedules[j].openings[k].month
                ) + 1
              ).padStart(2, "0") +
              "/" +
              String(
                this.goData[i]._source.schedules[j].openings[k].dayOfMonth
              ).padStart(2, "0") +
              "/" +
              yyyy;

            let holDuration =
              this.goData[i]._source.schedules[j].openings[k].duration / 1440;

            var endDate = this.addDays(startDate, holDuration);
            startDate =
              String(
                this.goData[i]._source.schedules[j].openings[k].dayOfMonth
              ).padStart(2, "0") +
              "/" +
              String(
                months.indexOf(
                  this.goData[i]._source.schedules[j].openings[k].month
                ) + 1
              ).padStart(2, "0") +
              "/" +
              yyyy;

            endDate =
              String(endDate.getDate()).padStart(2, "0") +
              "/" +
              String(endDate.getMonth()).padStart(2, "0") +
              "/" +
              endDate.getFullYear();

            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            yyyy = today.getFullYear();

            today = dd + "/" + mm + "/" + yyyy;

            var d1 = startDate.split("/");
            var d2 = endDate.split("/");
            var c = today.split("/");

            var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
            var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
            var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

            if (check >= from && check <= to) {
              this.goData[i]._source.cardMessage =
                "Closed untill " + this.goData[i]._source.schedules[j].name;
            } else {
              if (typeof this.goData[i]._source.cardMessage !== "undefined") {
                if (!this.goData[i]._source.cardMessage.includes("Closed")) {
                  this.goData[i]._source.cardMessage = " untill 5 p.m. today";
                }
              }
            }
          }
        }
        if (typeof this.goData[i]._source.cardMessage === "undefined") {
          this.goData[i]._source.cardMessage = " untill 5 p.m. today";
        }
      }
    },
    addDays(date, days) {
      var result = new Date(date);
      var monthAdd = 0;
      var yearAdd = 0;
      if (result.getDate() + days >= 30) {
        monthAdd = (result.getDate() + days) / 30;
      }
      if (result.getMonth() + monthAdd >= 12) {
        yearAdd = (result.getMonth() + monthAdd) / 12;
      }
      result = new Date(
        result.getFullYear() + yearAdd,
        result.getMonth() + monthAdd,
        result.getDate() + days
      );
      return result;
    },
    optionSelected() {
      this.currentPage = 0;
      if (this.chosen !== null && this.chosen !== "") {
        this.chosenFilters.push(this.chosen);
      }
      this.axios
        .get(
          // "http://localhost:5000/search?lat=" +
          "https://location-so.herokuapp.com/search?lat=" +
            this.searchlatitude +
            "&lon=" +
            this.searchLongitude +
            "&service=" +
            JSON.stringify(this.chosenFilters) +
            "&pageNumber=" +
            this.currentPage
        )
        .then(response => {
          this.goData = response.data.data.result;
          this.totalCards = response.data.data.total;
          // this.totalCards =
          //   parseInt(this.totalCards / 2) + parseInt(this.totalCards % 2);
          this.addCardMessage();
        });
    },
    removeFromArray(indexValue) {
      this.chosenFilters.splice(this.chosenFilters.indexOf(indexValue), 0);
      this.currentPage = 0;
      this.axios
        .get(
          // "http://localhost:5000/search?lat=" +
          "https://location-so.herokuapp.com/search?lat=" +
            this.searchlatitude +
            "&lon=" +
            this.searchLongitude +
            "&service=" +
            JSON.stringify(this.chosenFilters) +
            "&pageNumber=" +
            this.currentPage
        )
        .then(response => {
          this.goData = response.data.data.result;
          this.totalCards = response.data.data.total;
          this.changed();
        });
    },
    waitTimeColor: function(time) {
      if (time > 0 && time <= 29) {
        return "green-wait";
      } else if (time > 60) {
        return "red-wait";
      } else if (time < 0) {
        return "grey-wait";
      } else {
        return "yellow-wait";
      }
    },
    timeMessage: function(message) {
      if (message.includes("Closed")) {
        return "red-font";
      } else {
        return "";
      }
    }
  }
};
</script>
 

<style scoped>
</style>
 