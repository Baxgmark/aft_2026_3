import {createRouter,createWebHistory} from "vue-router";
import OverView from "../pages/OverView.vue";
import RegisterView from "../pages/RegisterView.vue";
import LoginView from "../pages/LoginView.vue";

const router = createRouter ({
    history:createWebHistory(),
    routes:[
        {path:'/',component:OverView},
        {path:'/login',component:LoginView},
        {path:'/register',component:RegisterView},
    ]
})

const getrole = () => {
    const token = localStorage.getItem('authtoken')
    if (!token) return null
    try {
        return jwtDecode(token).role
    } catch {
        localStorage.removeItem('authtoken')
        return null
    }
}

// กันเข้าหน้าผิด role
router.beforeEach((to) => {
    if (to.meta.role && to.meta.role !== getrole()) return '/login'
})

export default router