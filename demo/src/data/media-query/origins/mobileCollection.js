import { Api } from "@data-provider/axios";

export const mobileCollection = new Api(`/datamobile`, {
  defaultValue: []
});
