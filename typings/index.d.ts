/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
  };
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}

declare interface Option {
  label: string;
  value: string;
}
declare type PickerOptionsMap = Record<string, Option[]>;
