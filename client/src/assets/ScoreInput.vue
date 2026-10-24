<script setup>
defineProps(['type'])
const model = defineModel({default:''})
</script>

<template>
    <select v-model="model">
        <option value="">---เลือก---</option>
        <template v-if="String(type) === '1'">
                <option v-for="n in 4" :key="n" :value="n">{{ n }} คะแนน</option>
        </template>
        <template v-else>
                <option :value="1">ไช่</option>
                <option :value="2">ไม่ไช่</option>
        </template>
    </select>
</template>