import { items } from "./attendee-list.config";
import * as navigateHelper from "../../../utils/navigateHelper";

Page({
  data: {
    attendeeList: {
      items,
    },
  },
  async toPublicProfile() {
    return await navigateHelper.goPublicProfile();
  },
});
