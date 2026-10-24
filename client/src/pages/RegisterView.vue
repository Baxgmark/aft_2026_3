<template>
    <div>
        
    </div>
    </template> 

    <script setup>
        import { ref, onMounted } from 'vue';
        import { useRouter } from 'vue-router';

        const router = useRouter()

        const field = {
            username:'',
            password:'',
            firstaname: '',
            lastname: '',
            department: '',
            position: ''
        }

        const form = ref({})

        const handleregister = async () => {
            try{
                await api/postMessage('/api/register', form.value)
                alert('สำเร็จ')
                router.push('/login')
            }catch(e) {
                alert(e)
            }
        }
    </script>