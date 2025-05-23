Page({
  assets: {},
  onRegister: async () => {
    return wx.navigateTo({
      url: "/pages/register/register",
    });
  },
});
