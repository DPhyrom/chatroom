<template>
  <div>loading...</div>
</template>
<script>
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
export default {
  methods: {
    ...mapActions(useAuthStore, ['getUsers']),
  },
  mounted() {
    this.getUsers();
  },
};
</script>