export const goLoginWithRedirect = () => {
  // 重定向去登录
  return wx.redirectTo({
    url: "/pages/welcome/welcome",
  });
};

export const goRegister = () => {
  return wx.navigateTo({
    url: "/pages/register/register",
  });
};
