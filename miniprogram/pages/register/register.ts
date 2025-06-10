import { DictDataProfession, fetchProfession } from "../../utils/api";

export interface PickerOption {
  label: string;
  value: number | string; // 按需求
  children?: PickerOption[];
}

export interface AreaListRaw {
  provinces: Record<string, string>;
  cities: Record<string, string>;
  counties: Record<string, string>;
}

export interface AreaChangeDetail {
  text: string[];
  value: string[];
}

Page({
  data: {
    form: {
      nickname: "",
      gender: null as Option | null,
      height: null as Option | null,
      mbti: null as Option | null,
      birthday: null as Option | null,
      hometown: null as Option | null,
    },
    // picker-overlay 配置
    picker: {
      visible: false,
      field: "",
      title: "",
      options: [] as Option[],
    },
    pickerOptionsMap: {
      gender: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" },
      ],
      height: null as Option[] | null,
      birthday: null as Option[] | null,
      mbti: null as Option[] | null,
      career: null as Option[] | null,
      income: null as Option[] | null,
      school: null as Option[] | null,
    } as PickerOptionsMap,
  },

  /** 点击“出生日期”这一行时调用 */
  showPicker(e: any) {
    // data-field="birthday"，但这里不再走通用 picker，而是调用组件 show()
    const field = e.currentTarget.dataset.field;
    if (field === "birthday") {
      // 通过 id 拿到 date-picker 实例，然后调用它的 show()
      this.selectComponent("#birthdayPicker").show();
    }
  },

  /** date-picker 组件选中后触发 */
  onBirthdayConfirm(e: any) {
    const ts = e.detail.value;

    const birthdayOptions = {
      value: new Date(this.__formatDateDisplay(ts)).getTime().toString(),
      label: ts, // 对应的值，例如 "150"
    };

    this.setData({
      "form.birthday": birthdayOptions,
    });
  },

  /** 把时间戳 ts 格式化成 "YYYY-MM-DD */
  __formatDateDisplay(ts: number) {
    if (!ts) return "";
    const dt = new Date(ts);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  },

  showRegionPicker(
    e: WechatMiniprogram.CustomEvent<{
      currentTarget: { dataset: { field: string } };
    }>
  ) {
    const field = e.currentTarget.dataset.field;

    this.selectComponent("#areaPicker").onAreaPicker(field);
  },

  onHometownChange(e: WechatMiniprogram.CustomEvent<AreaChangeDetail>) {
    const { text, value } = e.detail;

    const hometownOptions: Option = {
      label: text.join("-"),
      value: value.join("-"),
    };

    this.setData({
      "form.hometown": hometownOptions,
    });
  },

  onLocationChange(e: WechatMiniprogram.CustomEvent<AreaChangeDetail>) {
    const { text, value } = e.detail;

    const locationOptions: Option = {
      label: text.join("-"),
      value: value.join("-"),
    };

    this.setData({
      "form.location": locationOptions,
    });
  },

  onNicknameInput(e: any) {
    this.setData({ "form.nickname": e.detail.value });
  },

  onHandlePicker(e: any) {
    const { pickerOptionsMap } = this.data;
    const field = e.currentTarget.dataset.field as string;
    const opts = pickerOptionsMap[field];
    if (!opts || opts.length === 0) return;

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
    const { field, selected } = e.detail as { field: string; selected: Option };
    console.log("onPickerConfirm", field, selected);
    this.setData({
      [`form.${field}`]: selected,
      "picker.visible": false,
    });
  },

  onPickerCancel() {
    this.setData({ "picker.visible": false });
  },

  onNavigationToNextStep() {
    console.log("nav");
    return wx.navigateTo({
      url: "/pages/registerNext/registerNext",
    });
  },

  async initHeightOptions() {
    // 身高
    const heightStart = 150;
    const heightOptions: Option[] = [];
    for (let h = heightStart; h <= 250; h++) {
      heightOptions.push({
        label: `${h}cm`, // 显示文字，例如 "150cm"
        value: `${h}`, // 对应的值，例如 "150"
      });
    }
    this.setData({
      "pickerOptionsMap.height": heightOptions,
    });
  },

  async initMbitOptions() {
    const mbtiList = [
      "ISTJ",
      "ISFJ",
      "INFJ",
      "INTJ",
      "ISTP",
      "ISFP",
      "INFP",
      "INTP",
      "ESTP",
      "ESFP",
      "ENFP",
      "ENTP",
      "ESTJ",
      "ESFJ",
      "ENFJ",
      "ENTJ",
    ];
    // 生成对应的 Option 数组
    const mbtiOptions: Option[] = mbtiList.map((type) => ({
      label: type,
      value: type,
    }));

    this.setData({
      "pickerOptionsMap.mbti": mbtiOptions,
    });
  },

  async initCareerOptions() {
    const { data } = (await fetchProfession()) as {
      data: DictDataProfession[];
    };
    const carrerOptions: Option[] = data.map((type) => ({
      label: type.label,
      value: type.id.toString(),
    }));

    this.setData({
      "pickerOptionsMap.career": carrerOptions,
    });
  },

  async initIncomeOptions() {
    const incomeOptions: Option[] = [
      { label: "5 万以下", value: "<50000" },
      { label: "5-10 万", value: "50000-100000" },
      { label: "10-20 万", value: "100000-200000" },
      { label: "20-50 万", value: "200000-500000" },
      { label: "50-100 万", value: "500000-1000000" },
      { label: "100 万以上", value: ">1000000" },
    ];
    this.setData({
      "pickerOptionsMap.income": incomeOptions,
    });
  },

  async initSchoolOptions() {
    const schoolOptions: Option[] = [
      { label: "清华大学", value: "清华大学" },
      { label: "北京大学", value: "北京大学" },
      { label: "中国科学技术大学", value: "中国科学技术大学" },
      { label: "复旦大学", value: "复旦大学" },
      { label: "中国人民大学", value: "中国人民大学" },
      { label: "上海交通大学", value: "上海交通大学" },
      { label: "南京大学", value: "南京大学" },
      { label: "同济大学", value: "同济大学" },
      { label: "浙江大学", value: "浙江大学" },
      { label: "南开大学", value: "南开大学" },
      { label: "北京航空航天大学", value: "北京航空航天大学" },
      { label: "北京师范大学", value: "北京师范大学" },
      { label: "武汉大学", value: "武汉大学" },
      { label: "西安交通大学", value: "西安交通大学" },
      { label: "天津大学", value: "天津大学" },
      { label: "华中科技大学", value: "华中科技大学" },
      { label: "北京理工大学", value: "北京理工大学" },
      { label: "东南大学", value: "东南大学" },
      { label: "中山大学", value: "中山大学" },
      { label: "华东师范大学", value: "华东师范大学" },
      { label: "哈尔滨工业大学", value: "哈尔滨工业大学" },
      { label: "厦门大学", value: "厦门大学" },
      { label: "西北工业大学", value: "西北工业大学" },
      { label: "中南大学", value: "中南大学" },
      { label: "大连理工大学", value: "大连理工大学" },
      { label: "四川大学", value: "四川大学" },
      { label: "电子科技大学", value: "电子科技大学" },
      { label: "华南理工大学", value: "华南理工大学" },
      { label: "吉林大学", value: "吉林大学" },
      { label: "湖南大学", value: "湖南大学" },
      { label: "重庆大学", value: "重庆大学" },
      { label: "山东大学", value: "山东大学" },
      { label: "中国农业大学", value: "中国农业大学" },
      { label: "中国海洋大学", value: "中国海洋大学" },
      { label: "中央民族大学", value: "中央民族大学" },
      { label: "东北大学", value: "东北大学" },
      { label: "兰州大学", value: "兰州大学" },
      { label: "西北农林科技大学", value: "西北农林科技大学" },
      { label: "国防科技大学", value: "国防科技大学" },
    ];
    this.setData({
      "pickerOptionsMap.school": schoolOptions,
    });
  },

  async onShow() {
    await this.initHeightOptions();
    await this.initMbitOptions();
    await this.initCareerOptions();
    await this.initIncomeOptions();
    await this.initSchoolOptions();
    // await this.initHometownAndLocationOptions();
  },
});
