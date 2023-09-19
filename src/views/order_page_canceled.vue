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
    flex-direction: column; /* 将 ul 以垂直方向排列 */
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
    gap: 10px; /* 添加间距，可以根据需要调整 */
    list-style: none; /* 移除默认的列表样式 */
    padding: 0; /* 移除默认的内边距 */
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
    // 自行實現日期格式化邏輯
    return dateTime
}

const order_page_canceled = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/order_management_page' // 替換成後端 API 的 URL
        const headers = {
            // 可以在這裡添加自定義的 headers
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }

        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            headers: headers, // 設定 headers
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const temp = await response.json()
        // 在這裡處理從後端獲取的資料
        jsonData.value = temp.filter((item) => item.purchases[0].purchase_status === 3)
        // console.log(jsonData.value[0])
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const send = async (id, data) => {
    confirm('確定要修改嗎?')
    try {
        const url = 'http://localhost:3100/stepbrothers/console/switch_order_status' // 替換成後端 API 的 URL
        const headers = {
            'Content-Type': 'application/json', // 例如這裡設定請求的 Content-Type 為 JSON
        }

        const dataToSend = {
            id: id,
            user_id: data.user_id,
            time: data.time,
            purchase_status: data.purchases[0].purchase_status,
        }

        const response = await fetch(url, {
            method: 'PUT', // 使用 GET 方法
            headers: headers, // 設定 headers
            body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        const responseData = await response.json()
        console.log(responseData)
        if (!responseData) {
            alert('已出貨或已取消的商品無法修改狀態!')
            window.location.reload()
        }
        window.location.reload()
    } catch (error) {
        console.error('Error sending data:', error)
    }
}
onMounted(() => {
    order_page_canceled()
})
</script>
