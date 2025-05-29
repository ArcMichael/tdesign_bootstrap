import { fetchItemList, searchCoupons } from "../../utils/api";

Page({
  data: {
    form: {
      nickname: "",
      gender: null,
    },
    // picker-overlay 配置
    picker: {
      visible: false,
      field: "",
      title: "",
      options: [],
    },
    pickerOptionsMap: {
      gender: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" },
      ],
    } as PickerOptionsMap,
  },

  onNicknameInput(e: any) {
    this.setData({ "form.nickname": e.detail.value });
  },

  onHandlePicker(e: any) {
    const { pickerOptionsMap } = this.data;
    const field = e.currentTarget.dataset.field;
    const opts = pickerOptionsMap[field];
    if (!opts) return;

    this.setData({
      "picker.visible": true,
      "picker.field": field,
      "picker.title": this._getFieldLabel(field),
      "picker.options": opts,
    });
  },

  _getFieldLabel(field: any) {
    const labels: Record<string, string> = {
      gender: "请选择性别",
      birthday: "请选择出生日期",
      height: "请选择身高",
      mbit: "请选择 Mbit",
      school: "请选择学校",
      hometown: "请选择家乡",
      location: "请选择现居地",
      career: "请选择职业",
      income: "请选择年收入",
    };
    return labels[field] || "";
  },

  onPickerConfirm(e: any) {
    const { field, selected } = e.detail;
    console.log("onPickerConfirm", field, selected);
    this.setData({
      [`form.${field}`]: selected,
      "picker.visible": false,
    });
  },

  onNavigationToNextStep() {
    console.log("nav");
    return wx.navigateTo({
      url: "/pages/registerNext/registerNext",
    });
  },

  async onShow() {
    try {
      // 1) 获取列表
      const resp1 = await fetchItemList(1, 20);
      this.setData({ items: resp1.list });

      // 2) 搜索优惠券
      const params = { keyword: "优惠" };
      const resp2 = await searchCoupons(params, 1, 10);
      this.setData({ coupons: resp2.data });
    } catch (err) {
      console.error("接口调用出错", err);
    }
  },
});
