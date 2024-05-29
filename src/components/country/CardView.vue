<template>
    <q-card class="my-card">
        <router-link :to="{ name: 'countryName', params: { id: country.name.common } }">
            <img :src="country.flags.png" style="width: 100%;height: 40%;">
            <!-- <img :src="country.flags.png" class="imgclass"> -->
        </router-link>
        <q-card-section>
            <div class="text-h6">
                <router-link :to="{ name: 'countryName', params: { id: country.name.common } }"
                    style="text-decoration: none;">
                    {{ country.name.common }}
                </router-link>
            </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle2">population : {{ country.population }}</div>
            <div class="text-subtitle2">region : {{
                country.region }}</div>
            <div class="text-subtitle2">capital : {{ country.capital[0] }}</div>
            <div class="text-subtitle2">languages :
                <ul v-for="language in country.languages" :key="language.id" style="list-style-type:none;">
                    <li>{{ language }}</li>
                </ul>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
export default {
    props: {
        country: Object, //user is transferred from Index.vue(Parent) to CardView.vue(Child)
    },
    setup(props, { emit }) {

        return {}
    },
};
</script>

