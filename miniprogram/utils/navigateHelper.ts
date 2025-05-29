export const goLoginWithRedirect = () => {
  // 重定向去登录
  return wx.redirectTo({
    url: "/pages/home/home",
  });
};
