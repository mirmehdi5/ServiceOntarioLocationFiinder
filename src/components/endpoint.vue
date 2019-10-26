<template>
  <div id="endpoint">
    <div>
      <b-container>
        <b-row>
          <b-col sm="12" md="4">
            <b-row class="noleft-right-margin">
              <a href="https://www.ontario.ca/page/serviceontario">ServiceOntario</a>
              <img src="/arrow.png" alt="arrow" class="arrow" />
              <p>{{locationInfo.data.name}}</p>
            </b-row>
            <h2 style="color:#4D4D4D;">{{city}}</h2>
            {{locationInfo.data.address}}
            <div class="top-padding-one">
              Major intersection:
              <br />
              <b class="int">{{intersection}}</b>
            </div>
            <div>
              <b-row class="top-padding-one hidden-md">
                <b-col cols="1">
                  <img widht="20" height="20" src="/phone.png" />
                </b-col>
                <b-col>
                  <a :href="'tel:1-800-267-8097'">1-800-267-8097</a>
                </b-col>
              </b-row>
              <b-row class="padding-top-half">
                <b-col cols="1">
                  <img width="24" height="24" src="/directions.png" />
                </b-col>
                <b-col>
                  <p @click="openGoogleMaps" class="link-text">Get directions</p>
                </b-col>
              </b-row>
            </div>
          </b-col>

          <b-col
            sm="12"
            md="8"
            v-if="locationInfo.data.address.includes('777 Bay')"
            class="no-left-right-padding-xs"
          >
            <div>
              <b-carousel background="#ababab" :interval="0" height="166" controls>
                <b-carousel-slide img-src="/image 9.png"></b-carousel-slide>
                <b-carousel-slide img-src="/image 11.png"></b-carousel-slide>
                <b-carousel-slide img-src="/image 10.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 61.png"></b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>
          <b-col
            sm="12"
            md="8"
            v-else-if="locationInfo.data.address.includes('47 Sheppard')"
            class="no-left-right-padding-xs"
          >
            <div>
              <b-carousel background="#ababab" :interval="0" height="166" controls>
                <b-carousel-slide img-src="/image 6.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 55.jpg"></b-carousel-slide>
                <b-carousel-slide img-src="/image 12.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 59.png"></b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>
          <b-col
            sm="12"
            md="8"
            v-else-if="locationInfo.data.address.includes('2300 Lawrence')"
            class="no-left-right-padding-xs"
          >
            <div>
              <b-carousel background="#ababab" :interval="0" height="166" controls>
                <b-carousel-slide img-src="/lawrence-image.png"></b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>
          <b-col sm="12" md="8" v-else class="no-left-right-padding-xs">
            <div>
              <b-carousel background="#ababab" :interval="0" height="166" controls>
                <b-carousel-slide img-src="/Group 62.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 63.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 64.png"></b-carousel-slide>
                <b-carousel-slide img-src="/Group 65.png"></b-carousel-slide>
              </b-carousel>
            </div>
          </b-col>

          <b-col sm="12" md="4" class="md-margin-neg-thirteen">
            <b-row class="closed" v-if="cardMessage.includes('Closed')">
              <b-col>
                <div style=" width:10px; height:45px; background-color: rgb(237, 0, 53);"></div>
                <div id="cardmessage"><img width=40 height=36 src=/aler.png />{{cardMessage}}</div>
              </b-col>
            </b-row>
            <b-col class="no-left-padding no-right-padding">
              <h3 id="det">Hours</h3>
              <table class="table-striped">
                <tbody>
                  <tr v-for="(dayData, i) in thisWeek" :key="i">
                    <template v-if="thisWeek[i].day === 'SUNDAY'">
                      <td :class="boldText(i)">Sunday</td>
                      <td cols="6.5" :class="boldText(i)" class="right-align-text">Closed</td>
                    </template>
                    <template v-else-if="thisWeek[i].day === 'SATURDAY'">
                      <td :class="boldText(i)">Saturday</td>
                      <td cols="6.5" :class="boldText(i)" class="right-align-text">Closed</td>
                    </template>
                    <template v-else>
                      <td
                        :class="boldText(i)"
                      >{{thisWeek[i].day.charAt(0).toUpperCase()+thisWeek[i].day.slice(1).toLowerCase()}}</td>
                      <td
                        :class="boldText(i)"
                        cols="6.5"
                        class="right-align-text"
                      >{{thisWeek[i].startHour}}:{{thisWeek[i].startMin}} a.m. to {{thisWeek[i].endHour}}:{{thisWeek[i].endMin}} p.m.</td>
                    </template>
                  </tr>
                  <tr>
                    <template>
                      <td>
                        <a
                          href="https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays"
                        >Holidays</a>
                      </td>
                      <td cols="6.5" class="right-align-text">Closed</td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </b-col>
            <hr />
            <div>
              <b-col cols="12" class="no-left-padding no-left-padding no-right-padding">
                <p v-if="!cardMessage.includes('Closed')">
                  Average wait time:
                  <span
                    class="time"
                    :class="waitTimeColor(waitTime)"
                    v-if="waitTime<60 && waitTime >0 "
                  >{{waitTime}} min</span>
                  <span
                    v-else-if="waitTime < 0"
                    class="time"
                    :class="waitTimeColor(waitTime)"
                  >not tracked</span>
                  <span v-else class="time" :class="waitTimeColor(waitTime)">over 1hr</span>
                </p>
                <p>Shortest wait times are:</p>
                <ul class="ul-padding">
                  <li>Tuesday and Thursday 9:00 a.m. to 10:30 a.m.</li>
                  <li>Wednesday 8:30 a.m. to 11:00 a.m.</li>
                </ul>
                <!-- <a
                  style="font-weight:bold;"
                  href="javascript:history.go(-1)"
                >Find a different location</a>-->
                <router-link
                  v-if="returnServiceArray.length===0"
                  :to="{ name: 'resultsparam' , params: { service:'[\'bug\']', location:locationInfo.data.mapsAddress} }"
                >Find a different location</router-link>
                <router-link
                  v-else
                  :to="{ name: 'resultsparam' , params: { service:String(returnServiceArray), location:locationInfo.data.mapsAddress} }"
                >Find a different location</router-link>
              </b-col>
            </div>
          </b-col>
          <hr />
          <b-col sm="12" md="8">
            <h3 style="font-family: 'Raleway;'" id="Serve">Before you go</h3>
            <p
              style="color:#4d4d4d;"
            >Find out if the service(s) you need is available at this location, what to bring and the cost.</p>
            <div id="app" class="position-absolute-md">
              <multiselect
                :hide-selected="true"
                selectLabel
                style=" font-size:16px; 
