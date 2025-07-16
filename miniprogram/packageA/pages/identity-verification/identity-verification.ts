Page({
  data: {
    config: {
      tab: 1,
    },
    value: '',
  },
  onTabChange(e: WechatMiniprogram.BaseEvent) {
    const target = Number(e.currentTarget.dataset.index);
    if (this.data.config.tab !== target) {
      this.setData({ 'config.tab': target });
    }
  },
  onInputChange(event: WechatMiniprogram.Input) {
    const value = event.detail.value.toString();
    this.setData({
      value,
    });
  },
  onSubmitEducation() {
    console.log('onSubmitEducation');
  },
  onSubmitCampusCard() {
    console.log('onSubmitCampusCard');
  },
});
