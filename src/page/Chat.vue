<template>
  <div class="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Chat Room</h2>
    <div v-if="!connected" class="text-center text-gray-500">Connecting...</div>
    <div v-else>
      <div class="space-y-4 mb-6">
        <div
          v-for="message in messages"
          :key="message.id"
          class="border-b border-gray-200 pb-2"
        >
          <strong class="text-indigo-600">{{ message.byUser.userName }}</strong
          >: {{ message.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="flex space-x-4">
        <input
          v-model="newMessage"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Type a message"
          required
        />
        <button
          type="submit"
          class="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
        <button @click="handleLogOut"
          class="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
        <router-link to="/getAllUsers"> Go to users </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {io} from 'socket.io-client'
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      connected: false,
      socket: null,
    };
  },
  async created() {
    this.connectWebSocket();
    // get chat history
    try {
      const { data } = await axios.get(`http://localhost:3000/chat/`);
      this.messages.push(...data);
      // console.log(this.messages)
    } catch (err) {
      console.log(err.message);
    }
  },
  methods: {
    connectWebSocket() {
      console.log("Trying to connect!");
      this.socket = io("http://localhost:3000/", {
        transports: ["websocket"],
      });


      // this.socket.join('chat')
      this.socket.on("connect", () => {
        this.connected = true;
        console.log("Websocket Initialized!");
      });

      this.socket.on("re-message", (message) => {
        this.messages.push(message);
      });

      this.socket.on("disconnect", () => {
        this.connected = false;
      });
    },
    // Extract user info from Token
    sendMessage() {
      // const user = JSON.parse(localStorage.getItem("user"));
      const message = {
        text: this.newMessage,
        username: this.user.email,
        id: this.user._id,
      };
      this.socket.emit("send-message", message);
      this.newMessage = "";
    },
    ...mapActions(useAuthStore, ['logout']),

    async handleLogOut(){
      await this.logout() 
      this.socket.disconnect()
      this.$router.push('/')
    }
  },
  
  computed:{
    ...mapState(useAuthStore, ['user'])
  }
};
</script>