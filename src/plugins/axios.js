
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { jwtDecode } from 'jwt-decode'



const Axios = axios.create({
    baseURL: process.env.VUE_APP_SERVER
})

Axios.interceptors.request.use(async (config) => {

    const authStore = useAuthStore()
    console.log(config)

    if (config.headers.Authorization) {

        const extract = config.headers.Authorization.split(' ')[1]
        const decoded = jwtDecode(extract)
        const currentDate = new Date()
        const expiry = new Date(decoded.exp * 1000)
        if (currentDate > expiry) {

            const { data } = await Axios.get('/auth/refresh/',{
                headers:{
                    Authorization: `Bearer ${authStore.refreshToken}`
                }
            })
            authStore.accessToken = data.accessToken
            authStore.refreshToken = data.refreshToken
            config.headers.Authorization = `Bearer ${data.accessToken}`;
        }
    }
    return config
},
    async (error) => {
        return Promise.reject(error);
    }
)

export default Axios
