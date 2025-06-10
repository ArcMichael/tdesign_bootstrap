Page({
  data: {
    recommend: {
      options: {
        indicatorDots: false,
        vertical: true,
        autoplay: false,
        interval: 2000,
        duration: 500,
      },
      items: [
        {
          path: "http://swik7nyin.hd-bkt.clouddn.com/swiper-item.jpg",
          info: {
            id: 0,
            name: "甜七七1",
          },
          activity: {
            name: "南山飞盘暴汗局1",
            status: 1,
          },
        },
        {
          path: "http://swik7nyin.hd-bkt.clouddn.com/swiper-item.jpg",
          info: {
            id: 1,
            name: "甜七七2",
          },
          activity: {
            name: "南山飞盘暴汗局2",
            status: 0,
          },
        },
        {
          path: "http://swik7nyin.hd-bkt.clouddn.com/swiper-item.jpg",
          info: {
            id: 2,
            name: "甜七七3",
          },
        },
      ],
    },
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
