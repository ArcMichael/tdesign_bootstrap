// utils/funcHelper.ts

import * as navigateHelper from "./navigateHelper";

interface AuthOptions {
  needRedirect?: boolean;
}

/**
 * 跳转助手
 */
export const loginHandler = async (): Promise<void> => {
  await navigateHelper.goLoginWithRedirect();
};

/**
 * 检查用户是否已授权
 * @param options.needRedirect - 未授权时是否自动跳转登录
 * @returns 返回授权状态：true 表示已授权，false 表示未授权
 */
export async function checkAuthorization(
  options: AuthOptions = {}
): Promise<boolean> {
  const { needRedirect = false } = options;
  const token = wx.getStorageSync("ACCESS_TOKEN");
  const isAuthorized = Boolean(token);

  if (!isAuthorized && needRedirect) {
    await loginHandler();
  }

  return isAuthorized;
}
