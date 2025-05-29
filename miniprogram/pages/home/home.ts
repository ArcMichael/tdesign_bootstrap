Page({
  async onLogin() {
    return wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          // 发起网络请求
          console.log(res.code);
        }
      },
    });
  },
});
