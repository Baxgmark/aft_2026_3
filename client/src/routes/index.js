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

export default router;