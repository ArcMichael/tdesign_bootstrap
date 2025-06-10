import { AREA_LIST_STORAGE_LEY } from "./constants";

/**
 * 将 areaList 保存到小程序本地缓存
 * @param areaList 后端返回的登录 areaList
 */
export function setAreaList(areaList: string): void {
  try {
    wx.setStorageSync(AREA_LIST_STORAGE_LEY, areaList);
  } catch (e) {
    console.error("保存 area list 到小程序本地缓存失败：", e);
  }
}

/**
 * 从小程序本地缓存读取 areaList
 * @returns string 或 null
 */
export function getAreaList(): string | null {
  try {
    const areaList = wx.getStorageSync(AREA_LIST_STORAGE_LEY);
    return areaList || null;
  } catch (e) {
    console.error("从小程序本地缓存读取 area list 失败：", e);
    return null;
  }
}
