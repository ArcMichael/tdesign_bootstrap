export const goLoginWithRedirect = () => {
  // 重定向去登录
  return wx.redirectTo({
    url: "/pages/welcome/welcome",
  });
};

export const goPersonalInfo = () => {
  return wx.navigateTo({
    url: "/pages/personal-info/personal-info",
  });
};

export const goPhotoUpload = () => {
  return wx.navigateTo({
    url: "/pages/photo-upload/photo-upload",
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
