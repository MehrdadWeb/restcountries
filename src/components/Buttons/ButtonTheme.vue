<template>
    <!--   <q-btn :label="{ buttonText }">
        <span :class="buttonIcon">{{ buttonText }}</span>
    </q-btn> -->
    <q-btn :label="{ buttonText }" @click="changeTheme">
        <span :class="buttonIcon">{{ buttonText }}</span>
    </q-btn>
</template>

<script>
export default {
    name: "ButtonTheme",
    props: {
        buttonText: String,
        buttonIcon: String,
    },
    emits: ['changeTheme'],
    setup(props, { emit }) {
        return {
            changeTheme() { emit("changeTheme"); },
        }
    },
};
</script>

<style lang="sass">
@import 'src/css/aratick.sass'
</style>

