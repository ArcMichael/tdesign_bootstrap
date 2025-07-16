export const goWelcomeWithRedirect = () => {
  // 重定向去登录
  return wx.redirectTo({
    url: '/pages/welcome/welcome',
  });
};

export const goWelcome = () => {
  // 重定向去登录
  return wx.redirectTo({
    url: '/pages/welcome/welcome',
  });
};

export const goPersonalInfo = () => {
  return wx.navigateTo({
    url: '/pages/personal-info/personal-info',
  });
};

export const goPhotoUpload = () => {
  return wx.navigateTo({
    url: '/pages/photo-upload/photo-upload',
  });
};

export const goHome = () => {
  return wx.redirectTo({
    url: '/pages/home/home',
  });
};

export const goEvents = () => {
  return wx.redirectTo({
    url: '/pages/events/events',
  });
};

export const goMessage = () => {
  return wx.redirectTo({
    url: '/pages/message/message',
  });
};

export const goProfile = () => {
  return wx.redirectTo({
    url: '/pages/profile/profile',
  });
};

export const goLikesMe = () => {
  return wx.navigateTo({
    url: '/packageA/pages/likes-me/likes-me',
  });
};

export const goMyLikes = () => {
  return wx.navigateTo({
    url: '/packageA/pages/my-likes/my-likes',
  });
};

export const goProfileVerification = () => {
  return wx.navigateTo({
    url: '/packageA/pages/profile-verification/profile-verification',
  });
};

export const goSettings = () => {
  return wx.navigateTo({
    url: '/packageA/pages/settings/settings',
  });
};

export const goMyEvents = () => {
  return wx.navigateTo({
    url: '/packageA/pages/my-events/my-events',
  });
};

export const goEditProfile = () => {
  return wx.navigateTo({
    url: '/packageA/pages/edit-profile/edit-profile',
  });
};

export const goEditPrivate = () => {
  return wx.navigateTo({
    url: '/packageA/pages/edit-private/edit-private',
  });
};

export const goPublicProfile = () => {
  return wx.navigateTo({
    url: '/packageA/pages/public-profile/public-profile',
  });
};

export const goEventsInfo = () => {
  return wx.navigateTo({
    url: `/packageA/pages/events-info/events-info`,
  });
};

export const goChat = () => {
  return wx.navigateTo({
    url: `/packageA/pages/chat/chat`,
  });
};

export const goAttendeeList = () => {
  return wx.navigateTo({
    url: `/packageA/pages/attendee-list/attendee-list`,
  });
};

export const goUserAgreement = () => {
  return wx.navigateTo({
    url: `/packageA/pages/user-agreement/user-agreement`,
  });
};

export const goPrivateAgreement = () => {
  return wx.navigateTo({
    url: `/packageA/pages/private-agreement/private-agreement`,
  });
};

export const goIdentityVerification = () => {
  return wx.navigateTo({
    url: `/packageA/pages/identity-verification/identity-verification`,
  });
};
