Page({
  data: {
    form: {},
  },
  async onShow() {},
  onReciveFile(e) {
    this.setData({
      images: e.detail,
    });
  },
});
