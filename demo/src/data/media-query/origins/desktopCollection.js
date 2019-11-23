import { Api } from "@data-provider/axios";

export const desktopCollection = new Api(`/datadesktop`, {
  defaultValue: []
});
