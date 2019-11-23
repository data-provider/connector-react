import { Api } from "@data-provider/axios";

// COLLECTION pointing to a nonexistent endpoint

export const errorBooksCollection = new Api(`/foo-books`, {
  defaultValue: []
});