width:96%; margin-top:1rem;"
                v-model="value"
                :options="options"
                tagPlaceholder
                placeholder="Search for a service"
                :multiple="true"
                track-by="serviceId"
                @select="checkavailability"
                @input="closetag"
                openDirection="below"
                :custom-label="customLabel"
              ></multiselect>
              <div
                v-for="(item, index) in trial1.slice().reverse()"
                :key="index"
                :ref="`card_${index}`"
                class="car"
              >
                <div v-if="item.availability == 'online'">
                  <p class="heading3">
                    <!-- <img width="14" height="14" src="/x.png" />  -->
                    Only available online
                  </p>
                  <b-card class="cars">
                    <b-row class="top-padding-one">
                      <b-col>
                        <h5>{{item.serviceName}}</h5>
                      </b-col>

                      <b-col cols="2" class="cols right-align">
                        <icon v-on:click="remove(index,item)">
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                          />
                        </icon>
                      </b-col>
                    </b-row>

                    <p v-if="item.type.includes('Register')">
                      <b-button class="online">Register online</b-button>
                    </p>

                    <p>
                      <a :href="item.link">Read more about this service</a>
                    </p>
                  </b-card>
                </div>

                <div v-else-if="item.availability == 'sorry'">
                  <p class="heading3">
                    <!-- <img width="14" height="14" src="/x.png" />  -->
                    Sorry, not sure
                  </p>
                  <b-card class="cars">
                    <b-row class="top-padding-one">
                      <b-col>
                        <h5>Sorry, you can't search that yet</h5>
                      </b-col>

                      <b-col cols="2" class="cols right-align">
                        <icon v-on:click="remove(index,item)">
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                          />
                        </icon>
                      </b-col>
                    </b-row>

                    <p>We only have a few service cards in this prototype. Try searching for one of these services:</p>
                    <ul>
                      <li>register a vehicle</li>
                      <li>replace driver's licence</li>
                      <li>renew driver's licence</li>
                      <li>apply for photo card</li>
                      <li>Get a driver's licence</li>
                      <li>register a birth</li>
                      <li>order or replace a birth certificate</li>
                      <li>replace licence plate(s)</li>
                      <li>replace an outdoors card</li>
                      <li>replace a health card</li>
                      <li>renew ontario photo card</li>
                    </ul>
                  </b-card>
                </div>
                <div v-else-if="serve.includes(item.serviceName)">
                  <p class="heading">
                    <img width="14" height="14" src="/Vector.png" /> Available here
                  </p>
                  <b-card class="cars">
                    <b-row class="top-padding-one">
                      <b-col>
                        <h5>{{item.serviceName}}</h5>
                      </b-col>

                      <b-col cols="2" class="cols right-align">
                        <icon v-on:click="remove(index,item)">
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                          />
                        </icon>
                      </b-col>
                    </b-row>

                    <div v-if="item.type.includes('online')">
                      <b-button class="online">{{item.type}}</b-button>
                    </div>

                    <div v-if="item.serviceName.includes('Get a driver\'s licence')">
                      <p>Note: We currently only offer a small set of driver licence services at this location.</p>
                      <p>Due to higher than normal wait times, we don’t accept requests for written tests after 12:15 pm.</p>
                      <p>
                        Cost:
                        <a
                          href="https://www.ontario.ca/page/driver-and-vehicle-fees#section-0"
                        >{{item.cost}}</a>
                        <br />
                        {{item.payment}}
                      </p>

                      <div v-if="(item.docs != '')">
                        <p style="font-weight:bold;">{{item.title}}</p>You must:
                        <div v-for="index in item.docs" :key="index.id">
                          <ul>
                            <li>{{index}}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <p>
                        Cost: {{item.cost}}
                        <br />
                        {{item.payment}}
                      </p>
                      <p>
                        <a href>{{item.appoint}}</a>
                      </p>
                      <div v-if="(item.docs != '')">
                        <p style="font-weight:bold;">{{item.title}}</p>
                        {{subtitle}}
                        <div v-for="index in item.docs" :key="index.id">
                          <ul>
                            <li>{{index}}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <p>
                      <a :href="item.link">Read more about this service</a>
                    </p>
                  </b-card>
                </div>
                <div v-else>
                  <p class="heading2">
                    <img width="12" height="12" src="/x.png" /> Not Available here
                  </p>

                  <b-card class="cars">
                    <b-row class="top-padding-one">
                      <b-col>
                        <h5>{{item.serviceName}}</h5>
                      </b-col>

                      <b-col cols="2" class="cols right-align">
                        <icon v-on:click="remove(index,item)">
                          <img
                            width="16"
                            height="16"
                            src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
                          />
                        </icon>
                      </b-col>
                    </b-row>

                    <div style="margin-bottom:1rem;" v-if="item.type.includes('online')">
                      <b-button class="online">{{item.type}}</b-button>
                    </div>

                    <div v-if="item.serviceName.includes('Get a driver\'s licence')">
                      <p>This service is not available at this location</p>
                      <b-row>
                        <ul>
                          <li>
                            Visit ServiceOntario:
                            <router-link
                              :to="{ name: 'endpoint' , params: { city:'Toronto', intersection:'Bay St/ College St' ,cardMessage:' untill 5 p.m. today',waitTime:'10',id:'12043', services:'Renew a driver\'s licence,Register a vehicle, Renew an Ontario photo card, Apply for an Ontario photo card,Get a driver\'s licence,Replace a driver\'s licence,Reinstate driver\'s licence,Change address on a driver\'s licence,change licence class or endorsement,Change name on a driver\'s licence, Change driver\'s licence endorsement,Change driver\'s licence class, Request a temporary vehicle registration sticker,Replace licence plate(s),Change Information on an Ontario photo card,Replace accessible parking permit,Change name on a health card, Replace an outdoors card, Apply for an Ontario health card,Replace a vehicle permit,Change the address on a vehicle permit,Make a corporations tax insurance premium payment,Renew accessible parking permit,Change or cancel business name,Apply for a Ontario resident sport fishing licence,File an Employer Health Tax return,Request Articles of Incorporation'}}"
                            >Toronto (College Park)</router-link>
                          </li>
                        </ul>
                      </b-row>
                      <b-row>
                        <ul>
                          <li>
                            <a href>Find a DriveTest centre</a>
                          </li>
                        </ul>
                      </b-row>
                    </div>
                    <div
                      v-else-if="item.serviceName.includes('Order or replace a birth certificate')"
                    >
                      <p v-if="item.type.includes('Register')">
                        <b-button class="online">Order online</b-button>
                      </p>

                      <p>This service is only available at</p>
                      <ul>
                        <li>
                          <router-link
                            :to="{ name: 'endpoint' , params: { city:'Toronto', intersection:'Sheppard Avenue E/ Yonge St' ,cardMessage:' untill 5 p.m. today',waitTime:'45',id:'11801', services:'Renew a driver\'s licence,Register a vehicle ,Order or replace a birth certificate, Replace an outdoors card,Replace health card,Renew an Ontario photo card,Replace a driver\'s licence,Reinstate driver\'s licence, Replace licence plate(s),driver and vehicle records,Request a temporary vehicle registration sticker,Change the address on a vehicle permit,Apply for an Ontario photo card,Change Information on an Ontario photo card, Replace accessible parking permit,Change name on a health card,Apply or replace a marriage certificate,Apply for an Ontario health card'}}"
                          >47 Sheppard Ave E, Toronto</router-link>
                        </li>

                        <li>
                          <router-link
                            :to="{ name: 'endpoint' , params: { city:'Ottawa', intersection:'Elgin St/ Laurier Ave W' ,cardMessage:' untill 5 p.m. today',waitTime:'45',id:'12089', services:'Renew a driver\'s licence,Replace an outdoors card,Register a vehicle,Renew an Ontario photo card,Replace a driver\'s licence,Order or replace a birth certificate,Replace licence plate(s),Apply for an Ontario photo card'}}"
                          >110 Laurier Ave W, Ottawa</router-link>
                        </li>
                      </ul>
                    </div>
                    <div v-else>
                      <p>
                        <router-link
                          :to="{ name: 'resultsparam' , params: { service:item.serviceName, location:locationInfo.data.mapsAddress} }"
                        >Find a location that offers this service</router-link>
                      </p>
                    </div>
                    <p class="margin-bottom-one">
                      <a :href="item.link">Read more about this service</a>
                    </p>
                  </b-card>
                </div>
              </div>
            </div>
          </b-col>
          <hr />
          <b-col style="color:#4D4D4D;" sm="12" md="4" class="margin-top-two">
            <b-row>
              <b-col cols="2">
                <img width="24" height="24" src="/p.png" />
              </b-col>
              <b-col cols="9">
                <b-row
                  v-html="locationInfo.data.parking"
                  v-if="!locationInfo.data.parking.includes('\u003chtml /\u003e')"
                >{{locationInfo.data.parking}}</b-row>
                <b-row v-else>Free parking available</b-row>
              </b-col>
            </b-row>

            <b-row style="color:#4D4D4D;">
              <b-col cols="2">
                <img width="24" height="23" src="/f.png" />
              </b-col>
              <b-col cols="9">
                <b-row v-if="locationInfo.data.frenchAvailable === true">French available</b-row>
                <b-row v-else>French unavailable</b-row>
              </b-col>
            </b-row>

            <b-row style="color:#4d4d4d; margin-top:1rem;">
              <b-col>
                <h4 style="font-family: 'Raleway';" class="sections">Accessibility information</h4>
              </b-col>
              <ul>
                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.parking === 'AVAILABLE'"
                  >accessible parking</li>
                  <li v-else>accessible parking not available</li>
                </template>
                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.isAccessible === true"
                  >wheelchair and companion seating</li>
                  <li v-else>wheelchair and companion seating not available</li>
                </template>

                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.counter === 'NONE'"
                  >clipboard in lieu of lower counter</li>
                  <li v-else>lower counter available</li>
                </template>
                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.triage === 'AVAILABLE'"
                  >on-site assistance</li>
                  <li v-else>on-site assistance not available</li>
                </template>
                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.entrance === 'AVAILABLE'"
                  >barrier free</li>
                  <li v-else>not barrier free</li>
                </template>
                <template>
                  <li
                    v-if="locationInfo.data.accessibilityInformation.washroom === 'AVAILABLE'"
                  >public washroom available</li>
                  <li v-else>no public washroom</li>
                </template>
              </ul>
              <b-col>
                <p>
                  ServiceOntario will provide a sign language interpreter upon request. Call us or
                  <a
                    href
                  >
                    send us
                    <br />an e-mail.
                  </a>
                </p>
              </b-col>
            </b-row>

            <h4 id="contac" style="font-family: 'Raleway;'" class="sections">Contact call centre</h4>
            <ul style="color:#4D4D4D;" class="ul-padding">
              <b-row>
                <div class="padding-right-half">General</div>

                <a :href="generalNumber">{{locationInfo.data.displayNumber}}</a>
              </b-row>
              <b-row>
                <div class="padding-right-half">Health card</div>
                <template>
                  <div v-if="locationInfo.data.locationType.healthCardInfoNumber">
                    <a :href="healthNumber">{{locationInfo.data.locationType.healthCardInfoNumber}}</a>
                  </div>
                  <div v-else>
                    <a href="tel:1-888-376-5197">1-888-376-5197</a>
                  </div>
                </template>
              </b-row>
              <b-row>
                <div class="padding-right-half">Driving and vehicles</div>
                <template>
                  <div v-if="locationInfo.data.locationType.driverVehicalInfoNumber">
                    <a
                      :href="healthNumber"
                    >{{locationInfo.data.locationType.driverVehicalInfoNumber}}</a>
                  </div>
                  <div v-else>
                    <a href="tel:1-800-387-3445">1-800-387-3445</a>
                  </div>
                </template>
              </b-row>
              <b-row>
                <div class="padding-right-half">TTY</div>
                <a href="tel:1-800-268-7095">1-800-268-7095</a>
              </b-row>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
  
