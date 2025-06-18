import { eventImages, avatarImaes } from "./my-events.config";

Page({
  data: {
    config: {
      tab: 1,
    },
    eventImages,
    avatarImaes,
  },
  onTabChange(e: WechatMiniprogram.BaseEvent) {
    const target = Number(e.currentTarget.dataset.index);
    if (this.data.config.tab !== target) {
      this.setData({ "config.tab": target });
    }
  },
});
