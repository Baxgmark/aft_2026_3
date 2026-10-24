import { ref, onMounted} from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'vue-router'

export const api = axios.create({ baseURL: import.meta.env.VITE_API })
api.interceptors.request.use((config) => {
    if (!config.url || !config.url.includes('/api/')) {
        throw new axios.CanceledError('ยังไม่ได้ตั้ง url')
    }

    const token = localStorage.getItem('authtoken')
    if (token)
        config.headers.Authorization = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    (res) => res,
    (e) => {
        return Promise.reject(e)
    }
)

export const me = () => {
    const token = localStorage.getItem('authtoken')
    return token ? jwtDecode(token) : {}
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

export const useCrud = (url, extra = {}) => {
    const u = typeof url === 'string' ? { list: url, add: url, edit: url, del: urls } : url

    const rows = ref([])
    const form = ref({})

    const load = async () => {
        if (!u.list) return
        try {
            rows.value = pickrows((await api.get(u.list)).data)
        } catch (e) {
            alert(e)
        }
    }

    const add = async () => {
        if (!u.add) return warn('หน้านี้ยังไม่ได้ตั้ง url สำหรับเพิ่มข้อมูล')
        try {
            await api.post(u.add, { ...extra, ...form.value })
            ok('เพิ่มข้อมูลสำเร็จ')
            form.value = {}
            load()
        } catch (e) {
              alert(e)
        }
    }

    const edit = async (row) => {
        try {
            await api.put(u.edit, row)
            ok('แก้ไขสำเร็จ')
            load()
        } catch (e) {
              alert(e)
        }
    }

    const del = async (row) => {
        if (!confirm('ยืนยันการลบ?')) return
        try {
            await api.delete(u.del, { params: { id: row.id } })
            ok('ลบสำเร็จ')
            load()
        } catch (e) {
              alert(e)
        }
    }

    if (u.list) onMounted(load)
    return { rows, form, load, add, edit, del }
}