<template>
  <q-layout view="hHh lpR fFf" class="mybg">
    <HeaderSection :myheaderflag="myheaderflag" :myheaderflag1="myheaderflag1" :mycolorflag1="mycolorflag1"
      :mycolorflag="mycolorflag" @change-theme="ToggleColorScheme" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="container mt-5">
      <div class="row">
        <div class="example-cell q-pl-md  q-pt-md" tabindex="0">
          <q-btn :class="{ darkcolor: mycolorflag1 }" class="border border-2" label="" @click="ToggleColorScheme">
            <router-link :to="{ name: 'countries' }" style="text-decoration: none;" class="text-dark"
              :class="{ darkcolor: mycolorflag1 }">
              <img :src="imgsrc" alt="back" style="width: 20%;height: auto;">&nbsp;Back
            </router-link>
          </q-btn>
        </div>
      </div>
      <div class="row g-3">
        <div v-if="loading" class=" col-12 spinner-border" role="status"
          style="display: flex;flex-flow: row wrap;justify-content: center;">
          <!-- <span class="visually-hidden">Loading...</span> -->
          <div class="loader">Loading...</div>
        </div>
        <div v-else class="col-md-3 q-pa-md example-row-all-breakpoints">
          <q-card class="my-card">
            <img :src="country.flags.png" style="width: 100%;height: 40%;" @click="MoreDetails">
            <q-card-section>
              <div class="text-h6" @click="MoreDetails">{{ country.name.common }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle2">population : {{ country.population }}</div>
              <div class="text-subtitle2">region : {{
                country.region }}</div>
              <div class="text-subtitle2">capital : {{ country.capital[0] }}</div>
              <div class="text-subtitle2">languages :
                <ul v-for="  language   in   country.languages  " :key="language.id" style="list-style-type:none;">
                  <li>{{ language }}</li>
                </ul>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="moredetail" class="col-md-3 q-pa-md example-row-all-breakpoints">
          <h6>More Details</h6>
          <q-card class="my-card">
            <q-card-section class="q-pt-none">
              <div class="text-subtitle2">Official Name:&nbsp;{{ country.name.official }}</div>
              <div class="text-subtitle2">Currencies :
                <ul v-for="  currency   in   country.currencies  " :key="currency" style="list-style-type:none;">
                  <li>name : {{ currency.name }}</li>
                  <li>symbol : {{ currency.symbol }}</li>
                </ul>
              </div>
              <div class="text-subtitle2">Continents : {{ country.continents[0] }}</div>
              <div class="text-subtitle2">StartOfWeek : {{ country.startOfWeek }}</div>
              <div class="text-subtitle2" style="width: 50%;height: 20%;">CoatOfArms :<br>
                <img :src="country.coatOfArms.png" style="width: 50%;height: 20%;margin-left: 65%;" alt="coatOfArms.png"
                  title="coatOfArms.png">
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
// import name from "assets/name.js";
// import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { watch } from 'vue'
import Swal from "sweetalert2";
import ButtonTheme from "components/Buttons/ButtonTheme.vue";
import HeaderSection from "components/sections/HeaderSection.vue";
export default defineComponent({
  name: "ShowCountry",

  components: { HeaderSection },
  setup() {
    const route = useRoute();
    const loading = ref(true);
    const country = ref({});
    const jscountry = ref({});
    const myheaderflag = ref(false);
    const myheaderflag1 = ref(true);
    const mycolorflag = ref(false);
    const mycolorflag1 = ref(false);
    const imgsrc = ref("/src/assets/icons8-back-button-32.png");
    const moredetail = ref(false);
    // https://restcountries.com/v3.1/name/
    // https://restcountries.com/v3.1/${route.params.id}/all?fields=name,flags,capital,region,population,languages
    function getCountry() {
      axios
        // .get(`https://restcountries.com/v3.1/name/${route.params.id}`)
        .get(`https://restcountries.com/v3.1/name/${route.params.id}`)
        .then(function (response) {
          // country.value = response.data;
          loading.value = false;
          for (let index in response.data) {
            console.log("response.data[index].name.common : ", response.data[index].name.common);
            if (route.params.id === response.data[index].name.common) {
              console.log("response.data[index]: ", response.data[index]);
              country.value = response.data[index];
            }
          }
          // jscountry.value = JSON.parse(response.data[0]);
          console.log("route.params.id : ", route.params.id);
          console.log("response.data : ", response.data);
          console.log("country : ", country.value);
          console.log("jscountry : ", jscountry.value);
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.code);
          console.log("route.params.id : ", route.params.id);
          if (error.code === 'ERR_NETWORK' || error.code === "ECONNABORTED" || error.code === 'ERR_TIMED_OUT') {
            console.log('error.code === ERR_NETWORK => connection problems..')
            Swal.fire({
              title: `Oops... Error Code is : "${error.code}"`,
              // text: `Post " ${formData.title} "  created successfully`,
              text: `Failed to load resource`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } else if (error.code === 'ERR_TIMED_OUT') { } else if (error.code === 'ERR_CANCELED') {
            console.log('connection canceled..')
            Swal.fire({
              title: "Oops...",
              // text: `Post " ${formData.title} "  created successfully`,
              text: `connection canceled..`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
    }

    getCountry();

    // Darkmode
    const $q = useQuasar()

    // get status
    console.log($q.dark.isActive) // true, false

    // get configured status
    console.log($q.dark.mode) // "auto", true, false

    // set status
    $q.dark.set(true) // or false or "auto"

    // toggle
    $q.dark.toggle()
    // END-Darkmode
    return {
      ToggleColorScheme() {
        $q.dark.toggle()
        myheaderflag.value = !myheaderflag.value
        myheaderflag1.value = !myheaderflag1.value
        mycolorflag.value = !mycolorflag.value
        mycolorflag1.value = !mycolorflag1.value
        if (imgsrc.value === "/src/assets/icons8-back-button-32.png") {
          imgsrc.value = "/src/assets/icons8-back-button-32-white.png"
        }
        else { imgsrc.value = "/src/assets/icons8-back-button-32.png" }
      },
      MoreDetails() { moredetail.value = !moredetail.value },
      country, loading, myheaderflag, myheaderflag1, mycolorflag, mycolorflag1, imgsrc, moredetail
    };

  },


});

</script>
<style lang="sass">
@import 'src/css/aratick.sass'
</style>
