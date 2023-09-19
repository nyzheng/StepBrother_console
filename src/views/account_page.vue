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
<template>
    <div id="title">
        <ul>
            <li>帳號 :</li>
            <li>姓名 :</li>
            <li>電子信箱 :</li>
            <li>聯絡電話 :</li>
            <li>會員等級 :</li>
            <li>累積消費金額 :</li>
        </ul>
    </div>
    <div v-for="item in jsonData" :key="item.id" class="info">
        <ul>
            <li>{{ item.account }}</li>
            <li>{{ item.name }}</li>
            <li>{{ item.mail }}</li>
            <li>{{ item.phone }}</li>
            <li>
                <span v-if="item.grade === 1">普通會員</span>
                <span v-else-if="item.grade === 2">白銀會員</span>
                <span v-else-if="item.grade === 3">黃金會員</span>
            </li>
            <li>
                {{ item.purchase_CA }}
                <span v-if="!item.purchase_CA">0</span>
                <span v-else-if="item.purchase_CA"></span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const jsonData = ref({})

const all_user_page = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/all_user_page' // 替換成後端 API 的 URL
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(url, {
            method: 'GET', // 使用 GET 方法
            headers: headers, // 設定 headers
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

onMounted(() => {
    all_user_page()
})
</script>
