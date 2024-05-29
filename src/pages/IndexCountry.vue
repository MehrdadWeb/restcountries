<template>
  <q-layout view="hHh lpR fFf">
    <HeaderSection :myheaderflag="myheaderflag" :myheaderflag1="myheaderflag1" :mycolorflag1="mycolorflag1"
      :mycolorflag="mycolorflag" @change-theme="ToggleColorScheme" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <div class="row ">
      <div class="col q-mt-md q-pl-md">
        <!-- <input type="text" v-model="searchinput" placeholder="Search for a country" />
        <div class="item scountry" v-for="scountry in filteredList()" :key="scountry">
          {{ scountry }}
        </div>
        <div class="item error" v-if="searchinput && !filteredList().length">
          <p>No results found!</p>
        </div> -->

      </div>
      <!-- Button : Search for a country -->
      <div class="col q-mt-md q-pl-md">
        <q-select filled v-model="search" clearable use-input hide-selected fill-input input-debounce="0"
          label="Search for a country" :options="options" @filter="filterFn" @filter-abort="abortFilterFn"
          style="width: 250px">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:append>
            <q-icon name="search" @click="SearchCountry" />
          </template>
          <span hidden>{{ selectedcountry = search }}</span>
          <span hidden>{{ SearchCountry() }}</span>
        </q-select>
      </div>
      <!-- END-Button : Search for a country -->
      <!-- Button : Filter by Region -->
      <div class="col q-pa-md">
        <q-select filled v-model="model1" clearable use-input hide-selected fill-input input-debounce="0"
          label="Filter by Region" :options="options1" @filter="filterFn2" @filter-abort="abortFilterFn2"
          style="width: 250px">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
          {{ selectedregion = model1 }}
        </q-select>
      </div>
      <!-- End-Button : Filter by Region -->
      <!-- Sort by Population -->
      <div class="col q-pa-md" style="width: 65%;">
        <q-btn text-color="black" label="" @click="SortByPopulation" style="width: inherit;padding: 0;"
          :class="{ darkcolor: mycolorflag1 }">
          <img src="~assets/people.png" alt="population" style="width: 10%;height: auto;">&nbsp;population
        </q-btn>
      </div>
      <!-- END-Sort by Population -->
      <!-- Sort by CountryName -->
      <div class="col q-pa-md" style="width: 150%;">
        <div class="col">
          <q-btn :class="{ darkcolor: mycolorflag1 }" text-color="black" label="" @click="SortByCountryName"
            style="width: inherit;padding: 0;">
            <img src="~assets/coronavirus.png" alt="Country Name" style="width: 10%;height: auto;">&nbsp;{{ sortorder
            }}&nbsp;Country Name
          </q-btn>
        </div>
      </div>
      <!-- END-Sort by CountryName -->
    </div>
    <div class="container mt-5">
      <div class="row g-3">
        <div v-if="loading" class="col-12 spinner-border" role="status"
          style="display: flex;flex-flow: row wrap;justify-content: center;">
          <!-- <span class="visually">Loading...</span> -->
          <div class="loader">Loading...</div>
        </div>

        <!-- Search for a country جستجو بر اساس نام کشور -->
        <div v-else-if="selectedcountry !== ' '" class="col-md-12 q-pa-md example-row-all-breakpoints "
          style="display: flex;flex-flow: row wrap;justify-content: center;">
          <CardView :country="foundcountry" />
        </div>
        <!-- END-Search for a country جستجو بر اساس نام کشور -->
        <!-- selectedregion مرتب سازی بر اساس قاره -->
        <div v-else-if="selectedregion !== ' ' & selectedregion !== 'All' & !sortbycountryname">
          <div v-if="selectedregion == 'Africa'" class="row">
            <div v-for="country in Africacountries" :key="country.id"
              class="col-md-3 q-pa-md example-row-all-breakpoints">
              <CardView :country="country" />
            </div>
          </div>
          <div v-else-if="selectedregion == 'Americas'" class="row">
            <div v-for="country in Americascountries" :key="country.id"
              class="col-md-3 q-pa-md example-row-all-breakpoints">
              <CardView :country="country" />
            </div>
          </div>
          <div v-else-if="selectedregion == 'Asia'" class="row">
            <div v-for="country in Asiascountries" :key="country.id" class="col-md-3 q-pa-md example-row-all-breakpoints">
              <CardView :country="country" />
            </div>
          </div>
          <div v-else-if="selectedregion == 'Europe'" class="row">
            <div v-for="country in Europecountries" :key="country.id"
              class="col-md-3 q-pa-md example-row-all-breakpoints">
              <CardView :country="country" />
            </div>
          </div>
          <div v-else-if="selectedregion == 'Oceania'" class="row">
            <div v-for="country in Oceaniacountries" :key="country.id"
              class="col-md-3 q-pa-md example-row-all-breakpoints">
              <CardView :country="country" />
            </div>
          </div>

        </div>
        <!-- END-selectedregion مرتب سازی بر اساس قاره -->
        <!-- SortByCountryName مرتب سازی بر اساس نام کشور-->
        <div v-else-if="sortbycountryname" class="col-md-3 q-pa-md example-row-all-breakpoints"
          v-for="country in  allcountriesbyname" :key="country.flag">
          <CardView :country="country" />
        </div>
        <!-- End-SortByCountryName -->
        <!-- SortByPopulation مرتب سازی بر اساس جمعیت-->
        <div v-else-if="sortbypopulation" class="col-md-3 q-pa-md example-row-all-breakpoints"
          v-for="country in  sortcountries" :key="country.population">
          <CardView :country="country" />
        </div>
        <!-- End-SortByPopulation -->

        <!-- لیست تمام کشورها -->
        <div v-else class="col-md-3 q-pa-md example-row-all-breakpoints" v-for="country in  countries"
          :key="country.name">
          <CardView :country="country" />
        </div>
        <!-- END-لیست تمام کشورها -->
      </div>
    </div>
  </q-layout>
