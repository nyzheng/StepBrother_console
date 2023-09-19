<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
#search {
    margin-top: 60px;
    text-align: center;
}
ul {
    padding-inline-start: 0;
}
#title {
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 10px;
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
.products {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: solid 1px black;
    padding: 10px 0;
}
.products li {
    display: flex;
    gap: 10px; /* 添加间距，可以根据需要调整 */
    list-style: none; /* 移除默认的列表样式 */
    padding: 0; /* 移除默认的内边距 */
    height: 50px;
    margin: auto;
    justify-content: center;
    align-items: center;
}
.data li {
    width: 160px;
}
.data {
    display: flex;
}
.products_title {
    display: flex;
    background-color: #8d8d8d;
}
.products_info {
    display: flex;
    background-color: #d2d2d2;
}
.products_title li {
    width: 160px;
}
.products_info li {
    width: 160px;
}
.detail {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
}
.customer {
    display: flex;
}
#function {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: 0 0 0 10px; */
}
#search input {
    margin: 10px;
    border-radius: 5px;
}
button {
    color: white;
    background-color: black;
    border: none;
    border-radius: 5px;
    padding: 3px;
    cursor: pointer;
}

button:hover {
    background-color: rgb(122, 122, 122);
}
.not_found {
    border-bottom: #000000 solid 2px;
    width: 100%;
    text-align: center;
}
.download {
    margin: 60px 0 0 20px;
}
.customer {
    background-color: #b8b8b8;
}
</style>
<template>
    <div id="function">
        <div id="search">
            <label for="search">搜尋交易紀錄：</label>
            <input type="text" v-model="searchText" />
            <button @click="search_history">搜尋</button>
        </div>
        <div class="download">
            <button @click="downloadExcel1">下載交易紀錄</button>
        </div>
    </div>
    <div id="title">
        <ul>
            <li>訂單日期</li>
            <li>訂單編號</li>
            <li>訂購會員</li>
            <li>訂單金額</li>
            <li>訂單狀態</li>
            <li></li>
        </ul>
    </div>
    <div id="products_container">
        <div v-for="item in jsonData" :key="item.id" class="products" v-if="jsonData">
            <ul class="data">
                <li>{{ formatDate(item.time) }}</li>
                <li>{{ item.id }}</li>
                <li>{{ item.recipient_name }}</li>
                <li>{{ item.sum }}</li>
                <li>{{ item.purchase_status === 4 ? '已出貨' : '已取消' }}</li>
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
            </div>
        </div>
        <div v-else class="not_found">查無結果</div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const showDetail = ref({})
const jsonData = ref(null)
const searchText = ref('')
const toggleDetail = (id) => {
    showDetail.value[id] = !showDetail.value[id]
}
const formatDate = (dateTime) => {
    return dateTime
}
const all_purchase_history_page = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/all_purchase_history_page' // 替換成後端 API 的 URL
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

        jsonData.value = await response.json()
        // 在這裡處理從後端獲取的資料
        console.log(jsonData.value[0])
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
const search_history = async () => {
    if (!searchText.value) {
        return
    }
    try {
        const url = 'http://localhost:3100/stepbrothers/console/end_order_vague_search'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 根據你的 API 需求設定
            },
            body: JSON.stringify({
                index: searchText.value,
            }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        jsonData.value = await response.json()
        console.log(jsonData.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}
const downloadExcel1 = async () => {
    try {
        const downloadUrl = 'http://localhost:3100/stepbrothers/console/download_history_order'
        const response = await fetch(downloadUrl, {
            method: 'GET',
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const blob = await response.blob()
        const tempUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = tempUrl
        link.setAttribute('download', 'history_order.xlsx')
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(tempUrl)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    // 當組件掛載後，模擬後端回傳的 JSON 資料
    all_purchase_history_page()
})
</script>
