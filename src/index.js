import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import ReactGA from "react-ga4"

import createStore from "./data/redux/store"
import * as serviceWorker from "./serviceWorker"
import { ga4MeasurementId } from "./data/config/urls"

import "./data/styles/index.scss"

import AppContainer from "./modules"
import { chatbot_setting } from "./data/config/brandSetup"

const store = createStore()

var x = document.createElement("DIV")
x.setAttribute("id", "ori-chatbot-root")
document.body.appendChild(x)

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById("ori-chatbot-root"))
if(chatbot_setting.chatbot_type === 'adster'){
    ReactGA.initialize(ga4MeasurementId)
}
serviceWorker.unregister()
