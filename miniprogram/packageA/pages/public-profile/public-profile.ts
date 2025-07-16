import { friendPref, selfDesc, sliderImages } from "./public-profile.config";

Page({
  data: {
    publicProfile: {
      options: {
        indicatorDots: true,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        easingFunction: "easeInOutCubic",
      },
      items: sliderImages,
    },
    isFollowed: false,
    visible: false,
    selfDesc,
    friendPref,
  },
  async handlePopup(e: any) {
    this.setData({ visible: true });
  },
  async onVisibleChange(e: any) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  async followUser() {
    this.setData({
      isFollowed: true,
    });
  },
  async unfollowUser() {
    this.setData({
      isFollowed: false,
    });
  },
});
