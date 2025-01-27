import { defineStore } from 'pinia'
// import Axios from '@/plugins/axios'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Axios from '@/plugins/axios';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      accessToken: '',
      refreshToken: '',
      user: {}
    }
  },
  // getters:{
  //   isAuthenticated: (state) => {
  //     if(!state.accessToken){
  //       return false
  //     }
  //     const decoded = jwtDecode(state.accessToken);
  //     const expire = new Date(decoded.exp * 1000)
  //     const current = new Date()
  //     return current > expire ? false : true
  //   }
  // },
  actions: {
    async googlelogin(code) {
      const { data } = await Axios.get(`/auth/google-callback?code=${code}`)
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      
      Axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;
      const response = await Axios.get('/auth/me')
      this.user = response.data
    },


    async login(email, password) {
      try {
        const response = await Axios.post(`/auth/login`, {
          email: email,
          password: password
        });

        Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        const { data } = await Axios.get(`/auth/me`
          // ,
          // {
          //   headers: {
          //     authorization: `Bearer ${response.data.accessToken}`
          //   }
          // }
        )
        this.accessToken = response.data.accessToken
        this.refreshToken = response.data.refreshToken
        this.user = data

      } catch (error) {
        alert(error);
      }
    },
    async logout() {
      this.token = ""
      this.user = {}
    },
    async getUsers() {
      const users = await Axios.get('/user')
      console.log(users)
  }
  },
})
