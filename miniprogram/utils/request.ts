// request.ts

const BASE_URL = "https://pre.wx.meiweihuixiang.com/api"; // 预发布环境

interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
  baseType?: number;
  retryCount?: number;
  retryDelay?: number;
}

function buildHeaders(
  contentType: string,
  customHeaders?: Record<string, string>
): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": contentType,
  };
  const token = wx.getStorageSync("ACCESS_TOKEN") || "";
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (customHeaders) {
    Object.assign(headers, customHeaders);
  }
  return headers;
}
