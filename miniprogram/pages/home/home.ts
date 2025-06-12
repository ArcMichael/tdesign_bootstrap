import { AreaChangeDetail } from "../register/register";
import { items } from "./home.config";

Page({
  data: {
    position: "通州",
    home: {
      options: {
        indicatorDots: false,
        vertical: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
      },
      items: items,
    },
  },
  showRegionPicker(
    e: WechatMiniprogram.CustomEvent<{
      currentTarget: { dataset: { field: string } };
    }>
  ) {
    const field = e.currentTarget.dataset.field;

    this.selectComponent("#areaPicker").onAreaPicker(field);
  },

  onPositionChange(e: WechatMiniprogram.CustomEvent<AreaChangeDetail>) {
    const { text, value } = e.detail;

    const positionOptions: Option = {
      label: text.join("-"),
      value: value.join("-"),
    };

    console.log(positionOptions);

    this.setData({
      position: text[text.length - 1],
    });
  },

  onTabChange(e: any) {
    const idx = e.detail.index;
    console.log(idx);
    switch (idx) {
      case 0:
        console.log(idx);
        // 已经在首页，可以不做任何处理，或者直接 reLaunch 保证回到根
        // wx.reLaunch({ url: "/pages/index/index" });
        break;
      case 1:
        console.log(idx);
        // wx.reLaunch({ url: "/pages/category/category" });
        break;
      case 2:
        console.log(idx);
        // wx.reLaunch({ url: "/pages/cart/cart" });
        break;
      case 3:
        console.log(idx);
        // wx.reLaunch({ url: "/pages/profile/profile" });
        break;
    }
  },
});
