module.exports = {
  // 选项...
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 源地址
        changeOrigin: true, // 改变源
        ws: true,
      },
    }
  }
};
