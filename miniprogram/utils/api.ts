// utils/api.ts
import { request, RequestOptions, requestWithRetry } from "./request";
import { SocialLogin } from "./auth";
import { getAreaList, setAreaList } from "./storage";

export interface Res<T> {
  code: number;
  data: T;
  msg: string;
}

interface fetchLoginRequestOptions {
  type?: number;
  code: string;
  state?: string;
}

// 示例：获取首页列表
export async function fetchItemList(pageNum = 1, pageSize = 20) {
  const url = `/items?pageNum=${pageNum}&pageSize=${pageSize}`;
  return request<{ list: any[] }>({
    url,
    method: "GET",
    retryCount: 2, // 可选：失败后重试两次
  });
}

// 示例：带重试与超时的搜索接口
export async function searchCoupons(
  params: Record<string, any>,
  pageNum = 1,
  pageSize = 10
) {
  const url = `/msh/coupon/search?pageNum=${pageNum}&pageSize=${pageSize}`;
  return requestWithRetry<{ data: any[] }>(
    { url, method: "POST", data: params },
    { maxRetries: 3, timeout: 5000, delay: 1000 }
  );
}

// 授权
export async function fetchLogin(
  options: fetchLoginRequestOptions
): Promise<Res<SocialLogin>> {
  const { type = 1, code, state = "MNP" } = options;
  const url = `/app-api/member/auth/social-login`;
  const requestConfig: RequestOptions = {
    url: "/app-api/member/auth/social-login",
    method: "POST",
    data: { type, code, state },
  };
  return request(requestConfig);
}

export interface AreaTree {
  id: number;
  name: string;
  children: AreaTree[];
}

// 获取地区树
export const fetchArea = async (): Promise<Res<AreaTree[]>> => {
  // 性能优化 添加 wx.storage

  const areaList = getAreaList();
  if (areaList) return JSON.parse(areaList);

  const requestConfig: RequestOptions = {
    url: `/app-api/system/area/tree`,
    method: "GET",
  };

  const response = await request(requestConfig);

  setAreaList(JSON.stringify(response));

  return response;
};

export interface DictDataProfession {
  id: number;
  label: string;
  value: string;
  dictType: string;
}

// 获取职业
export const fetchProfession = async (): Promise<Res<DictDataProfession[]>> => {
  const requestConfig: RequestOptions = {
    url: "/app-api/system/dict-data/type?type=profession",
  };
  return await request(requestConfig);
};

export interface ResignedUrl {
  configId: number;
  path: string;
  uploadUrl: string;
  url: string;
}

// 上传图片 - 获取文件预签名地址
export const getPresignedUrl = async (): Promise<Res<ResignedUrl>> => {
  const requestConfig: RequestOptions = {
    url: `/app-api/infra/file/presigned-url?name=test`,
    method: "GET",
  };
  return await request(requestConfig);
};

export const postUpload = async (): Promise<Res<string>> => {
  const formData = new FormData();

  const requestConfig: RequestOptions = {
    url: `/app-api/infra/file/upload`,
    method: "POST",
  };
  return await request(requestConfig);
};
