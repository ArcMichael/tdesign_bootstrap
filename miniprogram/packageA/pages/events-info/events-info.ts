import { avatars, images, info, swiper } from './events-info.config';
import * as navigateHelper from '../../../utils/navigateHelper';

Page({
  data: {
    eventInfo: {
      options: {
        current: 0,
        indicatorDots: false,
        vertical: false,
        autoplay: false,
        interval: 2000,
        duration: 500,
        easingFunction: 'linear',
      },
      items: swiper.items,
      avatars: avatars.items,
      info: {
        intro: [...new Set(info.intro.split('\n'))].join('\n'),
        notice: [...new Set(info.notice.split('\n'))].join('\n'),
        images,
      },
    },
    authorization: false,
  },
  onChange(e: WechatMiniprogram.CustomEvent<{ current: number }>) {
    const { current } = e.detail;
    this.setData({
      'eventInfo.options.current': current,
    });
  },
  goAttendeeList() {
    return navigateHelper.goAttendeeList();
  },
});
