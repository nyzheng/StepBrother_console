<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
.guide {
    background-color: #d2d2d2;
    padding: 20px;
    border-left: solid 5px black;
}

.guide li {
    margin: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    position: relative;
    top: 15vh;
    left: 50vh;
    width: 500px;
}
button {
    width: 80px;
}
.content {
    margin: 20px 0;
}
.upload {
    position: relative;
    left: 185px;
}
</style>
<template>
    <div class="container">
        <div class="guide">
            <p>請遵循以下上傳格式規則：</p>
            <ol>
                <li>請上傳三張商品圖片。</li>
                <li>請依序命名商品圖片為 1、2、3。</li>
                <li>圖片格式請先轉換成 webq 格式。</li>
            </ol>
        </div>
        <div class="picture content">
            <label for="upload">上傳圖片：</label>
            <input type="file" id="upload" multiple @change="handleFileUpload" />
        </div>
        <div class="categories content">
            <label for="class">分類：</label>
            <select id="class" v-model="category">
                <option value="1">men</option>
                <option value="2">women</option>
                <option value="3">kids</option>
            </select>
        </div>
        <div class="brand_name content">
            <label for="brand">品牌名稱：</label>
            <select name="brand_name" id="brand" v-model="selectedBrand">
                <option v-for="item in brands" :key="item.brand_name" :value="item.id">
                    {{ item.brand_name }}
                </option>
            </select>
        </div>
        <div class="product_name content">
            <label for="product">商品名稱：</label>
            <input type="text" id="product" v-model="product" placeholder="請輸入完整商品名稱" />
        </div>
        <div class="product_price content">
            <label for="price">商品價格：</label>
            <input type="text" id="price" v-model="price" placeholder="請輸入商品價格" />
        </div>
        <div class="upload">
            <button @click="upload">確認上傳</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const category = ref('')
const selectedBrand = ref('')
const product = ref('')
const brands = ref([])
const price = ref('')
const selectedImages = ref([])
const handleFileUpload = (event) => {
    const files = event.target.files
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        selectedImages.value.push(file)
    }
}

//獲取後端產品資料
const brand_name = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/product_on_shelves_page'
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

        brands.value = await response.json()
        // 在這裡處理從後端獲取的資料
        console.log(brands.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const upload = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/submit_on_shelves'
        // 使用 FormData 來包裹資料
        const formData = new FormData()
        for (let i = 0; i < selectedImages.value.length; i++) {
            formData.append('files', selectedImages.value[i])
        }
        formData.append('brand', selectedBrand.value)
        formData.append('name', product.value)
        formData.append('price', price.value)
        formData.append('category', category.value)

        console.log(selectedBrand.value)
        console.log(product.value)
        console.log(price.value)
        console.log(category.value)

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            alert('上傳失敗，請檢查商品名稱是否已存在')
            throw new Error('Network response was not ok.')
        }
        // 重新載入頁面
        alert('上傳成功!')
        window.location.reload()
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    brand_name()
})
</script>
