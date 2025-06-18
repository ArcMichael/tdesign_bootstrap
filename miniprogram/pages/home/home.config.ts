export interface Items {
  path: string;
  info: { id: number; name: string };
  activity?: { name: string; status: number; id: number; opening: boolean };
}

const items: Items[] = [
  {
    path: "https://qiniustatic.womenshike.top/swiper-item.jpg",
    info: {
      id: 0,
      name: "甜七七1",
    },
    activity: {
      name: "南山飞盘暴汗局1",
      id: 0,
      status: 1,
      opening: true,
    },
  },
  {
    path: "https://qiniustatic.womenshike.top/swiper-item.jpg",
    info: {
      id: 1,
      name: "甜七七2",
    },
    activity: {
      name: "南山飞盘暴汗局2",
      id: 1,
      status: 0,
      opening: false,
    },
  },
  {
    path: "https://qiniustatic.womenshike.top/swiper-item.jpg",
    info: {
      id: 2,
      name: "甜七七3",
    },
  },
];

export { items };
