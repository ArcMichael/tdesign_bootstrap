import { goHome, goEvents, goMessage, goProfile } from '../../utils/navigateHelper';

Component({
  /**
   * 组件的属性列表
   * 可以外部传入 activeIndex，以便渲染不同的高亮状态
   */
  properties: {
    activeIndex: {
      type: Number,
      value: 1,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    hasUnread: 10,
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached() {
      // 当组件被插入到页面节点树时，从属性同步 activeIndex 到 data
      this.setData({
        active: this.properties.activeIndex,
      });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击“主页”
    onTapHome() {
      return goHome();
    },
    // 点击“活动”
    onTapEvents() {
      return goEvents();
    },
    // 点击“消息”
    onTapMessage() {
      return goMessage();
    },
    // 点击“我的”
    onTapProfile() {
      return goProfile();
    },
  },
});
