<template>
  <div>
    <Header :style="{ width: '100%' }">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">
          <img
            alt="Vue logo"
            src="../../assets/hublot.png"
            style="width: 50px; height: 50px"
          />
        </div>
        <div class="layout-nav">
          <MenuItem name="1">
            <router-link style="" to="/"
              ><Icon type="ios-navigate"></Icon> Home</router-link
            >
          </MenuItem>
          <MenuItem name="2">
            <router-link to="/about"
              ><Icon type="ios-keypad"></Icon> About</router-link
            >
          </MenuItem>
          <MenuItem name="3">
            <router-link to="/quiz"
              ><Icon type="ios-aperture"></Icon> Quiz</router-link
            >
          </MenuItem>
        </div>
        <div class="layout-nav" v-if="isLoggedIn">
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-stats" />
              Hello {{ this.$store.state.AUTH.user.name }}
            </template>
            <MenuGroup title="info">
              <MenuItem name="4-1"><p @click="goProfile">Profile</p> </MenuItem>
            </MenuGroup>
              <MenuItem name="4-2"><p @click="logout">Logout</p></MenuItem>
          </Submenu>
        </div>
        <div class="layout-nav" v-else>
          <MenuItem name="5">
            <router-link to="/login"
              ><Icon type="ios-analytics"></Icon> Login</router-link
            >
          </MenuItem>
          <MenuItem name="6">
            <router-link :to="{ name: 'Register'} "
              ><Icon type="ios-paper"></Icon> Register</router-link
            >
          </MenuItem>
        </div>
      </Menu>
    </Header>
  </div>
</template>

<script>
export default {
  name: "public-header",
  data() {
    return {
      
    };
  },
  methods: {
      async logout() {
         await this.$store
            .dispatch("AUTH/logout")
            .then(() => {
              this.$Message.success('Logout success');
              //console.log("Token: "+this.$store.state.AUTH.token);
              
              //console.log("Token sau khi logout: "+this.$store.state.AUTH.token);
            });
      },
      goProfile() {
        this.$router.push('/dashboard');
      }
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters['AUTH/isLoggedIn']}
    },
};
</script>

<style scoped>
a {
  color: #ddd;
}
</style>