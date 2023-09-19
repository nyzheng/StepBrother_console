<style scoped>
/* 共用的 CSS 規則（手機板和電腦都會套用） */
/* 手機板的 CSS 規則（和原先的樣式相同） */
* {
    font-family: 'Noto Sans TC', sans-serif;
}
#nav {
    position: fixed;
    background-color: black;
    width: 100%;
    height: 50px;
    z-index: 2;
    display: flex;
}
#nav ul {
    width: 100%;
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: center;
    align-items: center;
}
#nav li {
    color: #ffffff;
    background-color: #000000;
    padding: 0px 10px;
    margin: 0 20px;
    height: 45px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s; /* 添加過渡效果 */
}
#nav li:hover {
    background-color: #ffffff; /* 背景變成白色 */
    color: #000000; /* 文字變成黑色 */
}
#nav a {
    text-decoration: none;
}
#nav li.active {
    background-color: #ffffff; /* 背景變成白色 */
    color: #000000; /* 文字變成黑色 */
}

/* 電腦版的 CSS 規則 */
@media screen and (min-width: 768px) {
}
</style>

<template>
    <!-- 導覽 -->
    <div id="nav">
        <ul>
            <router-link to="/order_page" exact>
                <li :class="{ active: $route.meta.active === 'order_page' }">訂單管理</li>
            </router-link>
            <router-link to="/account_page">
                <li :class="{ active: $route.path === '/account_page' }">會員總覽</li>
            </router-link>
            <router-link to="/products_page">
                <li :class="{ active: $route.path === '/products_page' }">產品管理</li>
            </router-link>
            <router-link to="/upload_page">
                <li :class="{ active: $route.path === '/upload_page' }">上傳產品</li>
            </router-link>
            <router-link to="all_purchase_history_page">
                <li :class="{ active: $route.path === '/all_purchase_history_page' }">交易紀錄</li>
            </router-link>
            <router-link to="robot_page">
                <li :class="{ active: $route.path === '/robot_page' }">客服管理</li>
            </router-link>
        </ul>
    </div>
</template>

<script setup></script>
