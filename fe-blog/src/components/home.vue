<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "这是我的微博博客"
    };
  }
};
</script>

<style scoped lang="less"></style>
