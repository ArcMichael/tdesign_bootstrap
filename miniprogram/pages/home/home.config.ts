export interface Items {
  path: string;
  info: { id: number; name: string };
  activity?: { name: string; status: number };
}

const items: Items[] = [
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
];

export { items };
