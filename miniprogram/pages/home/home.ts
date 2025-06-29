import { AreaChangeDetail } from '../personal-info/personal-info';
import { items } from './home.config';
import Message from 'tdesign-miniprogram/message/index';
import * as navigateHelper from '../../utils/navigateHelper';

Page({
  data: {
    showVisible: true,
    position: '通州',
    home: {
      options: {
        indicatorDots: false,
        vertical: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
        easingFunction: 'easeInOutCubic',
      },
      items: items,
    },
    popup: {
      // icon: 'https://qiniustatic.womenshike.top/icon-action-popup-broadcast.png',
      icon: 'https://qiniustatic.womenshike.top/icon-action-popup-identify.png',
      buttonText: '知道了',
    },
  },
  bindanimationfinish(
    e: WechatMiniprogram.CustomEvent<{
      current: number;
    }>,
  ) {
    const length = this.data.home.items.length - 1;
    const current = e.detail.current;
    if (length === current) {
      Message.info({
        context: this,
        offset: [120, 38.4615],
        duration: 3000,
        icon: false,
        // single: false, // 打开注释体验多个消息叠加效果
        content: '当前的推荐已经到底啦',
        align: 'center',
      });
    }
  },
  showRegionPicker(
    e: WechatMiniprogram.CustomEvent<{
      currentTarget: { dataset: { field: string } };
    }>,
  ) {
    const field = e.currentTarget.dataset.field;

    this.selectComponent('#areaPicker').onAreaPicker(field);
  },

  onPositionChange(e: WechatMiniprogram.CustomEvent<AreaChangeDetail>) {
    const { text, value } = e.detail;

    const positionOptions: Option = {
      label: text.join('-'),
      value: value.join('-'),
    };

    console.log(positionOptions);

    this.setData({
      position: text[text.length - 1],
    });
  },
  onClose() {
    this.setData({
      showVisible: false,
    });
  },
  onConfirm() {
    return navigateHelper.goWelcome();
  },
});
