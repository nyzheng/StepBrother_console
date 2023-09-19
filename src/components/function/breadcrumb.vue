<style scoped>
.breadcrumb {
    display: flex;
    background-color: #f5f5f5;
    font-family: 'Jockey One', sans-serif;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
a {
    text-decoration: none;
    font-family: 'Noto Sans TC', sans-serif;
    margin: 0 0 0 5px;
}
.space {
    margin: 0 1px;
}
.router-link {
    margin: 0 5px;
    color: #333;
    transition: color 0.3s;
}
.router-link:hover {
    color: #007bff;
}
</style>
<template>
    <div class="breadcrumb">
        <router-link v-for="(item, index) in breadcrumbItems" :to="item.to" :key="index">
            {{ item.label }}
            <span class="space"></span>
            <span v-if="index < breadcrumbItems.length - 1"> / </span>
        </router-link>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadcrumbItems = computed(() => {
    const matched = route.matched
    const items = matched.map((routeRecord) => ({
        label: routeRecord.meta.breadcrumb || routeRecord.meta.title || 'Home',
        to: routeRecord.path,
    }))
    return items
})
</script>
