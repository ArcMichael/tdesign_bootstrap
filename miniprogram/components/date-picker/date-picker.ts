const calendarMonth = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

Component({
  /**
   * 把组件当作纯粹的“弹窗提供者”，没有触发区域
   */
  properties: {
    /** 默认标题 */
    title: {
      type: String,
      value: "选择日期",
    },
    /** 只有弹窗，没有触发，这里接收父级传过来的初始值 */
    value: {
      type: null,
      optionalTypes: [String, Number],
      value: "",
    },
    defaultValue: {
      type: null, // 不限制主类型
      optionalTypes: [String, Number],
      value: "",
    },
    /** t-date-time-picker 的模式 */
    mode: {
      type: String,
      value: "date",
    },
    showWeek: {
      type: Boolean,
      value: false,
    },
    filter: {
      type: null,
      value(type: String, options: { value: any; label: String }[]) {
        if (type === "year") {
          return options.sort((a, b) => b.value - a.value);
        }
        return options;
      },
    },
    start: {
      type: String,
      value: "1970-01-01 00:00:00",
    },
    /** 可选区间结束时间 */
    end: {
      type: String,
      value: new Date().toISOString().replace("T", " ").slice(0, 19),
    },
    formatter: {
      type: null,
      value(
        item: { value: string | number; label: string },
        index: number
      ): { value: string | number; label: string } {
        if (index === 1) {
          // 月份列
          const label = item.label.slice(0, -1);
          return {
            value: item.value,
            label: calendarMonth[Number(label) - 1],
          };
        }
        // 其余列
        return { value: item.value, label: item.label.slice(0, -1) };
      },
    },
    popupProps: {
      type: Object,
      value: {
        usingCustomNavbar: true,
      },
    },
    format: {
      type: String,
      value: "YYYY-MM-DD",
    },
  },

  data: {
    /** 控制弹窗显示隐藏 */
    pickerVisible: false,
    /** 内部存储的当前日期（时间戳） */
    internalDate: new Date().getTime(),
    minDate: 0,
    maxDate: 0,
  },

  lifetimes: {
    attached() {},
  },

  methods: {
    /** 对外暴露：显示弹窗 */
    show() {
      this.setData({ pickerVisible: true });
    },
    /** 对外暴露：隐藏弹窗 */
    hide() {
      this.setData({ pickerVisible: false });
    },
    /** 用户在弹窗中确认后触发 */
    __onConfirm(e: WechatMiniprogram.CustomEvent<{ value: number }>) {
      const { value } = e.detail; // 时间戳
      this.setData({
        internalDate: value,
        pickerVisible: false,
      });
      // 把选中的时间戳通过事件抛给父组件
      this.triggerEvent("confirm", { value });
    },
    /** 滚动过程中可以内部触发 pick 事件，父级如有需要可以绑定 */
    __onColumnChange(
      e: WechatMiniprogram.CustomEvent<{ columnIndex: number; value: number }>
    ) {
      this.triggerEvent("pick", e.detail);
    },
    /** 取消或关闭时，隐藏弹窗 */
    __hidePicker() {
      this.setData({ pickerVisible: false });
    },
  },
});
