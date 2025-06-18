// === system wx.getAppAuthorizeSetting 封装 ===

export const querySystemInfo = async () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(info) {
        console.log(info);
      },
    });
  });
};

// === settings wx.getSetting 封装 ===

export const querySettings = async () => {
  return new Promise((resolve, reject) => {
    return wx.getSetting({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(info) {
        console.log(info);
      },
    });
  });
};

// === authorize wx.authorize 封装 ===

export const queryAuthorize = async (scope: string) => {
  return new Promise((resolve, reject) => {
    return wx.authorize({
      scope,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(info) {
        console.log(info);
      },
    });
  });
};

// === open wx.openSetting 封装 ===

export const queryOpenSetting = async () => {
  return new Promise((resolve, reject) => {
    return wx.openSetting({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(info) {
        console.log(info);
      },
    });
  });
};
