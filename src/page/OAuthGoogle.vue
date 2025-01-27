<template>
    <div>
        loading
    </div>
</template>
<script>
import {mapActions} from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
    export default{
        async mounted(){
            const { code } = this.$route.query

            try{
                await this.googlelogin(code)
                this.$router.push('/chat')
            }catch(err){
                console.log(err)
            }
        },
        methods: {
            ...mapActions(useAuthStore, ['googlelogin'])
        }
    }
</script>