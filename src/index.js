import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import ReactGA from "react-ga4"

import createStore from "./data/redux/store"
import * as serviceWorker from "./serviceWorker"
import { ga4MeasurementId } from "./data/config/urls"
import { chatbot_setting } from "./data/config/brandSetup"
import { CHATBOT_TYPE } from "./data/config/constants"

import "./data/styles/index.scss"

import AppContainer from "./modules"

const store = createStore()

var x = document.createElement("DIV")
x.setAttribute("id", "ori-chatbot-root")
document.body.appendChild(x)

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById("ori-chatbot-root"))

export const BOT_LOAD_START_TIME = new Date().getTime()

if (chatbot_setting.ga4_enable) {
  ReactGA.initialize(ga4MeasurementId)
  ReactGA.send({
    hitType: 'event',
    eventCategory: 'InitialBotLoad',
    eventAction: 'Initial_Bot_Load_Start',
    eventLabel: 'Initial_Bot_Load_Start',
    eventValue: BOT_LOAD_START_TIME
  })
}

serviceWorker.unregister()
