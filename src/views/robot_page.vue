<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
button {
    cursor: pointer;
}
.robot_container {
    margin: 70px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.question_and_answer {
    width: 70%;
    display: flex;
    flex-direction: column;
    background-color: #d2d2d2;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    padding: 10px 0;
    margin: 10px;
    padding: 20px;
}
.label {
    font-size: 20px;
    margin-right: 20px;
}
#question_input {
    width: 80%;
    height: 40px;
    font-size: 25px;
    padding: 10px;
    border-radius: 5px;
    overflow: auto; /* 超出範圍時顯示捲軸 */
    word-wrap: break-word; /* 超出範圍時自動換行 */
}
.open_button {
    font-size: 25px;
    margin: 0 15px;
}
.delete_button {
    font-size: 25px;
}
.answer {
    display: flex;
    flex-direction: column;
}
#answer_input {
    margin-top: 20px;
    width: 80%;
    height: 100px;
    font-size: 25px;
    padding: 10px;
    border-radius: 5px;
}
.answer_down {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5px;
}
.edit_button {
    padding: 10px 30px;
    font-size: 20px;
    background-color: black;
    color: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.edit_button:hover {
    background-color: rgb(38 38 38);
}
.creat_question_answer_button {
    font-size: 25px;
    margin-top: 50px;
    padding: 15px 25px;
    background-color: #000000;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.creat_question_answer_button:hover {
    background-color: rgb(38 38 38);
}
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background-color: rgb(208, 204, 204);
    padding: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.button_container {
    display: flex;
    justify-content: space-evenly;
    margin: 10px 0 0 0;
}
.popup_question,
.popup_answer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 25px;
}
#popup_question_input {
    width: 80%;
    padding: 10px;
    font-size: 25px;
    border-radius: 5px;
}
#popup_answer_input {
    width: 80%;
    padding: 10px;
    font-size: 25px;
    height: 200px;
    border-radius: 5px;
}
.popup_buttoon_div {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0 0 0 20px;
}
.popup_buttoon_div .check {
    padding: 5px 60px;
    font-size: 25px;
    background-color: #000000;
    color: white;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
.cancel {
    position: fixed;
    width: 40px;
    height: 40px;
    font-size: 25px;
    background-color: rgb(0, 0, 0);
    color: white;
    border: 0;
    border-radius: 50%;
    top: -15px;
    right: -15px;
}
.cancel::before,
.cancel::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 24px;
    background-color: white;
    top: 8px;
    left: 19px;
    transform: rotate(45deg);
}
.cancel::after {
    transform: rotate(-45deg);
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
}
</style>

<template>
    <div class="robot_container">
        <div v-for="item in jsonData" :key="item.id" class="question_and_answer">
            <div class="question">
                <label for="question_input" class="label">問題:</label>
                <input type="text" id="question_input" v-model="item.question" />
                <div class="button_container">
                    <button @click="toggleDetail(item.id)" class="open_button">
                        {{ showDetail[item.id] ? '收合' : '展開' }}
                    </button>

                    <button class="delete_button" @click="removeServiceQA(item.id)">刪除</button>
                </div>
            </div>
            <div v-if="showDetail[item.id]" class="answer">
                <div class="answer_up">
                    <label for="answer_input" class="label">答案:</label>
                    <input type="text" id="answer_input" v-model="item.answer" />
                </div>
                <div class="answer_down">
                    <button class="edit_button" @click="updateServiceQA(item.id, item.question, item.answer)">
                        確認編輯
                    </button>
                </div>
            </div>
        </div>
        <div v-if="isPopupVisible" class="overlay"></div>
        <!-- 彈跳視窗 -->
        <button @click="togglePopup" class="creat_question_answer_button">創建問題與回答</button>
        <div v-if="isPopupVisible" class="popup">
            <div class="popup_question">
                <label for="popup_question_input" class="label">輸入問題:</label>
                <input type="text" id="popup_question_input" v-model="question_input_value" />
            </div>
            <div class="popup_answer">
                <label for="popup_answer_input" class="label">輸入回答:</label>
                <textarea id="popup_answer_input" v-model="answer_input_value"></textarea>
            </div>
            <div class="popup_buttoon_div">
                <button @click="addServiceQA" class="check">創建</button>
            </div>
            <button @click="cancel_input_value" class="cancel"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

//展開回答使用
const showDetail = ref({})
const toggleDetail = (id) => {
    showDetail.value[id] = !showDetail.value[id]
}
//-----------彈跳視窗，創建問題與回答使用
const isPopupVisible = ref(false)
const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value
}
//新增輸入欄位
const question_input_value = ref('')
const answer_input_value = ref('')
//取消按鈕使用
const cancel_input_value = () => {
    question_input_value.value = ''
    answer_input_value.value = ''
    isPopupVisible.value = false
}
const jsonData = ref([])

//一開始獲取後端資料
const get_data = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/service_QA_page' // 替換成後端 API 的 URL
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
        console.log(jsonData.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

//新增QA資料到後端
const addServiceQA = async () => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/add_service_QA'
        const headers = {
            'Content-Type': 'application/json',
        }
        const requestBody = {
            question: question_input_value.value,
            answer: answer_input_value.value,
        }
        console.log('輸入問題', question_input_value.value)
        console.log('輸入回答', answer_input_value.value)

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const responseData = await response.json()
        console.log('Response data:', responseData)
        alert('創建成功')
        window.location.reload()
        //得到資料處理完成後，將它清空後關閉彈跳視窗
        question_input_value.value = ''
        answer_input_value.value = ''
        isPopupVisible.value = false
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

//移除QA
const removeServiceQA = async (id) => {
    confirm('確定要刪除嗎?')
    try {
        const url = 'http://localhost:3100/stepbrothers/console/remove_service_QA'
        const headers = {
            'Content-Type': 'application/json',
        }

        const requestBody = {
            QA_id: id,
        }
        console.log('移除QA::' + requestBody)

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const responseData = await response.json()
        console.log('Response data:', responseData)
        alert('刪除成功')
        window.location.reload()
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

//修改QA
const updateServiceQA = async (id, question, answer) => {
    try {
        const url = 'http://localhost:3100/stepbrothers/console/update_service_QA'
        const headers = {
            'Content-Type': 'application/json',
        }
        const requestBody = {
            QA_id: id,
            question: question,
            answer: answer,
        }
        console.log('修改QA::' + requestBody)

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok.')
        }

        const responseData = await response.json()
        console.log('Response data:', responseData)
        alert('修改成功')
        window.location.reload()
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    get_data()
})
</script>
