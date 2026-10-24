import {createRouter,createWebHistory} from "vue-router";
import OverView from "../pages/OverView.vue";
import RegisterView from "../pages/RegisterView.vue";
import LoginView from "../pages/LoginView.vue";
import MatchQuiz from "../components/Officer/MatchQuiz.vue";
import MatchView from "../components/Officer/MatchView.vue";
import ReportView from "../components/Officer/ReportView.vue";
import CreateUser from "../components/Officer/CreateUser.vue";
import RoleView from "../components/Officer/RoleView.vue";
import TimeView from "../components/Officer/TimeView.vue";
import TopicView from "../components/Officer/TopicView.vue";
import ChagPass from "../components/Officer/ChagPass.vue";




const router = createRouter ({
    history:createWebHistory(),
    routes:[
        {path:'/',component:OverView},
        {path:'/login',component:LoginView},
        {path:'/register',component:RegisterView},

        //officer
        {path:'/officer',component:TopicView,meta:{role:'officer'}},
        {path:'/officer/match',component:MatchView,meta:{role:'officer'}},
        {path:'/officer/quiz',component:MatchQuiz,meta:{role:'officer'}},
        {path:'/officer/role',component:RoleView,meta:{role:'officer'}},
        {path:'/officer/time',component:TimeView,meta:{role:'officer'}},
        {path:'/officer/report',component:ReportView,meta:{role:'officer'}},
        {path:'/officer/createuser',component:CreateUser,meta:{role:'officer'}},
        {path:'/officer/chagpass/:id',component:ChagPass,meta:{role:'officer'}}
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