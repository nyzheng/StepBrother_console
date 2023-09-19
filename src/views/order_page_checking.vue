<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
#info_container {
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: solid 2px black;
    justify-content: space-around;
    flex-direction: column;
}
#info_container ul {
    width: 100%;
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: space-around;
    align-items: center;
}
#info_container li {
    color: #000000;
    padding: 0px 10px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}
.info {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: solid 1px black;
    padding: 10px 0;
}
.data li {
    width: 100px;
}
.data li,
.customer {
    margin: auto;
}
.detail {
    width: 95%;
    margin: auto;
}
.products_title {
    background-color: #979797;
}
.products_info {
    background-color: #d2d2d2;
}
.products_title,
.products_info {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
}
.products_title li,
.products_info li {
    display: flex;
    width: 20%;
    margin: auto;
    justify-content: center;
}
</style>
<template>
    <orderVue />
    <div id="info_container">
        <div v-for="item in jsonData" :key="item.id" class="info" v-if="jsonData">
            <ul class="data">
                <li>{{ formatDate(item.time) }}</li>
                <li>{{ item.id }}</li>
                <li>{{ item.name }}</li>
                <li>{{ item.sum }}</li>
                <li>
                    <select v-model="item.purchases[0].purchase_status">
                        <option value="1">準備中</option>
                        <option value="2">審核中</option>
                        <option value="3">已取消</option>
                        <option value="4">已出貨</option>
                    </select>
                </li>
                <li>
                    <button @click="send(item.id, item)">確認修改</button>
                </li>
                <li>
                    <button @click="toggleDetail(item.id)">
                        {{ showDetail[item.id] ? '收合' : '展開' }}
                    </button>
                </li>
            </ul>
            <div v-if="showDetail[item.id]" class="detail">
                <ul class="customer">
                    <li>收件人 : {{ item.recipient_name }}</li>
                    <li>收件人電話 : {{ item.recipient_phone }}</li>
                    <li>收件人地址 : {{ item.recipient_address }}</li>
                </ul>
                <div class="prooducts">
                    <ul class="products_title">
                        <li>品牌</li>
                        <li>名稱</li>
                        <li>價格</li>
                        <li>尺寸</li>
                        <li>數量</li>
                    </ul>
                    <ul class="products_info" v-for="detail in item.purchases">
                        <li>{{ detail.brand_name }}</li>
                        <li>{{ detail.product_name }}</li>
                        <li>{{ detail.price }}</li>
                        <li>{{ detail.size }}</li>
                        <li>{{ detail.quantity }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from '@/router'
import orderVue from '@/components/function/order1.vue'
import { ref, onMounted } from 'vue'
const showDetail = ref({})
const jsonData = ref(null)
const toggleDetail = (id) => {
    showDetail.value[id] = !showDetail.value[id]
}
const formatDate = (dateTime) => {
    return dateTime
}

const order_page_checking = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/order_management_page'
        const headers = {
            'Content-Type': 'application/json',
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const temp = await response.json()

        jsonData.value = temp.filter((item) => item.purchases[0].purchase_status === 2)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const send = async (id, data) => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/switch_order_status'
        const headers = {
            'Content-Type': 'application/json',
        }

        const dataToSend = {
            id: id,
            user_id: data.user_id,
            time: data.time,
            purchase_status: data.purchases[0].purchase_status,
        }

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const responseData = await response.json()
        window.location.reload()
        console.log(responseData)
    } catch (error) {
        console.error('Error sending data:', error)
    }
}
onMounted(() => {
    order_page_checking()
})
</script>
