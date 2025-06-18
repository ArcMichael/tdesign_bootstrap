Page({
  data: {
    form: {},
  },
  async onShow() {},
  onReciveFile(e: any) {
    this.setData({
      images: e.detail,
    });
  },
});
