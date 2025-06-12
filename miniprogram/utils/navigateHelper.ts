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

export const goHome = () => {
  return wx.redirectTo({
    url: "/pages/home/home",
  });
};

export const goEvents = () => {
  return wx.redirectTo({
    url: "/pages/events/events",
  });
};

export const goMessage = () => {
  return wx.redirectTo({
    url: "/pages/message/message",
  });
};

export const goProfile = () => {
  return wx.redirectTo({
    url: "/pages/profile/profile",
  });
};
