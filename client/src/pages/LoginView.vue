<template>
    <div>
        
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
                const  role = jwtdecode(res.data.token).role
                router.push('/' + role)
            } catch(e){
                alert(e)
            }
        }

    </script>