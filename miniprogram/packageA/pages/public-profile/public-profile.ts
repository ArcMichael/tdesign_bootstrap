import { sliderImages } from "./public-profile.config";

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
  },
});
