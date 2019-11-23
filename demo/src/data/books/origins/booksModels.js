import { Api } from "@data-provider/axios";

// BOOKS MODEL

export const booksModels = new Api(`/books/:id`);

booksModels.addCustomQuery({
  byId: id => ({
    urlParams: {
      id
    }
  })
});
