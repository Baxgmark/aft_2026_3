<template>
    <div>
        <form @submit.prevent="handlelogin()">
            <input type="text" v-model="form.username" placeholder="ชื่อผู้ใช้งาน..." />
            <input type="password" v-model="form.password" placeholder="รหัสผ่าน..." />
            <button>เข้าสู่ระบบ</button>
        </form>
    </div>
    </template> 

    <script setup>
        import { ref} from 'vue'
        import { jwtDecode } from 'jwt-decode';
        import { api } from '../lib';
        import { useRouter } from 'vue-router';

        const router = useRouter()

        const form = ref({username: '', password: ''})

        const handlelogin = async () =>{
            if(!form.value.username || !form.value.password){
                alert('ใส่ให้ครบ')
                return;
            } try{
                const res = await api.post('/api/login', form.value)
                localStorage.setItem('authtoken', res.data.token)
                alert('เข้าสู่ระบบสำเร็จ')
                const  role = jwtDecode(res.data.token).role
                router.push('/' + role)
            } catch(e){
                alert(e)
            }
        }

    </script>