import { connect } from "@data-provider/connector-react";

import { booksCollection } from "../../../data/books";

import { default as CreateBookComponent } from "../../../components/create-book";

export const mapDataSourceToProps = () => ({
  createBook: booksCollection.create
});

export const CreateBook = connect(mapDataSourceToProps)(CreateBookComponent);
