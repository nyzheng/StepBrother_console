<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
ul {
    padding-inline-start: 0;
}
#function {
    position: relative;
    display: flex;
    margin: 60px 0 10px 0;
    align-items: center;
    justify-content: space-around;
}
#search input {
    margin: 10px;
    border-radius: 5px;
}
#search button {
    color: white;
    background-color: black;
    border: none;
    border-radius: 5px;
    padding: 3px;
    cursor: pointer;
}
#search button:hover {
    background-color: rgb(122, 122, 122);
}
#title {
    width: 100%;
    height: 50px;
    display: flex;
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
}
.products li {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
    width: 160px;
    height: 50px;
    margin: auto;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.data {
    display: flex;
}
.detail {
    background-color: #d2d2d2;
}
.sizes {
    display: flex;
    justify-content: center;
}
.size {
    display: flex;
    flex-direction: column;
    margin: 10px 0 10px;
    width: 70px;
    align-items: center;
}
.size input {
    display: flex;
    width: 40px;
    margin: auto;
    justify-content: center;
    align-items: center;
}
.edit {
    display: flex;
    margin: 20px;
    justify-content: space-evenly;
}
.up {
    background-color: #8fec85;
}
.down {
    background-color: #ea7777;
}
.not_found {
    border-bottom: #000000 solid 2px;
    width: 100%;
    text-align: center;
}
</style>
<template>
    <div id="function">
        <div id="search">
            <label for="search">搜尋產品：</label>
            <input type="text" v-model="searchText" />
            <button @click="search_products">搜尋</button>
        </div>
    </div>
    <div id="title">
        <ul>
            <li>品牌 :</li>

            <li>類別 :</li>

            <li>名稱 :</li>

            <li>價格 :</li>

            <li>狀態:</li>
            <li></li>
        </ul>
    </div>
    <div id="products_container">
        <div v-for="item in jsonData" :key="item.id" class="products" v-if="jsonData">
            <ul class="data">
                <li>{{ item.brand_name }}</li>
                <li>{{ item.class }}</li>
                <li>{{ item.product_name }}</li>
                <li>{{ item.price }}</li>
                <li>
                    <span v-if="item.product_data_status === 0" class="down">下架中</span>
                    <span v-if="item.product_data_status === 1" class="up">上架中</span>
                </li>
                <li>
                    <button @click="toggleDetail(item.id)">
                        {{ showDetail[item.id] ? '收合' : '展開' }}
                    </button>
                </li>
            </ul>
            <div v-if="showDetail[item.id]" class="detail">
                <div class="sizes">
                    <div v-for="sizeStock in detail_data.size_stock" :key="sizeStock.size" class="size">
                        <label>{{ 'US' + sizeStock.size }}</label>
                        <input type="number" v-model="sizeStock.stock" min="0" max="99" />
                    </div>
                </div>
                <div class="edit">
                    <div class="price">
                        <label for="price">價格修改：</label>
                        <input type="text" id="price" v-model="detail_data.price" />
                    </div>
                    <div class="status">
                        <label for="status">狀態修改：</label>
                        <select v-model="detail_data.product_data_status">
                            <option :value="1">上架中</option>
                            <option :value="0">下架中</option>
                        </select>
                    </div>
                    <button @click="product_update(item, detail_data)">確認編輯</button>
                </div>
            </div>
        </div>
        <div v-else class="not_found">查無結果</div>
    </div>
</template>
<script setup>
import router from '@/router'
import orderVue from '@/components/function/order.vue'
import { ref, onMounted } from 'vue'

//後端傳送的整筆資料
const jsonData = ref({})
const showDetail = ref({})
const detail_data = ref({
    size_stock: [],
    price: '',
    product_data_status: 0,
})
const searchText = ref('')

const toggleDetail = async (productId) => {
    if (showDetail.value[productId]) {
        showDetail.value[productId] = false
    } else {
        for (const id in showDetail.value) {
            if (id !== productId) {
                showDetail.value[id] = false
            }
        }
        showDetail.value[productId] = true
        await product_open_storage(productId)
    }
}

const merchandise_management_page = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/merchandise_management_page'
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
        jsonData.value = await response.json()
        console.log(jsonData.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const product_open_storage = async (productId) => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/product_open_storage'
        const headers = {
            'Content-Type': 'application/json',
        }
        console.log(productId)
        const sendID = {
            product_id: productId,
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sendID),
        })

        //回傳指定ID商品資訊
        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        detail_data.value = ref(await response.json()).value
        console.log('detail_data:', detail_data.value)
    } catch (error) {
        console.error('Error fetching JSON data:', error)
    }
}

const product_update = async (item, data) => {
    const dataToSend = {
        product_id: item.id,
        size_stock: data.size_stock,
        price: data.price,
        product_status: data.product_data_status,
    }
    console.log(dataToSend)

    try {
        const response = await fetch('http://localhost:3100/stepbrothers/console/product_update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }
        const responseData = await response.json()
        console.log(responseData)
        alert('更新成功!')
        window.location.reload()
    } catch (error) {
        console.error('Error sending data to backend:', error)
    }
}

const search_products = async () => {
    if (!searchText.value) {
        return
    }
    try {
        const url = 'http://localhost:3100/stepbrothers/console/product_search'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

onMounted(() => {
    merchandise_management_page()
})
</script>
