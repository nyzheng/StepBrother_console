<style scoped>
* {
    font-family: 'Noto Sans TC', sans-serif;
}
#categories {
    position: fixed;
    width: 100%;
    height: 50px;
    z-index: 2;
    display: flex;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    margin-top: 50px;
    background-color: white;
}
#categories ul {
    width: 100%;
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: center;
    align-items: center;
}
#categories li {
    color: #000000;
    padding: 0px 10px;
    margin: 0 20px;
    height: 45px;
    display: flex;
    align-items: center;
    border-radius: 5px;
}
#categories li:hover {
    color: #797979; /* 文字變成黑色 */
}
#categories a {
    text-decoration: none;
}
#title {
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    margin-top: 10px;
    border-top: solid 2px black;
    background-color: #d2d2d2;
    align-items: center;
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

/* 電腦版的 CSS 規則 */
@media screen and (min-width: 768px) {
}
</style>

<template>
    <!-- 分類 -->
    <div id="categories">
        <ul>
            <router-link to="/order_page_all"><li>全部訂單</li></router-link>
            <span>/</span>
            <router-link to="/order_page_preparing">
                <li>準備中</li>
            </router-link>
            <span>/</span>
            <router-link to="/order_page_checking">
                <li>審核中</li>
            </router-link>
            <span>/</span>
            <router-link to="/order_page_canceled">
                <li>已取消</li>
            </router-link>
            <span>/</span>
            <router-link to="/order_page_shipped">
                <li>已出貨</li>
            </router-link>
        </ul>
    </div>

    <div id="title">
        <ul>
            <li>訂單日期</li>
            <li>訂單編號</li>
            <li>訂購會員</li>
            <li>訂單金額</li>
            <li>訂單狀態</li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script setup></script>
