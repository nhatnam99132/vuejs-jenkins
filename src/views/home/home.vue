<template>
    <div>
        Home
        token: {{ this.$store.state.AUTH.token }}
     {{this.$store.getters['AUTH/isLoggedIn']}}
     {{ this.$store.state.AUTH.user }}
     <img src="http://localhost:8081/ApiAuth/public/storage/users/default.png" alt="">
    </div>
</template>

<script>
    export default {
        methods: {
        },
        components: {
          
        }
    }
</script>

<style scoped>

</style>