</template>
<script>
import { defineComponent, ref, reactive } from "vue";
import axios from "axios";
import CardView from "components/country/CardView.vue";
import ButtonTheme from "components/Buttons/ButtonTheme.vue";
import HeaderSection from "components/sections/HeaderSection.vue";
// import EssentialLink from 'components/EssentialLink.vue'
import { useQuasar } from 'quasar'
import { watch } from 'vue'
import Swal from "sweetalert2";
import Dropdown from 'vue-simple-search-dropdown';

// import Vue from "vue";
// import AspectRatio from "v-aspect-ratio";
// as a global plugin
// Vue.use(AspectRatio);
export default defineComponent({
  name: "IndexCountry",

  components: { HeaderSection, CardView },

  setup() {
    const search = ref(" ");
    const model = ref(null);
    const model1 = ref(" ");
    console.log('model1 :', model1.value);
    const model3 = ref(" ");
    const selectedregion = ref(" ");
    const selectedcountry = ref(" ");
    const foundcountry = ref(" ");
    const sortbypopulation = ref(false);
    const sortbycountryname = ref(false);
    const sortcountries = ref([]);
    const unsortcountries = ref([]);
    const sortorder = ref("Sort Ascending");
    const allcountriesbyname = ref([]);
    const current = ref([]);
    const countries = ref([]);
    const countriesTemp = ref([]);
    const countriesTemp1 = ref([]);
    const nameofcountries = ref([]);
    const nameofcountries1 = ref([]);
    const loading = ref(true);
    const stringOptions = ref([]);
    const stringOptions1 = ref(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All']);
    const stringOptions2 = ref(['Sort Ascending', 'Sort Descending']);
    const Africacountries = ref([]);
    const Americascountries = ref([]);
    const Asiascountries = ref([]);
    const Europecountries = ref([]);
    const Oceaniacountries = ref([]);
    const mycolorflag = ref(false);
    const mycolorflag1 = ref(false);
    const myheaderflag = ref(false);
    const myheaderflag1 = ref(true);

    async function getCountries() {
      await axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,languages"
        )
        .then(function (response) {
          countries.value = response.data;
          // nameofcountries.value = response.data.name.common;
          // countries.value = JSON.stringify(response.data);
          // countries.value = JSON.parse(countries.value);
          loading.value = false;
          for (let index in response.data) {
            nameofcountries.value += response.data[index].name.common + ',';
          }
          for (let index in response.data) {
            switch (response.data[index].region) {
              case 'Africa':
                Africacountries.value[index] = response.data[index]
                break;
              case 'Americas':
                Americascountries.value[index] = response.data[index]
                break;
              case 'Asia':
                Asiascountries.value[index] = response.data[index]
                break;
              case 'Europe':
                Europecountries.value[index] = response.data[index]
                break;
              case 'Oceania':
                Oceaniacountries.value[index] = response.data[index]
                break;
              default:
              // code block
            }
          }
          nameofcountries1.value = nameofcountries.value.split(',');
          stringOptions.value = nameofcountries1.value
          Africacountries.value = Africacountries.value.filter(item => item)
          Americascountries.value = Americascountries.value.filter(item => item)
          Asiascountries.value = Asiascountries.value.filter(item => item)
          Europecountries.value = Europecountries.value.filter(item => item)
          Oceaniacountries.value = Oceaniacountries.value.filter(item => item)
          console.log("response.data : ", response.data);
          console.log("Africacountries : ", Africacountries.value);
          console.log("Africacountries : ", Africacountries.value[0]);
          if (response.status == 500) {
            Swal.fire({
              title: "Oops...",
              text: `${response.status} Failed to load resource: net::ERR_NAME_NOT_RESOLVED<br>
            the server-side render faces an error(500 status code internal server error)`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.code);
          if (error.code === 'ERR_NETWORK' || error.code === 'ERR_TIMED_OUT') {
            console.log('error.code === ERR_NETWORK => connection problems..')
            Swal.fire({
              title: `Oops... Error Code is : "${error.code}"`,
              text: `Failed to load resource`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          } else if (error.code === 'ERR_CANCELED') {
            console.log('connection canceled..')
            Swal.fire({
              title: `Oops... Error Code is : "${error.code}"`,
              text: `connection canceled..`,
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        });
      // axios.then();
    }

    getCountries();
    // getCountries().then();

    const $q = useQuasar()

    // get status
    console.log($q.dark.isActive) // true, false

    // get configured status
    console.log($q.dark.mode) // "auto", true, false

    // set status
    $q.dark.set(true) // or false or "auto"

    // toggle
    $q.dark.toggle()

    // const model = ref(null)
    const options = ref(stringOptions)
    const options1 = ref(stringOptions1)
    const options3 = ref(stringOptions2)

    return {
      model,
      model1,
      model3,
      options,
      options1: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'All'],
      options3: ['Sort Ascending', 'Sort Descending'],

      ToggleColorScheme() {
        $q.dark.toggle()
        mycolorflag.value = !mycolorflag.value
        mycolorflag1.value = !mycolorflag1.value
        myheaderflag.value = !myheaderflag.value
        myheaderflag1.value = !myheaderflag1.value
      },

      // <!-- Button : Search for a country -- >
      filterFn(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options.value = stringOptions.value
              }
              else {
                const needle = val.toLowerCase()
                options.value = stringOptions.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options.length > 0) {
                ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                sortbypopulation.value = !sortbypopulation.value
              }
            }
          )
        }, 300)
      },

      filterFnAutoselect(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options.value = stringOptions.value
              }
              else {
                const needle = val.toLowerCase()
                options.value = stringOptions.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options.length > 0 && ref.getOptionIndex() === -1) {
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
              }
            }
          )
        }, 300)
      },

      abortFilterFn() {
        // console.log('delayed filter aborted')
      },
      SearchCountry() {
        if (selectedcountry.value !== " ") {
          for (let index in countries.value) {
            if (selectedcountry.value === countries.value[index].name.common)
              foundcountry.value = countries.value[index]
          }
          console.log("L671 foundcountry.value : ", foundcountry.value)
        }
      },
      // <!--END-Button : Search for a country-- >

      // < !-- Button : Filter by Region -- >
      filterFn2(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options1.value = stringOptions1.value
              }
              else {
                const needle = val.toLowerCase()
                options1.value = stringOptions1.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
                if (sortbypopulation.value === true) { sortbypopulation.value = !sortbypopulation.value }
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options1.length > 0) {
                ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
              }
            }
          )
        }, 300)
      },

      filterFnAutoselect2(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options1.value = stringOptions.value
              }
              else {
                const needle = val.toLowerCase()
                options1.value = stringOptions1.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options1.length > 0 && ref.getOptionIndex() === -1) {
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
                sortbypopulation.value = !sortbypopulation.value
              }
            }
          )
        }, 300)
      },

      abortFilterFn2() {
        // console.log('delayed filter aborted')
      },
      // <!-- END-Button : Filter by Region -- >

      // < !--Sort by Population-- >  
      SortByPopulation() {
        sortbypopulation.value = !sortbypopulation.value
        if (sortbycountryname.value === true) { sortbycountryname.value = !sortbycountryname.value }
        if (selectedregion.value !== " ") {
          switch (selectedregion.value) {
            case 'Africa':
              unsortcountries.value = Africacountries.value
              break;
            case 'Americas':
              unsortcountries.value = Americascountries.value
              break;
            case 'Asia':
              unsortcountries.value = Asiascountries.value
              break;
            case 'Europe':
              unsortcountries.value = Europecountries.value
              break;
            case 'Oceania':
              unsortcountries.value = Oceaniacountries.value
              break;
            case 'All':
              unsortcountries.value = countries.value
              break;
          }
          for (let index in unsortcountries.value) {
            let jndex = index + 1
            for (jndex in unsortcountries.value) {
              if (unsortcountries.value[index].population > unsortcountries.value[jndex].population) {
                current.value = unsortcountries.value[index]
                unsortcountries.value[index] = unsortcountries.value[jndex]
                unsortcountries.value[jndex] = current.value
              }
            }
          }
          sortcountries.value = unsortcountries.value;
        } else {
          countriesTemp.value = countries.value
          for (let index in countriesTemp.value) {
            let jndex = index + 1
            for (jndex in countriesTemp.value) {
              if (countriesTemp.value[index].population > countriesTemp.value[jndex].population) {
                current.value = countries.value[index]
                countriesTemp.value[index] = countriesTemp.value[jndex]
                countriesTemp.value[jndex] = current.value
              }
            }
          }
          sortcountries.value = countriesTemp.value;
        }
      },
      // < !--END-Sort by Population-- >

      //  <!-- Sort by CountryName -- >
      filterFn3(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options3.value = stringOptions2.value
              }
              else {
                const needle = val.toLowerCase()
                options3.value = stringOptions2.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options3.length > 0) {
                ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
              }
            }
          )
        }, 300)
      },

      filterFnAutoselect3(val, update, abort) {
        // call abort() at any time if you can't retrieve data somehow

        setTimeout(() => {
          update(
            () => {
              if (val === '') {
                options3.value = stringOptions2.value
              }
              else {
                const needle = val.toLowerCase()
                options3.value = stringOptions2.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
              }
            },

            // "ref" is the Vue reference to the QSelect
            ref => {
              if (val !== '' && ref.options3.length > 0 && ref.getOptionIndex() === -1) {
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
                ref.toggleOption(ref.options[ref.optionIndex], true) // toggle the focused option
              }
            }
          )
        }, 300)
      },

      abortFilterFn3() {
        // console.log('delayed filter aborted')
      },
      SortByCountryName() {
        if (sortbycountryname.value === false) { sortbycountryname.value = !sortbycountryname.value }
        // sortbycountryname.value = !sortbycountryname.value
        if (sortbypopulation.value === true) { sortbypopulation.value = !sortbypopulation.value }
        console.log("sortbycountryname.value : ", sortbycountryname.value)
        console.log("sortorder.value : ", sortorder.value)
        if (sortbycountryname.value & sortorder.value == "Sort Descending") {
          countriesTemp1.value = countries.value
          for (let index in countriesTemp1.value) {
            let jndex = index + 1
            for (jndex in countriesTemp1.value) {
              if (countriesTemp1.value[index].name.common > countriesTemp1.value[jndex].name.common) {
                current.value = countriesTemp1.value[index]
                countriesTemp1.value[index] = countriesTemp1.value[jndex]
                countriesTemp1.value[jndex] = current.value
              }
            }
          }
          sortorder.value = "Sort Ascending"
        } else if (sortbycountryname.value & sortorder.value == "Sort Ascending") {
          countriesTemp1.value = countries.value
          for (let index in countriesTemp1.value) {
            let jndex = index + 1
            for (jndex in countriesTemp1.value) {
              if (countriesTemp1.value[index].name.common < countriesTemp1.value[jndex].name.common) {
                current.value = countriesTemp1.value[index]
                countriesTemp1.value[index] = countriesTemp1.value[jndex]
                countriesTemp1.value[jndex] = current.value
              }
            }
          }
          sortorder.value = "Sort Descending"
        }
        allcountriesbyname.value = countriesTemp1.value;
      },
      //  <!-- END-Sort by CountryName -- > 
      search, foundcountry, loading, countries, nameofcountries, selectedregion, selectedcountry, sortbypopulation, sortcountries, allcountriesbyname,
      sortbycountryname, sortorder, Africacountries, Americascountries, Asiascountries, Europecountries, Oceaniacountries, mycolorflag1, mycolorflag,
      myheaderflag, myheaderflag1, countriesTemp1,
      // ,scountry, name, placeholder, disabled, maxItem, searchFilter, optionsShown, selected
    };

  },
});
</script>
<style lang="sass" >
//<style lang="sass" src="src/css/aratick.sass">
@import 'src/css/aratick.sass'
</style>
<!-- <style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../assets/icons8-search-48.png") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.scountry {
  background-color: rgb(97, 62, 252);
  cursor: pointer;
}

.error {
  background-color: tomato;
}
</style> -->