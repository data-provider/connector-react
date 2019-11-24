/*
Copyright 2019 Javier Brea
Copyright 2019 XbyOrange

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { isEqual } from "lodash";
import { ServerSideDataContext } from "./ServerSideDataContext";
import { error } from "./utils";

const READ_METHOD = "read";

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name;
};

export const connect = (mapProvidersToProps, parseProps) => {
  return WrappedComponent => {
    class DataProviderConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this._unmounted = false;
        this.providerPropsListeners = {};
        this.providerPropsReaders = {};
        this.providerPropsKeys = [];
        this.providerPropsGetters = {};
        this.providerPropsIds = {};
        this.providerPropsLoaded = {};
        this.getProvidersProps();
        this.state = {
          providerProps: this.getProvidersPropsValues()
        };
      }

      componentDidMount() {
        this.resetProviders();
      }

      componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
          this.resetProviders();
        }
      }

      componentWillUnmount() {
        this._unmounted = true;
        this.removeProviderListeners();
      }

      resetProviders() {
        this.removeProviderListeners();
        this.getProvidersProps();
        this.updateState();
        this.addProviderListeners();
        this.dispatchAllReads();
      }

      cleanProviderProps(providerProps, propName) {
        const dispatch = data =>
          providerProps.dispatch(data).catch(error => {
            this.logError(providerProps._instance._id, error.message);
          });
        if (!propName) {
          return {
            dispatch,
            error: providerProps.error,
            loading: providerProps.loading,
            value: providerProps.value
          };
        }
        return providerProps[propName];
      }

      isDataProvider(prop) {
        return prop && prop._isDataProviderMethod;
      }

      getProvidersProps() {
        this.providerProps = mapProvidersToProps(this.props);
        this.providerPropsKeys = Object.keys(this.providerProps);

        // Define getters
        this.providerPropsKeys.forEach(key => {
          if (this.providerProps[key] && this.providerProps[key].isGetter) {
            this.providerPropsGetters[key] = this.providerProps[key].prop;
            this.providerProps[key] = this.providerProps[key]._method;
          }
          if (this.isDataProvider(this.providerProps[key])) {
            this.providerPropsIds[key] = this.providerProps[key]._instance._id;
          }
        });
      }

      getProvidersPropsValues() {
        const providerProps = {};
        this.providerPropsKeys.forEach(key => {
          if (
            this.context &&
            this.context.data &&
            this.context.data[this.providerPropsIds[key]] &&
            !this.providerPropsLoaded[key]
          ) {
            providerProps[key] = this.cleanProviderProps(
              {
                loading: false,
                error: null,
                value: this.context.data[this.providerPropsIds[key]]
              },
              this.providerPropsGetters[key]
            );
          } else {
            providerProps[key] = this.isDataProvider(this.providerProps[key])
              ? this.cleanProviderProps(this.providerProps[key], this.providerPropsGetters[key])
              : this.providerProps[key];
          }
        });
        return providerProps;
      }

      updateState() {
        if (!this._unmounted) {
          this.setState({
            providerProps: this.getProvidersPropsValues()
          });
        }
      }

      logError(id, message) {
        error(`Error "${message}" in instance "${id}"`);
      }

      markProviderAsLoaded(key) {
        // TODO, remove this when Data Provider provides info about if instance has been loaded.
        this.providerPropsLoaded[key] = true;
        this.updateState();
      }

      dispatchRead(instance, key) {
        if (
          this.context &&
          (this.context.clientSide ||
            !this.context.data ||
            !this.context.data[this.providerPropsIds[key]])
        ) {
          return instance
            .dispatch()
            .catch(error => {
              this.logError(this.providerProps[key]._instance._id, error.message);
              this.markProviderAsLoaded(key);
            })
            .then(() => {
              this.markProviderAsLoaded(key);
            });
        }
      }

      dispatchAllReads() {
        this.providerPropsKeys.forEach(key => {
          if (this.providerProps[key] && this.providerProps[key]._methodName === READ_METHOD) {
            this.dispatchRead(this.providerProps[key], key);
          }
        });
      }

      addProviderListeners() {
        this.providerPropsKeys.forEach(key => {
          if (this.isDataProvider(this.providerProps[key])) {
            this.providerPropsReaders[key] = () => {
              if (this.providerProps[key]._methodName === READ_METHOD) {
                // TODO, why here instance is accessed through "_instance.read" and in dispatchAllRead is done through the main object?
                this.dispatchRead(this.providerProps[key]._instance.read, key);
              }
            };

            this.providerPropsListeners[key] = methodName => {
              if (methodName === this.providerProps[key]._methodName) {
                this.updateState();
              }
            };

            this.providerProps[key]._instance.onClean(this.providerPropsReaders[key]);

            this.providerProps[key]._instance.onChange(this.providerPropsListeners[key]);
          }
        });
      }

      removeProviderListeners() {
        this.providerPropsKeys.forEach(key => {
          if (this.isDataProvider(this.providerProps[key])) {
            this.providerProps[key]._instance.removeCleanListener(this.providerPropsReaders[key]);
            this.providerProps[key]._instance.removeChangeListener(
              this.providerPropsListeners[key]
            );
          }
        });
      }

      render() {
        let props = {
          ...this.props,
          ...this.state.providerProps
        };
        if (parseProps) {
          props = parseProps(props);
        }

        return <WrappedComponent {...props} />;
      }
    }

    DataProviderConnectedComponent.contextType = ServerSideDataContext;

    DataProviderConnectedComponent.displayName = `DataProviderConnectedComponent(${getDisplayName(
      WrappedComponent
    )})`;

    hoistNonReactStatics(DataProviderConnectedComponent, WrappedComponent);

    return DataProviderConnectedComponent;
  };
};
