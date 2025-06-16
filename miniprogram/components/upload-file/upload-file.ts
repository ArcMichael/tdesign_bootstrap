import { getPresignedUrl, ResignedUrl } from "../../utils/api";

type FileItem = WechatMiniprogram.UploadFileOption & {
  status?: "loading" | "done" | "error";
  percent?: number;
};

Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  data: {
    fileList: [] as FileItem[],
  },
  methods: {
    async preUploadFile() {
      // const response = await getPresignedUrl();
      // console.log(response);
    },

    async upload(tempFilePath: string) {
      console.log("upload");
      return await wx.uploadFile({
        url: "http://8.130.116.253:48080/admin-api/infra/file/upload", //仅为示例，非真实的接口地址
        filePath: tempFilePath,
        name: "123123",
        header: {
          Authorization: "Bearer " + wx.getStorageSync("ACCESS_TOKEN"),
        },
        success(res) {
          const data = res.data;
          //do something
        },
      });
    },

    async handleAdd(e: any) {
      const _this = this;
      await this.preUploadFile();
      const { fileList } = this.data;
      const { files } = e.detail;

      // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
      this.setData({
        fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
      });

      // 方法2：每次选择图片都上传，展示每次上传图片的进度
      files.forEach(async (file) => await _this.onUpload(file));
    },
    async onUpload(file: WechatMiniprogram.UploadFileOption) {
      const { fileList } = this.data;

      this.setData({
        fileList: [...fileList, { ...file, status: "loading" }],
      });
      const { length } = fileList;

      console.log(file);

      const _this = this;

      await wx.chooseImage({
        async success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.upload(tempFilePaths[0]);
        },
      });
    },
    handleRemove(e: WechatMiniprogram.CustomEvent<{ index: number }>) {
      const { index } = e.detail;
      const { fileList } = this.data;

      fileList.splice(index, 1);
      this.setData({
        fileList,
      });
    },
  },
});
