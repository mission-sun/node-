<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      博客标题
      <input type="text" v-model="title">
    </p>
    <textarea v-model="content" name="content" id="content" cols="30" rows="10"></textarea>
    <button @click="createBlog">
      创建博客
    </button>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {                      
    return {
      msg: "create",
      title: '',
      content:" "
    };
  },
  methods: {
    createBlog() {
      const data = {
        title: this.title,
        content: this.content
      }
      console.log('data', data)
      this.$post("/api/blog/create", data).then(res => {
        this.blogList = res.data.data;
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
