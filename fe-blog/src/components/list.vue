<template>
  <div class="blog-list-wrap">
    <div class="blog-item" v-for="(item, index) in blogList" :key="index">
      <p class="title">题目：{{item.title}}</p>
      <div class="content">
        内容：{{
          item.content
        }}
      </div>
      <div class="blog-hander">
        <a @click="del(item.id)">
          删除博客
        </a>
         <a @click="del(item.id)">
           查看详情
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      msg: "list",
      blogList: []
    };
  },
  created() {
    this.getBlogList()
  },
  methods: {
    getBlogList() {
      this.$get("/api/blog/list").then(res => {
        this.blogList = res.data.data;
      });
    },
    del(id) {
      this.$post("/api/blog/del", {id}).then( res=> {
        console.log('删除博文', res)
        if(res.data.errno == -1) {
          this.$message.error('删除失败');
        }else {
          this.$message.success('删除成功');
          this.getBlogList()
        }
      })
    }
  }
};
</script>

<style scoped lang="less">
.blog-list-wrap {
  width:50%;
  margin: 0 auto;
  .blog-item {
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 15px;
  }
  .title {
    font-size: 14px;
    font-weight: 700;
  }
  .content {
    font-size: 14px;
    margin-left: 60px;
    line-height: 25px;
    padding: 15px 0;
    word-break: break-word;
  }
  .blog-hander{
    width: 100%;
    padding-top: 15px;
    font-size: 12px;
    cursor: pointer;
    a{
      padding: 0 10px;
    }
  }
}


</style>
