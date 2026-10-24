<template>
    <div>
        <form @submit.prevent="handleregister()">
            <h1>สมัครบัญชี</h1>
            <div v-for="(value, key) in field " :key="key" >
                <p>{{ value }}</p>
                <input v-model="form[key]" :type="key === `password` ? `password`: `text`" :placeholder="value + '...'" />
            </div>
            <button>สมัครบัญชี</button>
        </form>
    </div>
    </template> 

    <script setup>
        import { ref, onMounted } from 'vue';
        import { useRouter } from 'vue-router';
        import { api } from '../lib';

        const router = useRouter()

        const field = {
            username:'ชื่อผู้ใช้',
            password:'รหัสผ่าน',
            firstname: 'ชื่อจริง',
            lastname: 'นามสกุล',
            department: 'แผนก',
            position: 'ตำแหน่ง'
        }

        const form = ref({})

        const handleregister = async () => {
            try{
                await api.post('/api/register', form.value)
                alert('สำเร็จ')
                router.push('/login')
            }catch(e) {
                alert(e)
            }
        }
    </script>