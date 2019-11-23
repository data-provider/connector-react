import { Api } from "@data-provider/axios";

// BOOKS COLLECTION

export const booksCollection = new Api(`/books`, {
  defaultValue: []
});

export const titleContainingFilter = titlePortion => {
  if (titlePortion && titlePortion.length) {
    return {
      queryString: {
        title_containing: titlePortion
      }
    };
  }
};

booksCollection.addCustomQuery({
  titleContaining: titleContainingFilter
});
