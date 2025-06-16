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

export const goLikesMe = () => {
  return wx.navigateTo({
    url: "/packageA/pages/likes-me/likes-me",
  });
};

export const goMyLikes = () => {
  return wx.navigateTo({
    url: "/packageA/pages/my-likes/my-likes",
  });
};

export const goProfileVerification = () => {
  return wx.navigateTo({
    url: "/packageA/pages/profile-verification/profile-verification",
  });
};

export const goSettings = () => {
  return wx.navigateTo({
    url: "/packageA/pages/settings/settings",
  });
};

export const goMyEvents = () => {
  return wx.navigateTo({
    url: "/packageA/pages/my-events/my-events",
  });
};

export const goEditProfile = () => {
  return wx.navigateTo({
    url: "/packageA/pages/edit-profile/edit-profile",
  });
};

export const goEditPrivate = () => {
  return wx.navigateTo({
    url: "/packageA/pages/edit-private/edit-private",
  });
};
