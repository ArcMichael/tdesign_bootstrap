import * as navigateHelper from '../../utils/navigateHelper';

type FileItem = WechatMiniprogram.UploadFileOption & {
  status?: 'loading' | 'done' | 'error';
  percent?: number;
  url?: string;
};

type ResponseOploadSuccess = {
  file: FileItem;
  index?: number;
};

type Dataset = {
  field: string;
  position: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
};

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
  async onUploadSuccess(
    event: WechatMiniprogram.CustomEvent<
      ResponseOploadSuccess & {
        currentTarget: {
          dataset: Dataset;
        };
      }
    >,
  ) {
    console.log(event);
    const { field, position } = event.currentTarget.dataset;
    const { file } = event.detail;

    if (!file || !file.url) return;

    const key = `form.${field}`;

    this.setData({
      [key]: {
        url: file.url,
        position,
      },
    });
  },
});
