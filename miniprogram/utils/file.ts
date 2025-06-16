import * as env from "./env";
const { apiHost } = env.getEnv();

const getImageInfo = (src: string) => {
  return wx.getImageInfo({
    src,
    success(res) {
      console.log(res);
    },
  });
};

const getChooseMessageFile = (file: WechatMiniprogram.FileItem) => {
  return wx.chooseMessageFile({
    count: 1,
    type: "image",
    success(res) {
      console.log(res);
    },
  });
};
