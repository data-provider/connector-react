[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url]

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![Greenkeeper badge](https://badges.greenkeeper.io/data-provider/connector-react.svg)](https://greenkeeper.io/) [![Last commit][last-commit-image]][last-commit-url] [![Last release][release-image]][release-url] 

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

## Overview

This package provides reactivity to [Data Provider][data-provider-url] using a React high order component. It also dispatchs automatically the read method of the Data Provider instances.

Connect the desired Data Providers with your components and this library will retrieve the data and re-render your components when corresponds.

## Install

```bash
npm i @data-provider/connector-react --save
```

## Examples

In the next example, the books will be retrieved automatically from server if they are not cached. The component will be rendered again if a new book is added to the collection by another component, or deleted, etc.

Components can be connected to [Data Providers or Selectors][data-provider-url]. The interface is the same in all cases.

### Use connect

```jsx
import React, { Component } from "react";
import { connect } from "@data-provider/connector-react";

import { booksCollection } from "data/books"; //booksCollection is a Data Provider

export class Books extends Component {
  render() {
    const books = this.props.books.value || [];
    const loading = this.props.books.loading;
    const error = this.props.books.error;

    if (error) {
      return <div>ERROR</div>;
    }

    if (loading) {
      return <div>LOADING...</div>;
    }

    return (
      <div>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export const mapDataProviderToProps = () => ({
  books: booksCollection.read
});

export const ConnectedBooks = connect(mapDataProviderToProps)(Books);

```

### Querying Data Providers using component "props"

In the next example, the component will render only books of author "cervantes", and will request them to the server using the correspondant query (if not cached previously):

```js
export const mapDataProviderToProps = props => ({
  books: booksCollection.ofAuthor(props.author).read
});

export const ConnectedModule = connect(mapDataProviderToProps)(Books);
```

### Connect component to many Data Providers

The connect function accepts connecting as many Data Providers as you want. Any change on any of the data providers will produce a new render of the component:

```js
export const mapDataProviderToProps = () => ({
  books: booksCollection.read,
  authors: authorsCollection.read
});

export const ConnectedModule = connect(mapDataProviderToProps)(Books);
```

### Connect component to specific properties of a Data Provider

You can use the property getters available in data provider instances to pass an specific property to components instead of the full object. This will improve and simplify the usage of props inside the component, because each component prop will be equivalent to an specific property:

```jsx
import { connect } from "@data-provider/connector-react";

export const BooksList = ({ books, booksLoading, booksError }) => {
  if(booksError) {
    return (<div>Error loading books</div>);
  }
  if(booksLoading) {
    return (<div>Loading books...</div>);
  }
  return (
    <div>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const mapDataProviderToProps = () => ({
  booksError: booksCollection.read.getters.error,
  books: booksCollection.read.getters.value,
  booksLoading: booksCollection.read.getters.loading
});

export const ConnectedModule = connect(mapDataProviderToProps)(BooksList);

```

### Pass any other type of properties using connect:

The connect function can pass any other types of properties to the Component, not only Data Provider instances:

```js
export const mapDataProviderToProps = props => ({
  createBook: booksCollection.create,
  books: booksCollection.read,
  authors: authorsCollection.read,
  myProperty: true,
  anotherProperty: 5,
  isLoadingAny: props.loading || props.anotherLoading || props.anotherOneLoading,
  callback: () => {
    console.log("Callback called");
  }
});

export const ConnectedModule = connect(mapDataProviderToProps)(Books);
```

### Using connect parser function to prepare data synchronously to component

In some scenarios, the component is not prepared to handle asynchronous data, and could fail rendering if, for example, the data provider value is not already fullfilled because it is loading. A Selector could be used to ensure data in component properties, but, for more specific behaviors related with loading or error properties, a parser function is available in the connector. This function, if defined, will be executed passing all component properties before rendering it, and the returned object will be applied as properties to the Component.

The parser function has to be defined as second argument of the connector:


```js
export const mapDataProviderToProps = () => ({
  books: booksCollection.read.getters.value,
  booksLoading: booksCollection.read.getters.loading,
  authorsLoading: authorsCollection.read.getters.loading
});

export const parseProps = props => ({
  ...props,
  loading: props.booksLoading || props.authorsLoading
});

export const ConnectedModule = connect(
  mapDataProviderToProps,
  parseProps
)(Books);
```

> This parser function should not be used as a replacement to Data Provider Selectors. As a good practice, the preference is to use Selectors if possible instead of this function.

## Prefetching data on server side rendering

Methods for prefetching data on server side rendering are available too. When data is prefetched in server side, the connect function will pass the `value` property calculated on server side to the components directly. It will not modify the `loading` property until the first load on client side is finished (At first client-side load, the resource will not be considered as `loading` to maintain the server-side value in the component until it finish loading).

> __It is important to define custom an unique "uuids" for your Data Provider instances when are going to be read on server side. Otherwise, the `readServerSide` method will trace a warning if detects duplicated "ids".__

### Server side data methods and components

* `readOnServerSide(provider)`
	* Alias - `addServerSideData`
	* Arguments
		* provider - `<Object> or <Array> of <Objects>` Data Provider instance or instances that should be read when `readServerSide` method is executed. Can be Data Provider origins or selectors of any type, queried or not.
* `readServerSide([providers])`
	* Alias - `readServerSideData`
	* Arguments
		* providers - `<Object> or <Array> of <Objects>` Data Provider instance or instances. Will be added to be read with the `readOnServerSide` method.
	* Returns
		* `<Object>` This method is asynchronous, and, when resolved, it returns an object containing all server side data ready to be set on the `<ServerSideData>` context component.
* `<ServerSideData data={data} clientSide={true}><App/></ServerSideData>` Component that sets the result of the `readServerSide` method in a context to make it available from all Data Provider connected children components.
	* Props
		* data - `<Object>` Object containing the result of the `readServerSide` method.
		* clientSide - `<Boolean>` If false, the connect method will not dispatch automatically the read method of the providers marked as "server-side", so, for example, api requests will not be repeated on client side, and data retrieved in server side will be always passed to connected components.

### Example of server side prefecth implementation in a Next.js project:

In the next example, the data of the "myDataProvider" Data Provider instance will be fetched on server side and request will not be repeated on client side. The component will be rendered directly with server side data, and no loading state will be set:

```jsx
// src/home.js
import { readOnServerSide, connect } from "@data-provider/connector-react";
import { myDataProvider } from "src/data";

readOnServerSide(myDataProvider); // provider is marked to be read when readServerSide method is executed.

export const HomeComponent = ({data}) => {
  if(data.loading) {
    return <div>Loading...</div>
  }
  return <div>{data.value}</div>
};

export const mapDataProviderToProps = () => ({
  data: myDataProvider.read
});

export const Home = connect(mapDataProviderToProps)(HomeComponent)

```

```jsx
// pages/index.js
import { readServerSide, ServerSideData } from "@data-provider/connector-react";
import { Home } from "src/home";

const Page = ({ serverSideData }) => (
  <ServerSideData data={serverSideData} clientSide={false} >
    <Home/>
  </ServerSideData>
);

Page.getInitialProps = async () => {
  return {
    serverSideData: await readServerSide()
  }
}

export default Page;
```

## Demo

To run a real implementation example in a React app, you can clone the project and execute the provided demo:

```bash
git clone git@github.com:data-provider/connector-react.git
cd connector-react
npm i
npm run build
cd demo
npm i
```

Now, start mocks server:
```bash
npm run mocks
```

And start the demo app in another shell while mocks are running:
```bash
npm start
```

## Contributing

Contributors are welcome.
Please read the [contributing guidelines](.github/CONTRIBUTING.md) and [code of conduct](.github/CODE_OF_CONDUCT.md).

[data-provider-url]: https://github.com/data-provider/core

[coveralls-image]: https://coveralls.io/repos/github/data-provider/connector-react/badge.svg
[coveralls-url]: https://coveralls.io/github/data-provider/connector-react
[travisci-image]: https://travis-ci.com/data-provider/connector-react.svg?branch=master
[travisci-url]: https://travis-ci.com/data-provider/connector-react
[last-commit-image]: https://img.shields.io/github/last-commit/data-provider/connector-react.svg
[last-commit-url]: https://github.com/data-provider/connector-react/commits
[license-image]: https://img.shields.io/npm/l/@data-provider/connector-react.svg
[license-url]: https://github.com/data-provider/connector-react/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/@data-provider/connector-react.svg
[npm-downloads-url]: https://www.npmjs.com/package/@data-provider/connector-react
[npm-dependencies-image]: https://img.shields.io/david/data-provider/connector-react.svg
[npm-dependencies-url]: https://david-dm.org/data-provider/connector-react
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=data-provider-connector-react&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=data-provider-connector-react
[release-image]: https://img.shields.io/github/release-date/data-provider/connector-react.svg
[release-url]: https://github.com/data-provider/connector-react/releases
