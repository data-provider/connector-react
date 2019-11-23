import { Api } from "@data-provider/axios";

// AUTHORS COLLECTION

export const authorsCollection = new Api(`/authors`, {
  defaultValue: []
});

export const authorsBooksCollection = new Api(`/authorbooks`, {
  defaultValue: []
});
