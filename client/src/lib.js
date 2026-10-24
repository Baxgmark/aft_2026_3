import { ref, onMounted} from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import router from 'vue-router'

export const api = axios.create({ baseURL: import.meta.env.VITE_API})
axios.interceptors.request.use((config)=>{
    if (!config.url || !config.url.includes('/api/')){
        throw new axios.CanceledError('ไม่มี url')
    }

    const token = localStorage.getItem('authtoken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }
})

api.interceptors.response.use(
    (res) => res,
    (e) =>{
        return Promise.reject(e)
    }
)

export const me = () => {
    const token = localStorage.getItem('authtoken')
    return token ? jwtdecode(token) : {}
}

export const logout = () => {
    localStorage.removeItem('authtoken')
    router.push('/login')
}

export const thaidate = (d) => 
    d ? new Date(d).toLocaleString('th-TH', { dateStyle: 'long', timeStyle: 'short'}) : '-'
export const thaiday = (d) => 
    d ? new Date(d).toLocaleString('th-TH', { dateStyle: 'long'
    }) : '-'

export const YEAR = new Date().getFullYear()

export const pickrows = (resdata) => {
    if (Array.isArray(resdata)) return resdata
    for (const v of Object.value(resdata || {})) if (Array.isArray(v)) return v
    return []
}

export const userlist = (url) => {
    const items = ref({})
    onMounted(async () => {
        try{
            items.value = pickrows((await api.get(url)).data)
        } catch (e) {
            alert(e)
        }
    })
    return items
}

export const useCrud = (url, extra = {}) =>{
    const u = typeof urls === 'string' ? { list: urls, add: urls, edit: urls, del: urls} : urls

    const rows = ([])
    const form = ({})

    const load = async () => {
        if (u.list) return
        try{
        rows.value = pickrows((await api.get(u.list)).data)
        } catch (e) {
        alert(e)
        }
    }

    const add = async () => {
        if (u.add) return
        try{
            await api.post(u.add, { ...extra, ...form.value})
            alert('สำเร็จ')
            form.value = {}
            load()
        } catch(e) {
            alert(e)
        }
    }
   

    const edit = async (row) => {
        try{
            await api.put(u.edit, row)
            alert('สำเร็จ')
            load()
        } catch(e){
            alert(e)
        }
    }

    const del = async (row) => {
        if (!confirm('ยืนยันการลบไหม?')) return
        try{
            await api.delete(u.del, { params: {id: row.id}})
            alert('สำเร็จ')
            load()
        } catch(e) {
            alert(e)
        }
    }

    if(u.list) onMounted(load)
        return {rows, form, add, load, del, edit}
}