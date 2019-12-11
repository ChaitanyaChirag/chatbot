import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { init } from '@sentry/browser';

import createStore from './data/redux/store';
import * as serviceWorker from './serviceWorker';

import { chatbot_client_info } from './data/config/urls';

import './data/styles/index.scss';

import AppContainer from './modules';

init({ dsn: chatbot_client_info.sentry_dsn });

const store = createStore();

var x = document.createElement("DIV");
x.setAttribute("id", "ori-chatbot-root");
document.body.appendChild(x);

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, document.getElementById('ori-chatbot-root'));
serviceWorker.unregister();