<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import AutocompleteVue from "autocomplete-vue";
Vue.component("autocomplete-vue", AutocompleteVue);
import Multiselect from "vue-multiselect";
import "vue-simple-suggest/dist/styles.css"; // Optional CSS
Vue.use(BootstrapVue);
export default {
  name: "endpoint",
  components: {
    Multiselect
  },
  props: {
    mapConfig: Object,
    apiKey: String
  },
  watch: {
    "$route.params.id"(newId) {
      this.updateLocationInfo(newId);
    }
  },
  data() {
    return {
      returnServiceArray: [],
      city: "",
      intersection: "",
      cardMessage: "",
      waitTime: "",
      id: "",
      services: "",
      value: "",
      trial1: [],
      options: [
        {
          serviceId: 101,
          serviceName: "Register a vehicle",
          cost: "$90",
          title: "What you need to bring",
          availability: "yes",
          type: "",
          payment: "Visa, MasterCard, debit, cash",
          docs: [
            " driver’s licence or registrant identification number (RIN)",
            "completed used vehicle information package (for personal vehicles, light commercial vehicle, self-propelled motor home or motorcycle)",
            "proof of purchase (e.g., a receipt or a bill of sale)",
            "proof of insurance from an insurance provider licensed in Ontario ",
            "original vehicle permit from seller with completed transfer portion",
            "plate portion of the permit, if you already have a licence plate."
          ],
          link:
            "https://www.ontario.ca/page/register-vehicle-permit-licence-plate-and-sticker"
        },
        {
          serviceId: 125,
          serviceName: "Replace a driver's licence",
          cost: "$35.75",
          availability: "yes",
          title: "What you need to bring",
          type: "",
          docs: [
            " a personal identification document (verifying your name, date of birth and signature)"
          ],
          payment: "Visa, MasterCard, Debit, Cash",
          link: "https://www.ontario.ca/page/replace-drivers-licence"
        },
        {
          serviceId: 127,
          availability: "yes",
          type: "Renew online",
          title: "What you need to bring",
          cost: "$90",
          payment: "Visa, MasterCard, money order, certified cheque",
          appoint: "Book an appointment to reduce your wait",
          docs: [
            "original personal identification document with your name, date of birth and signature (e.g. your existing valid driver’s licence)",
            "driver licence renewal notice"
          ],
          link: "https://www.ontario.ca/page/renew-drivers-licence",

          serviceName: "Renew a driver's licence"
        },
        {
          serviceId: 140,
          availability: "online",
          type: "Register online",
          title: "What you need to bring",
          cost: "",
          payment: "",
          delivery: "",
          docs: [],
          link: "https://www.ontario.ca/page/register-birth-new-baby",
          serviceName: "Register a birth"
        },
        {
          serviceId: 12500,
          availability: "yes",
          title: "What you need to bring",
          serviceName: "Apply for an Ontario photo card",
          cost: "$35",

          type: "",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "original identity documents to prove your legal name, date of birth and signature",
            "your marriage certificate, if you are applying under your married name"
          ],
          link: "https://www.ontario.ca/page/ontario-photo-card"
        },
        {
          serviceId: 109,
          serviceName: "Replace licence plate(s)",
          cost: "$59",
          title: "What you need to bring",
          availability: "yes",
          type: "",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "identification",
            "proof of valid insurance",
            "the vehicle permit (plate and vehicle portion)",
            "the other plate (if applicable)",
            "a completed replacement declaration"
          ],
          link:
            "https://www.ontario.ca/page/replace-lost-stolen-or-damaged-licence-plate-or-personalized-licence-plate"
        },
        {
          serviceId: 1,
          serviceName: "Get a driver's licence",
          type: "",
          title: "Before you start",

          cost: "See the DriveTest list of fees ",
          availability: "no",

          payment: "Visa, MasterCard, debit, cash, certified cheque",
          docs: [
            "You must be atleast 16 years of age",
            "pass an eye test",
            "pass a written test about the rules of the road and traffic signs"
          ],
          link:
            "https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence"
        },
        {
          serviceId: 103,
          serviceName: "Order or replace a birth certificate",
          cost: "$45",
          title: "What you need to bring",
          availability: "yes",
          type: "Order online",
          payment: "Visa, MasterCard, Cheque, Money Order",
          docs: [
            "your first and last name, mailing address, and phone number ",
            "information of the person on the birth certificate: first, middle, and last name, date of birth, sex and city of birth, previous legal names for the person named on the birth certificate (if applicable), parents’ information",
            "a guarantor if the subject is 9 years and older",
            "payment for the certificate"
          ],
          link:
            "https://www.ontario.ca/page/get-or-replace-ontario-birth-certificate"
        },
        {
          serviceId: 11282,
          type: "",
          title: "What you need to bring",
          serviceName: "Replace an outdoors card",
          cost: "$9.68",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: "",

          link: "https://www.services.gov.on.ca/sf/#/oneServiceDetail/11396/ol"
        },
        {
          serviceId: 12940,
          serviceName: "Renew an Ontario photo card",
          cost: "$35",
          title: "What you need to bring",
          type: "",
          payment: "Visa, debit, Mastercard, cash",
          docs: [
            "completed Ontario Photo Card application form (also available at a ServiceOntario centre)",
            "additional ID (only if your Ontario Photo Card is expired)"
          ],
          link: "https://www.ontario.ca/page/ontario-photo-card#section-4"
        },
        {
          serviceId: 11840,
          serviceName: "Replace health card",
          cost: "Free",
          title: "What you need to bring",
          type: "",
          payment: "",
          docs: [
            "one document to prove citizenship/immigration status",
            "one document to prove residency in Ontario",
            "one to prove identity"
          ],
          link:
            "https://www.ontario.ca/page/health-card-renewal-replacement-and-cancellation#section-7"
        },
        {
          serviceId: 12560,
          serviceName: "Change Information on an Ontario photo card",
          cost: "59",
          title: "What you need to bring",
          availability: "sorry",
          type: "",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "identification",
            "proof of valid insurance",
            "the vehicle permit (plate and vehicle portion)",
            "the other plate (if applicable)",
            "a completed replacement declaration"
          ]
        },
        {
          serviceId: 11448,
          serviceName: "Change or cancel business name",
          cost: "59",
          availability: "sorry",
          delivery: "4 to 6 weeks",
          type: "",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "identification",
            "proof of valid insurance",
            "the vehicle permit (plate and vehicle portion)",
            "the other plate (if applicable)",
            "a completed replacement declaration"
          ]
        },
        {
          serviceId: 11391,
          serviceName: "Change address on a driver's licence",
          cost: "59",
          delivery: "4 to 6 weeks",
          type: "",
          availability: "sorry",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "identification",
            "proof of valid insurance",
            "the vehicle permit (plate and vehicle portion)",
            "the other plate (if applicable)",
            "a completed replacement declaration"
          ]
        },
        {
          serviceId: 11386,
          serviceName: "Renew accessible parking permit",
          cost: "59",
          availability: "sorry",
          delivery: "4 to 6 weeks",
          type: "",
          payment: "Visa, MasterCard, Debit, Cash",
          docs: [
            "identification",
            "proof of valid insurance",
            "the vehicle permit (plate and vehicle portion)",
            "the other plate (if applicable)",
            "a completed replacement declaration"
          ]
        }
      ],
      thisWeek: [],
      locationInfo: {},
      generalNumber: "",
      healthNumber: "",
      driverNumber: "",
      checkavailable: [],
      serve: []
    };
  },
  created() {
    this.updateLocationInfo(this.$route.params.id);
  },
  methods: {
    updateLocationInfo(id) {
      this.serve = this.$route.params.services;
      this.city = this.$route.params.city;
      this.intersection = this.$route.params.intersection;
      this.cardMessage = this.$route.params.cardMessage;
      this.waitTime = this.$route.params.waitTime;
      this.id = this.$route.params.id;
      this.services = this.$route.params.services;
      this.axios
        .get(
          "https://stage.services.gov.on.ca/slfr/rs/location/byId/" + id + "/en"
        )
        .then(response => {
          this.locationInfo = response;
          this.checkavailable = this.locationInfo.data.serviceIds;
          this.checkavailable = this.checkavailable.split(",");
          this.generalNumber = "tel:" + this.locationInfo.data.displayNumber;
          this.healthNumber =
            "tel:" + this.locationInfo.data.locationType.healthCardInfoNumber;
          this.driverNumber =
            "tel:" +
            this.locationInfo.data.locationType.driverVehicalInfoNumber;
          if (this.thisWeek.length < 6) {
            let today = new Date();
            for (let i = today.getDay(); i < 7; i++) {
              if (i === 0) {
                this.thisWeek.push({ day: "SUNDAY" });
              } else if (i === 6) {
                this.thisWeek.push({ day: "SATURDAY" });
              } else if (i === 1) {
                this.hoursArrayPush("MONDAY");
              } else if (i === 2) {
                this.hoursArrayPush("TUESDAY");
              } else if (i === 3) {
                this.hoursArrayPush("WEDNESDAY");
              } else if (i === 4) {
                this.hoursArrayPush("THURSDAY");
              } else if (i === 5) {
                this.hoursArrayPush("FRIDAY");
              }
            }
            for (let i = 0; i < today.getDay(); i++) {
              if (i === 0) {
                this.thisWeek.push({ day: "SUNDAY" });
              } else if (i === 6) {
                this.thisWeek.push({ day: "SATURDAY" });
              } else if (i === 1) {
                this.hoursArrayPush("MONDAY");
              } else if (i === 2) {
                this.hoursArrayPush("TUESDAY");
              } else if (i === 3) {
                this.hoursArrayPush("WEDNESDAY");
              } else if (i === 4) {
                this.hoursArrayPush("THURSDAY");
              } else if (i === 5) {
                this.hoursArrayPush("FRIDAY");
              }
            }
          }
        });
    },
    closetag() {
      this.value = "";
    },
    remove(index, item) {
      this.trial1 = this.trial1.slice().reverse();
      this.options.push(item);
      this.trial1.splice(index, 1);
      this.returnServiceArray = this.returnServiceArray.slice().reverse();
      this.returnServiceArray.splice(index, 1);
      this.returnServiceArray = this.returnServiceArray.slice().reverse();
      this.trial1 = this.trial1.slice().reverse();
    },
    openGoogleMaps() {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" +
          this.locationInfo.data.mapsAddress,
        "_blank"
      );
    },
    checkavailability(option) {
      this.options.splice(this.options.indexOf(option), 1);
      this.trial1.push(option);
      this.returnServiceArray.push(option.serviceName);
      this.trial1 = this.trial1.filter(function(el) {
        return el != "";
      });
    },
    customLabel(option) {
      return `${option.serviceName}`;
    },
    boldText(i) {
      if (i === 0) {
        return "bold-text";
      } else {
        return "";
      }
    },
    hoursArrayPush(day) {
      let duration =
        this.locationInfo.data.schedules[0].openings[
          this.locationInfo.data.schedules[0].openings.findIndex(
            i => i.dayOfWeek === day
          )
        ].duration / 60;

      let startDur =
        this.locationInfo.data.schedules[0].openings[
          this.locationInfo.data.schedules[0].openings.findIndex(
            i => i.dayOfWeek === day
          )
        ].minute / 60;
      startDur += this.locationInfo.data.schedules[0].openings[
        this.locationInfo.data.schedules[0].openings.findIndex(
          i => i.dayOfWeek === day
        )
      ].hour;
      let endDur = 12 - startDur;
      endDur = duration - endDur;
      let endDurMin = 0;
      if (endDur % 1 === 0) {
        endDurMin = 0;
      } else {
        endDurMin = (endDur % 1) * 60;
        endDur = parseInt(endDur / 1);
      }
      endDurMin = String(endDurMin).padStart(2, "0");
      this.thisWeek.push({
        day: this.locationInfo.data.schedules[0].openings[
          this.locationInfo.data.schedules[0].openings.findIndex(
            i => i.dayOfWeek === day
          )
        ].dayOfWeek,
        startHour: this.locationInfo.data.schedules[0].openings[
          this.locationInfo.data.schedules[0].openings.findIndex(
            i => i.dayOfWeek === day
          )
        ].hour,
        startMin: String(
          this.locationInfo.data.schedules[0].openings[
            this.locationInfo.data.schedules[0].openings.findIndex(
              i => i.dayOfWeek === day
            )
          ].minute
        ).padStart(2, "0"),
        endHour: endDur,
        endMin: endDurMin
      });
    },
    waitTimeColor: function(time) {
      if (time > 0 && time <= 20) {
        return "green-wait";
      } else if (time > 60) {
        return "red-wait";
      } else if (time < 0) {
        return "grey-wait";
      } else {
        return "yellow-wait";
      }
    }
  }
};
</script>

