import { ACCESS_TOKEN_KEY, OPENID_ID_KEY, USER_ID_KEY } from "./constants";

export interface SocialLogin {
  accessToken: string;
  expiresTime: number;
  openid: string;
  refreshToken: string;
  userId: number;
}

/**
 * 将 accessToken 保存到小程序本地缓存
 * @param accessToken 后端返回的登录 accessToken
 */
export function setToken(accessToken: string): void {
  try {
    wx.setStorageSync(ACCESS_TOKEN_KEY, accessToken);
  } catch (e) {
    console.error("保存 token 到小程序本地缓存失败：", e);
  }
}

/**
 * 从小程序本地缓存读取 accessToken
 * @returns string 或 null
 */
export function getToken(): string | null {
  try {
    const token = wx.getStorageSync(ACCESS_TOKEN_KEY);
    return token || null;
  } catch (e) {
    console.error("从小程序本地缓存读取 token 失败：", e);
    return null;
  }
}

/**
 * 将 UserID 保存到小程序本地缓存
 * @param userID 后端返回的登录 UserID
 */
export function setUserID(userID: string | number): void {
  try {
    wx.setStorageSync(USER_ID_KEY, userID);
  } catch (e) {
    console.error("保存 userID 到小程序本地缓存失败：", e);
  }
}

/**
 * 从小程序本地缓存读取 UserID
 * @returns string 或 null
 */
export function getUserID(): string | null {
  try {
    const UserID = wx.getStorageSync(USER_ID_KEY);
    return UserID || null;
  } catch (e) {
    console.error("从小程序本地缓存读取 userID 失败：", e);
    return null;
  }
}

/**
 * 将 OpenID 保存到小程序本地缓存
 * @param token 后端返回的登录 OpenID
 */
export function setOpenID(OpenID: string): void {
  try {
    wx.setStorageSync(OPENID_ID_KEY, OpenID);
  } catch (e) {
    console.error("保存 OpenID 到小程序本地缓存失败：", e);
  }
}

/**
 * 从小程序本地缓存读取 OpenID
 * @returns string 或 null
 */
export function getOpenID(): string | null {
  try {
    const OpenID = wx.getStorageSync(OPENID_ID_KEY);
    return OpenID || null;
  } catch (e) {
    console.error("从小程序本地缓存读取 OpenID 失败：", e);
    return null;
  }
}
