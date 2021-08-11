import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import createStore from "./data/redux/store"
import * as serviceWorker from "./serviceWorker"

import "./data/styles/index.scss"

import AppContainer from "./modules"

const store = createStore()

var x = document.createElement("DIV")
x.setAttribute("id", "ori-chatbot-root")
document.body.appendChild(x)

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById("ori-chatbot-root"))
serviceWorker.unregister()
