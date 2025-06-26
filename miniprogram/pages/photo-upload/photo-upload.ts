import * as navigateHelper from '../../utils/navigateHelper';

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
  goHome() {
    return navigateHelper.goHome();
  },
});
