import * as navigateHelper from '../../utils/navigateHelper';

Page({
  data: {
    activeMessageTab: 'system',
  },
  onMessageTabChange(e: WechatMiniprogram.BaseEvent) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeMessageTab: type,
    });
  },
  goChat() {
    return navigateHelper.goChat();
  },
});
