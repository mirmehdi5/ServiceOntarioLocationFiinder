<template style="overflow: hidden;">
  <div>
    <b-navbar toggleable="lg" id="navbar" type="dark" style="width:100%; background-color:#0e0e0e;">
      <b-container class="no-top-bottom-padding">
        <b-navbar-brand href="#">
          <img class="ontlogo" src="/D.jpeg" />
        </b-navbar-brand>
        <b-navbar-nav class="mx-auto order-0"></b-navbar-nav>
        <span
          ng-hide="contentNode.hideTranslation"
          id="toggle-lang"
          class="header-link_lang-toggle-container"
        >
          <a
            href="/fr/page/serviceontario"
            ng-click="changeLangOnly($event, contentNode.translation, altLang.lang)"
            class="show-for-medium-down header-link header-link_lang-toggle-link small left fr-lang"
            lang="fr"
            hreflang="fr"
            rel="alternate"
            analytics-on
            analytics-category="Header"
            analytics-event="ServiceOntario"
            analytics-label="français"
          >FR</a>
        </span>
        <div class="search row collapse radius" id="search">
          <div class="small-8 medium-10 columns">
            <div onesite-search-main-typeahead submit="submit" search="search">
              <div ng-transclude ng-switch="type">
                <div
                  class="clear-input--wrapper"
                  ng-class="{clearable: !!search.input}"
                  ng-switch-default
                  style
                >
                  <input
                    ng-model="search.input"
                    required
                    ng-focus="enableInputCheck = true"
                    ng-blur="enableInputCheck = false"
                    ng-change="onesiteSearchMainTypeaheadImpl.cacheInput = search.input"
                    ng-keyup="searchByKeyword($event)"
                    maxlength="1024"
                    typeahead-min-length="2"
                    type="search"
                    typeahead="obj as obj.title for obj in onesiteSearchMainTypeaheadImpl.typeaheadHandler($viewValue)"
                    typeahead-template-url="/onesite_modules/onesite-search/partials/typeahead/suggestion.html"
                    aria-label="Search"
                    autocapitalize="none"
                    role="search"
                    class="no-shadow no-border ng-valid-maxlength ng-touched ng-dirty ng-empty ng-invalid ng-invalid-required"
                    style
                  />
                  <ul
                    class="f-dropdown"
                    ng-style="{display: isOpen()&amp;&amp;'block' || 'none', top: position.top+'px', left: position.left+'px'}"
                    typeahead-popup
                    matches="matches"
                    active="activeIdx"
                    select="select(activeIdx)"
                    query="query"
                    position="position"
                    template-url="/onesite_modules/onesite-search/partials/typeahead/suggestion.html"
                    style="display: none; top: 37px; left: 0px;"
                  ></ul>
                  <span class="clear-input">
                    <a
                      analytics-on
                      analytics-category="Header"
                      analytics-event="search-clear"
                      ng-click="clear($event)"
                      ng-keypress="clear($event)"
                      ng-keyup="clear($event)"
                      tabindex="0"
                    >
                      <span class="show-for-sr">Clear field</span>
                      <span aria-hidden="true">×</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="small-4 medium-2 columns">
            <button
              class="show-for-medium-up button header-button postfix radius"
              type="submit"
              ng-click="submit.callback()"
              analytics-on
              analytics-category="Header"
              analytics-event="Search"
            >
              <span class="iconWrapperNoBg iconSearchHeader">
                <span class="icon-search" aria-hidden="true"></span>
                <span class="show-for-sr">Search</span>
              </span>
            </button>
          </div>
        </div>

        <button class="btn btn-primary" style="background-color:rgb(0,102,204)">
          <i class="fa fa-bars"></i>
          Menu
        </button>
      </b-container>
    </b-navbar>
    <router-view />
  </div>
</template>
 <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
export default {
  name: "app",
  components: {}
};
</script>
<style>
.fr-lang {
  color: white;
  cursor: auto;
  font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  font-size: 0.9rem;
  padding-right: 1rem;
}
</style>