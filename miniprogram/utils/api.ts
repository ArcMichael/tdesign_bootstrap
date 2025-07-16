// utils/api.ts
import { request, RequestOptions, requestWithRetry } from './request';
import { SocialLogin } from './auth';
import { getAreaList, setAreaList, getSchoolList, setSchoolList } from './storage';

export type Res<T> = {
  code: number;
  data: T;
  msg: string;
};

type PostLoginRequestOptions = {
  type?: number;
  code: string;
  state?: string;
};

// 授权
export async function postLogin(options: PostLoginRequestOptions): Promise<Res<SocialLogin>> {
  const { type = 1, code, state = 'MNP' } = options;
  const requestConfig: RequestOptions = {
    url: '/app-api/member/auth/social-login',
    method: 'POST',
    data: { type, code, state },
  };
  return request(requestConfig);
}

export type AreaTree = {
  id: number;
  name: string;
  children: AreaTree[];
};

// 获取地区树
export const getArea = async (): Promise<Res<AreaTree[]>> => {
  // 性能优化 添加 wx.storage

  // === GET FORM LOCAL STORAGE
  const areaList = getAreaList();
  if (areaList) return JSON.parse(areaList);

  const requestConfig: RequestOptions = {
    url: `/app-api/system/area/tree`,
    method: 'GET',
  };

  const response = await requestWithRetry(requestConfig);

  // === SAVE TO LOCALSTORAGE
  setAreaList(JSON.stringify(response));

  return response;
};

export type DictDataBase = {
  id: number;
  label: string;
  value: string;
  dictType: string;
};

export type DictDataProfession = {} & DictDataBase;

export type DictDataMbti = {} & DictDataBase;

export type DictDataSchool = {} & DictDataBase;

// 获取职业
export const getProfession = async (): Promise<Res<DictDataProfession[]>> => {
  const requestConfig: RequestOptions = {
    url: '/app-api/system/dict-data/type?type=profession',
    method: 'GET',
  };
  return await requestWithRetry(requestConfig);
};

// 获取MBTI
export const getMbti = async (): Promise<Res<DictDataMbti[]>> => {
  const requestConfig: RequestOptions = {
    url: '/app-api/system/dict-data/type?type=mbti',
    method: 'GET',
  };
  return await requestWithRetry(requestConfig);
};

// 获取学校
export const getSchool = async (): Promise<Res<DictDataSchool[]>> => {
  const schoolList = getSchoolList();

  if (schoolList) return JSON.parse(schoolList);

  const requestConfig: RequestOptions = {
    url: '/app-api/system/dict-data/type?type=school',
    method: 'GET',
  };
  const { code, data, msg } = (await requestWithRetry(requestConfig)) as Res<DictDataSchool[]>;

  const limit = data.slice(0, 200);

  const responseLimit = {
    code: code,
    data: limit,
    msg: msg,
  };

  setSchoolList(JSON.stringify(responseLimit));

  return responseLimit;
};

export const getSystemDictDataSchool = async (): Promise<Res<DictDataSchool[]>> => {
  const requestConfig: RequestOptions = {
    url: `/admin-api/system/dict-data/page?label=上海&dictType=school&status=0&pageNo=1&pageSize=100`,
    method: 'GET',
  };
  return await requestWithRetry(requestConfig);
};

// 性能优化 添加 wx.storage

// === GET FORM LOCAL STORAGE
// const areaList = getAreaList();
// if (areaList) return JSON.parse(areaList);

// const requestConfig: RequestOptions = {
//   url: `/app-api/system/area/tree`,
//   method: 'GET',
// };

// const response = await requestWithRetry(requestConfig);

// // === SAVE TO LOCALSTORAGE
// setAreaList(JSON.stringify(response));

// return response;

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
    method: 'GET',
  };
  return await requestWithRetry(requestConfig);
};

export const postUpload = async (): Promise<Res<string>> => {
  const requestConfig: RequestOptions = {
    url: `/app-api/infra/file/upload`,
    method: 'POST',
  };
  return await request(requestConfig);
};
