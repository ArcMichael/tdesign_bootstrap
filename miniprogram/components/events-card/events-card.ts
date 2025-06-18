import * as navigateHelper from "../../utils/navigateHelper";

Component({
  properties: {
    title: String,
    subtitle: String,
    status: {
      type: String,
      value: "default", // 可为：signing / registered / ended / interesting
    },
    statusText: String,
    statusTagText: String, // <-- 新增字段，如 "报名中"
    condition: String,
    images: {
      type: Array,
      value: [],
    },
    avatars: {
      type: Array,
      value: [],
    },
  },
  methods: {
    onPublicProfile() {
      return navigateHelper.goPublicProfile();
    },
  },
});