<style scoped>
.input-group.md-form.form-sm.form-1 input {
  border: 1px solid #bdbdbd;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input {
  border: 1px solid #bdbdbd;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input.red-border {
  border: 1px solid #ef9a9a;
}
.input-group.md-form.form-sm.form-2 input.lime-border {
  border: 1px solid #cddc39;
}
.input-group.md-form.form-sm.form-2 input.amber-border {
  border: 1px solid #ffca28;
}
.active-pink-2 input[type="text"]:focus:not([readonly]) {
  border-bottom: 1px solid #f48fb1;
  box-shadow: 0 1px 0 0 #f48fb1;
}
.active-pink input[type="text"] {
  border-bottom: 1px solid #f48fb1;
  box-shadow: 0 1px 0 0 #f48fb1;
}
.active-purple-2 input[type="text"]:focus:not([readonly]) {
  border-bottom: 1px solid #ce93d8;
  box-shadow: 0 1px 0 0 #ce93d8;
}
.active-purple input[type="text"] {
  border-bottom: 1px solid #ce93d8;
  box-shadow: 0 1px 0 0 #ce93d8;
}
.active-cyan-2 input[type="text"]:focus:not([readonly]) {
  border-bottom: 1px solid #4dd0e1;
  box-shadow: 0 1px 0 0 #4dd0e1;
}
.active-cyan input[type="text"] {
  border-bottom: 1px solid #4dd0e1;
  box-shadow: 0 1px 0 0 #4dd0e1;
}
.active-cyan .fa,
.active-cyan-2 .fa {
  color: #4dd0e1;
}
.active-purple .fa,
.active-purple-2 .fa {
  color: #ce93d8;
}
.day {
  text-transform: capitalize !important ;
}
.active-pink .fa,
.active-pink-2 .fa {
  color: #f48fb1;
}
.Service {
  margin-top: 20px;
  margin-left: 10px;
  color: whitesmoke;
  text-align: center;
  width: 210px;
  height: 50px;
  font-size: 30px;
  background-color: darkgreen;
  font-display: bold;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.titlebar {
  background-color: rgb(8, 8, 8) !important;
  width: 400px;
  height: 50%;
}
.navbar-default .navbar-brand {
  width: 100%;
  color: #d7e2e9;
}
.legend {
  margin-top: 5%;
  margin-bottom: 3%;
}
.input-group.md-form.form-sm.form-1 input {
  border: 1px solid #bdbdbd;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input {
  border: 1px solid #bdbdbd;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
.input-group.md-form.form-sm.form-2 input.red-border {
  border: 1px solid #ef9a9a;
}
.input-group.md-form.form-sm.form-2 input.lime-border {
  border: 1px solid #cddc39;
}
.input-group.md-form.form-sm.form-2 input.amber-border {
  border: 1px solid #ffca28;
}
.table-today-highlight {
  background-color: #bdd5ac;
}
.blue-alert-message {
  margin-top: 5%;
  border-left: 0.8rem solid #f2c94c;
  background-color: lightyellow;
}
#cardmessage {
  width: 80%;
  padding-top: 9px;
  padding-left: 5px;
  font-size: 16px;
  background-color: rgb(255, 224, 226);
}

.int {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bolder;
  font-size: 1rem;
  color: #4d4d4d;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}

span {
  font-weight: bold;
  margin-left: 4%;
}
#Serve {
  margin-top: 20px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  color: #4d4d4d;
}
.waitime {
  margin-bottom: -3%;
  margin-left: 5%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;

  color: #4d4d4d;
}
h2 {
  font-family: Raleway;
  font-style: normal;
  font-weight: bold;

  color: #4d4d4d;

  margin-top: 10px;
}
.googlemapslink {
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;

  line-height: 5%;
}
.sections {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;

  color: #4d4d4d;
}
#det {
  font-family: "Raleway";
  margin-top: 20px;
  font-style: normal;
  font-weight: bold;

  color: #4d4d4d;
}
.driveracc {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;

  /* identical to box height */

  color: green;
}
span {
  font-weight: bold;
}

h5 {
  font-family: "Raleway";
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 26px;
  color: #4d4d4d;
}

.multiselect__tag {
  display: none !important;
}
.multiselect__tags-wrap {
  display: none !important;
}
.avail {
  margin-top: 1rem;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.expa {
  border: none;
  background-color: white;
  color: black;
  font-size: 14px;
}
th,
td {
  text-align: left;
  padding: 16px;
}

table:nth-child(even) {
  background-color: #e8e8e8;
}
.col1 {
  width: 5%;
}
.col3 {
  width: 10%;
}
.acchead {
  margin-top: 3%;
}
</style>
