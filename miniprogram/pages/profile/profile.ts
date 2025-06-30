import * as navigateHelper from '../../utils/navigateHelper';

Page({
  data: {
    profile: {
      mylikes: 60,
      likesme: 50,
    },
  },
  async onMyLikes() {
    return navigateHelper.goMyLikes();
  },
  async onLikesMe() {
    return navigateHelper.goLikesMe();
  },
  async onProfileVerification() {
    return navigateHelper.goProfileVerification();
  },
  async onSettings() {
    return navigateHelper.goSettings();
  },
  async onMyEvents() {
    return navigateHelper.goMyEvents();
  },

  async onEditProfile() {
    return navigateHelper.goEditProfile();
  },
  async goWelcome() {
    return navigateHelper.goWelcome();
  },
});
