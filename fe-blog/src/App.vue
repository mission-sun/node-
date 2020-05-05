<template>
  <div id="app">
    <!-- <button @click="loginState({'isLogin': true})">临时登录</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import "./common/index.less";
export default {
  name: "app",
  computed: {
   ...mapState({
      isLogin: state => state.isLogin
    }),
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapMutations({
      loginState: 'loginState' 
    }),
    getUser() {
      this.$get("/api/user/islogin").then(res => {
        if( res.data.errno == 0) {
          this.loginState(true)
          this.$router.push({path: '/home/list'}).catch( err => {
          })
          return
        }
        this.loginState(false)
        this.$router.push({path: '/login'}).catch( err => {
        })
      });
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$router.push({ name: 'login' });
    // }, 3000) 

  }
};
</script>

<style>
  body {
    background-color: #f7f7f7;
  }
</style>
