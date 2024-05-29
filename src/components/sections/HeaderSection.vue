<template>
    <q-header elevated :class="{ myheader: myheaderflag, myheader1: myheaderflag1 }" height-hint="98">
        <q-toolbar>
            <q-toolbar-title class="text-dark">
                <div class="q-pa-md example-break-row">
                    <div class="row items-start example-container">
                        <div class="example-cell col-8" tabindex="0" :class="{ mycolor: mycolorflag }">
                            Where in the Word?
                        </div>
                        <div class="example-cell" tabindex="0"></div>
                        <div class="example-cell" tabindex="0">
                            <q-btn label="" :class="{ darkcolor: mycolorflag1 }" @click="changeTheme">
                                <span class="mdi mdi-weather-night">Dark Mode</span>
                            </q-btn>
                            <!-- <ButtonTheme buttonIcon="mdi mdi-weather-night" buttonText="Dark Mode"
                  :class="{ darkcolor: mycolorflag1 }" @click="ToggleColorScheme" />-->
                            <!-- <ButtonTheme buttonIcon="mdi mdi-weather-night" buttonText="Dark Mode"
                                :class="{ darkcolor: mycolorflag1 }" @change-theme="ToggleColorScheme" /> -->

                        </div>
                    </div>
                </div>
            </q-toolbar-title>
        </q-toolbar>

        <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->

        <q-space />

        <q-space />
    </q-header>
</template>
<script>
import ButtonTheme from "components/Buttons/ButtonTheme.vue";

export default {
    name: "MySample",
    components: {},
    props: {
        myheaderflag: Boolean,
        myheaderflag1: Boolean,
        mycolorflag1: Boolean,
        mycolorflag: Boolean,
    },
    emits: ['changeTheme'],
    setup(props, { emit }) {
        return { changeTheme() { emit("changeTheme"); }, }
    },
};
</script>
<style lang="sass">
@import 'src/css/aratick.sass'
</style>