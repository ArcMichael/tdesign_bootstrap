import { AREA_LIST_STORAGE_KEY, SCHOOL_LIST_STROAGE_KEY } from './constants';

/**
 * 将 areaList 保存到小程序本地缓存
 * @param areaList 后端返回的登录 areaList
 */
export function setAreaList(areaList: string): void {
  try {
    wx.setStorageSync(AREA_LIST_STORAGE_KEY, areaList);
  } catch (e) {
    console.error('保存 area list 到小程序本地缓存失败：', e);
  }
}

/**
 * 从小程序本地缓存读取 areaList
 * @returns string 或 null
 */
export function getAreaList(): string | null {
  try {
    const areaList = wx.getStorageSync(AREA_LIST_STORAGE_KEY);
    return areaList || null;
  } catch (e) {
    console.error('从小程序本地缓存读取 area list 失败：', e);
    return null;
  }
}

/**
 * 将 schoolList 保存到小程序本地缓存
 * @param schoolList 后端返回的登录 schoolList
 */
export function setSchoolList(schoolList: string): void {
  try {
    wx.setStorageSync(SCHOOL_LIST_STROAGE_KEY, schoolList);
  } catch (e) {
    console.error('保存 school list 到小程序本地缓存失败：', e);
  }
}

/**
 * 从小程序本地缓存读取 areaList
 * @returns string 或 null
 */
export function getSchoolList(): string | null {
  try {
    const schoolList = wx.getStorageSync(SCHOOL_LIST_STROAGE_KEY);
    return schoolList || null;
  } catch (e) {
    console.error('从小程序本地缓存读取 school list 失败：', e);
    return null;
  }
}
