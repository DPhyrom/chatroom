<template>
  <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Login</h2>
    <form @submit.prevent="passwordLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email:</label
        >
        <input
          v-model="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Password:</label
        >
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
    <button
      @click="googleLogin"
      class="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Login google
    </button>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
      return {
        email: '',
        password: ''
      };
  },
  methods: {
    // async login() {
    //   try {
    //     const response = await axios.post('http://localhost:3000/auth/login', {
    //       email: this.email,
    //       password: this.password
    //     });
    //     localStorage.setItem('token', response.data.token);

    //     const { data } = await axios.get('http://localhost:3000/auth/me', {
    //       headers: {
    //         authorization: `Bearer ${response.data.token}`
    //       }
    //     })

    //     localStorage.setItem('user', JSON.stringify(data));
    //     this.$router.push('/chat');
    //   } catch (error) {

    //     alert(error);
    //   }
    // },
    
    googleLogin(){
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_SECRET}&client_id=${process.env.VUE_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_redirect_uri}&response_type=code&scope=profile%20email&access_type=offline`;
        window.open(googleAuthUrl, "_self")
    },
    
    ...mapActions(useAuthStore,['login']),

    async passwordLogin(){
      await this.login(this.email,this.password)
      this.$router.push('/chat')
    }

  },
};
</script>