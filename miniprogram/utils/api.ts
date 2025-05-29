// utils/api.ts
import { request, requestWithRetry } from "./request";

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
