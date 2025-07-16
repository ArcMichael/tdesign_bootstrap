import * as navigateHelper from '../../../utils/navigateHelper';
import * as auth from '../../../utils/auth';

Page({
  data: {},
  async onUserAgreementTap() {
    return navigateHelper.goUserAgreement();
  },
  async onPrivacyAgreementTap() {
    return navigateHelper.goPrivateAgreement();
  },
  async onLogout() {
    return auth.logOut();
  },
});
