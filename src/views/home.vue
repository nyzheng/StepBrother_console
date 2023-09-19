<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}

#title {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 50px;
    border-top: solid 2px black;
    border-bottom: solid 2px black;
    background-color: #d2d2d2;
}

#title ul {
    width: 100%;
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: center;
    align-items: center;
}

#title li {
    color: #000000;
    padding: 0px 10px;
    margin: auto;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    width: 150px;
}
.info {
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: solid 2px black;
}

.info ul {
    width: 100%;
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: center;
    align-items: center;
}

.info li {
    color: #000000;
    padding: 0px 10px;
    margin: auto;
    height: 45px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    width: 150px;
    justify-content: center;
}
</style>
<template></template>
<script setup>
import router from '@/router'
import orderVue from '@/components/function/order.vue'
import { ref, onMounted } from 'vue'

const jsonData = ref({})
</script>
