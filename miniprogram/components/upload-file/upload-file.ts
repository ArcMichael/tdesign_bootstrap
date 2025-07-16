import { uploadFileWithProgress } from '../../utils/file';

type FileItem = WechatMiniprogram.UploadFileOption & {
  status?: 'loading' | 'done' | 'error';
  percent?: number;
};

Component({
  properties: {
    fileList: {
      type: Array,
      value: [] as FileItem[],
    },
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  // data: {
  //   fileList: [] as FileItem[],
  // },
  methods: {
    async handleAdd(e: WechatMiniprogram.CustomEvent<{ files: FileItem[] }>) {
      const { files } = e.detail;

      files.forEach(async (file: FileItem) => {
        await this.uploadFile(file);
      });
    },

    async uploadFile(file: FileItem) {
      const fileList = this.properties.fileList;
      // const { fileList } = this.data;
      const index = fileList.length;

      // 加入 loading 状态
      // this.setData({
      //   fileList: [...fileList, { ...file, status: 'loading', percent: 0 }],
      // });

      const fileListCopy = [...fileList, { ...file, status: 'loading', percent: 0 }];

      this.triggerEvent('filechange', fileListCopy);

      try {
        const url = await uploadFileWithProgress({
          filePath: file.url,
          onProgress: (percent) => {
            // this.setData({
            //   [`fileList[${index}].percent`]: percent,
            // });
            // 可选：触发进度事件（也可以更新 percent，但需要额外设计）
            this.triggerEvent('progress', {
              index,
              percent,
            });
          },
        });

        // 成功状态更新
        fileListCopy[index].status = 'done';
        fileListCopy[index].url = url;

        this.triggerEvent('uploadsuccess', {
          index,
          url,
          file: fileListCopy[index],
        });

        // this.setData({
        //   [`fileList[${index}].status`]: 'done',
        //   [`fileList[${index}].url`]: url, // 上传成功返回的地址
        // });

        // this.triggerEvent('uploadsuccess', {
        //   index,
        //   url,
        //   file: this.data.fileList[index],
        // });
      } catch (err) {
        fileListCopy[index].status = 'error';
        this.triggerEvent('uploadfail', {
          index,
          error: err,
        });
        // this.setData({
        //   [`fileList[${index}].status`]: 'error',
        // });
        console.error('上传失败：', err);
      }
    },
  },
});
