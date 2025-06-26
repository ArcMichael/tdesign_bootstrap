import { fetchLogin } from '../../utils/api';
import { setToken, setOpenID, setUserID } from '../../utils/auth';
import * as navigateHelper from '../../utils/navigateHelper';

Page({
  async onLogin() {
    wx.login({
      success: async (res) => {
        console.log(res);
        if (res.code) {
          const requestConfig = { code: res.code };

          try {
            const response = await fetchLogin(requestConfig);
            if (response.code === 0 && response.data.accessToken) {
              setToken(response.data.accessToken);
            }
            if (response.code === 0 && response.data.openid) {
              setOpenID(response.data.openid);
            }
            if (response.code === 0 && response.data.userId) {
              setUserID(response.data.userId);
            }

            return navigateHelper.goPersonalInfo();
          } catch (err) {
            console.error('登录请求失败：', err);
          }
        }
        return navigateHelper.goPersonalInfo();
      },
      fail(err) {
        console.error('wx.login 调用失败', err);
        return navigateHelper.goPersonalInfo();
      },
    });
  },
  goHome() {
    return navigateHelper.goHome();
  },
});
