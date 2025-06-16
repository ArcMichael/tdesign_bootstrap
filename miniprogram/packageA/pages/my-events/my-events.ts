Page({
  data: {
    tab: 1,
  },
  onTabChange(e: WechatMiniprogram.BaseEvent) {
    const target = Number(e.currentTarget.dataset.index);
    if (this.data.tab !== target) {
      this.setData({ tab: target });
    }
  },
});
