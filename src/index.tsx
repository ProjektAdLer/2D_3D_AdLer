import React from "react";
import ReactDOM from "react-dom";
import App from "./React/App";
import "reflect-metadata";
import ReactApi from "./React/API/ReactApi";
import ReactDIContainer from "./React/DependencyInjection/ReactDIContainer";
import IReactApi from "./React/API/IReactAPI";
import REACT_TYPES from "./React/DependencyInjection/ReactTypes";

const test = ReactDIContainer.get<IReactApi>(REACT_TYPES.IReactApi);
test.initReact();
