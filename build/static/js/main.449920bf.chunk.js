(this.webpackJsonpchatbot=this.webpackJsonpchatbot||[]).push([[2],{14:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return c}));var a=n(2),o=n(4),i=function(){return"".concat("https://dishtv-testing-backend.oriserve.in","/liveConversations?psid=").concat(Object(a.p)(),"&ver=").concat(1.1,"&role=user&brandName=").concat("dishtv","&botName=").concat("dishtv","&channelName=").concat(Object(a.o)())},r={sentry_dsn:"https://fa80a3e669cc4ee78bcb94c405adecba@sentry.io/1512125",icon_url:"https://d113ddgi4j6d7k.cloudfront.net/dashboard/ava.png",brand_name:"Vodafone",sender_id:"dish_chat_client",trigger:{visibility:!1,icon_url:"https://d113ddgi4j6d7k.cloudfront.net/dashboard/ava.png",icon_height:90,mobile_icon_width:80,animation_duration:2e3,lottie_visibility:!0,lottie_path:"https://d113ddgi4j6d7k.cloudfront.net/dashboard/cue.json",lottie_icon_height:70,lottie_icon_width:70,show_close_icon:!0}},s={automate_connection_time:3600,automate_reset_chat_time:345600,powered_by:{visibility:!0,target_url:"http://oriserve.com/",icon_url:"https://d113ddgi4j6d7k.cloudfront.net/ori_logo.png"},notification_bot:{visibility:!0,stack_view:!1},chat_interface:{show_bg_image:!0,bg_image_url:"https://d113ddgi4j6d7k.cloudfront.net/dashboard/chat_interface.jpg"},adster_bot:{query_param_key:"ischatbotopen",visibility:!0},auto_emit_response:{enable:!0,payload:{type:o.h.TEXT,text:"first emit message"}}},c={common:{socket_connection_lost:"connection has been lost"},feedback:{greeting:"How happy are you with our support ?",low_rated:"Please tell us what went wrong.",high_rated:"Please suggest how can we make your next visit awesome.",success:"Thank you for giving us feedback",failed:"Some error occured please try again later"}}},2:function(e,t,n){"use strict";n.d(t,"v",(function(){return l})),n.d(t,"r",(function(){return u})),n.d(t,"u",(function(){return _})),n.d(t,"d",(function(){return p})),n.d(t,"e",(function(){return E})),n.d(t,"h",(function(){return S})),n.d(t,"b",(function(){return g})),n.d(t,"o",(function(){return f})),n.d(t,"q",(function(){return h})),n.d(t,"p",(function(){return T})),n.d(t,"a",(function(){return b})),n.d(t,"i",(function(){return O})),n.d(t,"t",(function(){return m})),n.d(t,"j",(function(){return y})),n.d(t,"l",(function(){return v})),n.d(t,"n",(function(){return A})),n.d(t,"m",(function(){return N})),n.d(t,"k",(function(){return D})),n.d(t,"f",(function(){return C})),n.d(t,"g",(function(){return I})),n.d(t,"s",(function(){return k})),n.d(t,"c",(function(){return P}));var a=n(44),o=n(213),i=n.n(o),r=n(4);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var c=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},d=!0,l=function(){var e=(new Date).getTime();return"".concat(e,"_").concat(c()+c()+c()+c())},u=function(e,t){d&&(t?console.log(e,t):console.log(e))},_=function(e,t){var n=document.getElementById("chatbotContentContainer");n&&(i.a.config({top:75,getContainer:function(){return n}}),i.a[e](t))},p=function(e){return/\.(gif|jpg?g|tiff|png)$/i.test(e)},E=function(e){return new Promise((function(t){var n=new FileReader;n.onload=function(e){t(e.target.result)},n.readAsDataURL(e)}))},S=function(e){var t=document.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return t?t[2]:null},g={ANDROID:"android",WEBSITE:"website"},f=function(){return window.ori_platform&&void 0!==window.ori_platform&&window.ori_platform.toLowerCase()===g.ANDROID?g.ANDROID:g.WEBSITE},h=function(){var e=f();return e&&e.toLowerCase()===g.ANDROID},T=function(){var e=null;return localStorage.getItem("psid")?e=localStorage.getItem("psid"):(e=l(),localStorage.setItem("psid",e)),e},b={MESSAGES:T,UNSEEN_MESSAGES:"unseen_messages",NOTIFICATION_COUNT:"notification_count",LAST_EMIT:"last_emit",PSID:"psid",IS_CHAT_OPEN:"is_chat_open",ANDROID:"android",APP_PARAMS:"app_params",END_CHAT:"end_chat"},O=function(e,t){var n=localStorage.getItem(e);return n&&void 0!==n?JSON.parse(n):t},m=function(e,t){var n=JSON.stringify(t);localStorage.setItem(e,n)},y=function(){return h()?r.i:r.j},v=function(){return localStorage.getItem(b.MESSAGES())?JSON.parse(localStorage.getItem(b.MESSAGES())):y()},A=function(){return localStorage.getItem(b.UNSEEN_MESSAGES)?JSON.parse(localStorage.getItem(b.UNSEEN_MESSAGES)):[]},N=function(){return localStorage.getItem(b.NOTIFICATION_COUNT)?JSON.parse(localStorage.getItem(b.NOTIFICATION_COUNT)):0},D=function(){return!!localStorage.getItem(b.IS_CHAT_OPEN)&&JSON.parse(localStorage.getItem(b.IS_CHAT_OPEN))},C=function(e,t){return new Date(e).toLocaleDateString("en-In",t)},I=function(e,t){return new Date(e).toLocaleTimeString("en-In",t)},k=function(e){e&&(e.scrollTop=e.scrollHeight)},P={screen_data:function(){return{screen_width:window.innerWidth,screen_height:window.innerHeight,screen_orientation:this.screen_orientation(),screen_type:this.screen_type()}},screen_orientation:function(){return window.matchMedia("(orientation:landscape)").matches?"landscape":"portrait"},screen_type:function(){return window.innerWidth<=480?"xs":window.innerWidth<=768?"sm":window.innerWidth<=992?"md":window.innerWidth<=1200?"lg":window.innerWidth<=1600?"hd":window.innerWidth<=2560?"fhd":"uhd"},deviceStatus:function(){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(n,!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},this.screen_data())}}},352:function(e,t,n){e.exports=n(732)},4:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return o})),n.d(t,"h",(function(){return i})),n.d(t,"g",(function(){return r})),n.d(t,"e",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return d})),n.d(t,"f",(function(){return l})),n.d(t,"j",(function(){return u})),n.d(t,"i",(function(){return _}));var a={ERROR:"error"},o={CONNECT:"connect",DISCONNECT:"disconnect",CONNECT_ERROR:"connect_error",ERROR:"error",RESPONSE:"response",NEW_MESSAGE:"new_message",RESET_CHAT:"reset_chat",SHOW_TYPING:"show_typing",BOT_AUTO_POPUP_REQUEST:"botAutoPopupRequest",RECORD_FEEDBACK:"recordFeedback",GET_WEBSITE_DATA:"getWebsiteData",WEBSITE_DATA:"websiteData",CHATLOG_FEEDBACK:"chatlogFeedback",TYPING_STATUS:"typingStatus",UPDATE_MESSAGE:"updateMessage",UPDATE_ADMIN_MESSAGE:"updateAdminMessage",MESSAGE_SEEN:"messageSeen",END_CONVERSATION:"end_conversation",END_CONVERSATION_FORM_SUBMIT:"end_conversation_form_submit",DOWN_TIME:"downTime"},i={TEXT:"text",LIST:"list",TEXT_WITH_BUTTONS:"text_with_buttons",IMAGE_WITH_BUTTONS:"image_with_buttons",CHECKBOX_WITH_MEDIA:"checkbox_with_media",VIDEO:"video",TIMER:"timer",CAROUSEL:"carousel",CUSTOM_MSG:"customMsg",NOTIFICATION:"notification",UPLOAD_FILE:"uploadFile",FILE:"file",SYSTEM_TEXT:"systemText"},r={DISH_RECHARGE:"dishRecharge",DISH_RECHARGE_DETAILS:"dishRechargeDetails",DISH_OFFERS:"dishOffers",DISH_RECHARGE_HISTORY:"dishRechargeHistory"},s={SENDING:"sending",SENT:"sent",DELIVERED:"delivered",SEEN:"seen",FAILED:"failed"},c={LINK:"link",DEFAULT:"default",CUSTOM:"custom",CUSTOM_SOCKET_EVENT:"customSocketEvent",POST_BACK_RESPONSE:"postbackRes"},d={DISH_OFFERS:"dishOffers",CHECKBOX_SUBMIT:"checkboxSubmit"},l={SYSTEM:"system",CUSTOMER:"customer",ADMIN:"admin",CHATBOT:"chatbot"},u=[{sender:l.CHATBOT,type:i.TEXT,inputLock:!1,quickReply:[],skipLS:!1,send_variable_to_apiai:!1,sendVariableToLS:!1,variable_name:"",delay:0,payload:{text:"Hi, I'm ADI, Your Personal DishTV Assistant."},timestamp:new Date},{sender:l.CHATBOT,inputLock:!1,skipLS:!1,send_variable_to_apiai:!1,sendVariableToLS:!1,variable_name:"",quickReplies:[],type:i.TEXT_WITH_BUTTONS,delay:0,payload:{title:"",subtitle:"What can I help you with today?",buttons:[{type:c.DEFAULT,text:"Recharge My Dish TV",url:""},{type:c.DEFAULT,text:"Recharge Offers",url:""},{type:c.DEFAULT,text:"Current Balance",url:""},{type:c.DEFAULT,text:"Other Queries",url:""}]},timestamp:new Date}],_=[{sender:l.CHATBOT,type:i.TEXT,inputLock:!1,quickReply:[],skipLS:!1,send_variable_to_apiai:!1,sendVariableToLS:!1,variable_name:"",delay:0,payload:{text:"Hi, I'm ADI, Your Personal DishTV Assistant."},timestamp:new Date},{sender:l.CHATBOT,inputLock:!1,skipLS:!1,send_variable_to_apiai:!1,sendVariableToLS:!1,variable_name:"",quickReplies:[],type:i.TEXT_WITH_BUTTONS,delay:0,payload:{title:"",subtitle:"What can I help you with today?",buttons:[{type:c.DEFAULT,text:"My DishTV is not working",url:""},{type:c.DEFAULT,text:"Recharge Offers",url:""},{type:c.DEFAULT,text:"Current Balance",url:""},{type:c.DEFAULT,text:"Package details",url:""},{type:c.DEFAULT,text:"Other Queries",url:""}]},timestamp:new Date}]},591:function(e,t){},698:function(e,t,n){},725:function(e,t,n){},731:function(e,t,n){},732:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"updateState",(function(){return T})),n.d(a,"updateEndChat",(function(){return b})),n.d(a,"makeSocketConnection",(function(){return O})),n.d(a,"socketDisconnect",(function(){return m})),n.d(a,"handleBotPopupRequest",(function(){return y})),n.d(a,"emitCustomEvent",(function(){return v})),n.d(a,"emitNewMessageToServer",(function(){return A})),n.d(a,"pushSenderMessage",(function(){return N})),n.d(a,"onMessageVoting",(function(){return D})),n.d(a,"resetChat",(function(){return C})),n.d(a,"sendFeedback",(function(){return I})),n.d(a,"handleChatbotInterface",(function(){return k})),n.d(a,"setDefaultState",(function(){return P})),n.d(a,"updateFileUploadMessage",(function(){return w}));var o={};n.r(o),n.d(o,"setDeviceData",(function(){return de})),n.d(o,"enableAdsterBot",(function(){return le}));n(353),n(362);var i=n(1),r=n.n(i),s=n(52),c=n.n(s),d=n(146),l=n(738),u=n(50),_=n(44),p=n(330),E=n.n(p),S=n(4),g=n(14),f=n(2),h={DEVICE_DATA_LOADED:"DEVICE_DATA_LOADED",ENABLE_ADSTER_BOT:"ENABLE_ADSTER_BOT",UPDATE_STATE:"UPDATE_STATE",UPDATE_END_CHAT:"UPDATE_END_CHAT",MAKE_SOCKET_CONNECTION:"MAKE_SOCKET_CONNECTION",SOCKET_DISCONNECT:"SOCKET_DISCONNECT",BOT_POPUP_REQUEST:"BOT_POPUP_REQUEST",EMIT_NEW_MESSAGE:"EMIT_NEW_MESSAGE",EMIT_CUSTOM_EVENT:"EMIT_CUSTOM_EVENT",MESSAGE_VOTING:"MESSAGE_VOTING",RESET_CHAT:"RESET_CHAT",SEND_FEEDBACK:"SEND_FEEDBACK",UPDATE_TYPING_INFO:"UPDATE_TYPING_INFO",UPDATE_MESSAGE:"UPDATE_MESSAGE",MESSAGE_SEEN:"MESSAGE_SEEN",UPDATE_PSID:"UPDATE_PSID",HANDLE_CHATBOT_INTERFACE:"HANDLE_CHATBOT_INTERFACE",SOCKET_CONNECTED:"SOCKET_CONNECTED",SOCKET_CONNECT_ERROR:"SOCKET_CONNECT_ERROR",SOCKET_ERROR:"SOCKET_ERROR",PUSH_RESPONSE_MESSAGE:"PUSH_RESPONSE_MESSAGE",PUSH_SENDER_MESSAGE:"PUSH_SENDER_MESSAGE",SET_DEFAULT_STATE:"SET_DEFAULT_STATE",SHOW_TYPING:"SHOW_TYPING",CLEAR_UNSEEN_MESSAGES:"CLEAR_UNSEEN_MESSAGES",GET_WEBSITE_DATA:"GET_WEBSITE_DATA",UPDATE_FILE_UPLOAD_MESSAGE:"UPDATE_FILE_UPLOAD_MESSAGE"},T=function(e,t){return{type:h.UPDATE_STATE,payload:t,key:e}},b=function(e){return{type:h.UPDATE_END_CHAT,payload:e}},O=function(){return{type:h.MAKE_SOCKET_CONNECTION}},m=function(){return{type:h.SOCKET_DISCONNECT}},y=function(e){return{type:h.BOT_POPUP_REQUEST,payload:e}},v=function(e,t,n){return{type:h.EMIT_CUSTOM_EVENT,payload:t,event:e,callback:n}},A=function(e){return{type:h.EMIT_NEW_MESSAGE,payload:e}},N=function(e){return{type:h.PUSH_SENDER_MESSAGE,payload:{message:e}}},D=function(e){return{type:h.MESSAGE_VOTING,payload:e}},C=function(e,t){return{type:h.RESET_CHAT,payload:e,callback:t}},I=function(e,t){return{type:h.SEND_FEEDBACK,payload:e,callback:t}},k=function(e){return{type:h.HANDLE_CHATBOT_INTERFACE,payload:e}},P=function(){var e={messages:Object(f.l)()};return{type:h.SET_DEFAULT_STATE,payload:e}},w=function(e){return{type:h.UPDATE_FILE_UPLOAD_MESSAGE,payload:e}};function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var R=function(e,t){t.on(S.d.CONNECT,(function(){Object(f.r)("socket connected",t);var n=e.getState().chat_details;e.dispatch(T("is_socket_connected",t.connected));var a=Object(f.j)();if(g.b.auto_emit_response.enable&&n.messages.length===a.length){var o=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(n,!0).forEach((function(t){Object(_.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},g.b.auto_emit_response.payload,{session_id:t.io.engine.id,current_session_id:t.io.engine.id,sender_id:g.a.sender_id,navigator_userAgent:navigator.userAgent,navigator_platform:navigator.platform,variable_name:n.variable_name,send_variable_to_apiai:n.send_variable_to_apiai,sendVariableToLS:n.sendVariableToLS,skipLS:n.skipLS});console.log("first emit data",o),t.emit(S.d.NEW_MESSAGE,o)}if(n.psid){var i={clientPsid:n.psid,senderPsid:n.psid};e.dispatch(v(S.d.MESSAGE_SEEN,i))}})),t.on(S.d.CONNECT_ERROR,(function(n){Object(f.r)("socket connect error",n),e.dispatch(T("is_socket_connected",t.connected))})),t.on(S.d.ERROR,(function(n){Object(f.r)(" socket error",n),e.dispatch(T("is_socket_connected",t.connected))})),t.on(S.d.DISCONNECT,(function(n){"io server disconnect"===n&&t.connect(),e.dispatch(T("is_socket_connected",t.connected))})),t.on(S.d.DOWN_TIME,(function(t){Object(f.r)("downtime res",t),t.downTime&&(e.dispatch(T("downtime",t.downTime)),t.downTime.isDownTime&&e.dispatch(m()))})),t.on(S.d.RESPONSE,(function(n){Object(f.r)("response",n);var a=e.getState().chat_details;if(n&&n.psid&&n.psid===a.psid){var o={message:n.result&&n.result.bot_messages&&n.result.bot_messages.length>0?n.result.bot_messages[0]:null};if(o.message){if(o.message.cmid=Object(f.v)(),n.chatlogId){var i={readStatus:S.e.DELIVERED,clientPsid:a.psid,senderPsid:a.psid,chatlogId:n.chatlogId};t.emit(S.d.UPDATE_ADMIN_MESSAGE,i,(function(e){if(!e&&"visible"===document.visibilityState&&a.is_chat_open){var n={clientPsid:a.psid,senderPsid:a.psid};t.emit(S.d.MESSAGE_SEEN,n)}}))}e.dispatch({type:h.PUSH_RESPONSE_MESSAGE,payload:o})}else Object(f.r)("response data format is not correct",n)}})),t.on(S.d.GET_WEBSITE_DATA,(function(n){var a=e.getState().chat_details;if(n&&n.length>0){var o={};n.forEach((function(e){"cookie"===e.source?o[e.newKey]=Object(f.h)(e.key):"localstorage"===e.source&&(o[e.newKey]=localStorage.getItem(e.key))})),t.emit(S.d.WEBSITE_DATA,{websiteData:o,psid:a.psid})}})),t.on(S.d.TYPING_STATUS,(function(t){var n=e.getState().chat_details;t&&t.typingInfo&&t.typingInfo.senderPsid!==n.psid&&e.dispatch({type:h.UPDATE_TYPING_INFO,payload:t.typingInfo})})),t.on(S.d.UPDATE_MESSAGE,(function(t){var n=e.getState().chat_details;t&&t.updateChatlogId&&t.updateChatlogId.changedValue&&t.updateChatlogId.psid&&t.updateChatlogId.psid===n.psid?e.dispatch({type:h.UPDATE_MESSAGE,payload:t.updateChatlogId,key:"cmid"}):t&&t.updatedCustomerMessage&&t.updatedCustomerMessage.changedValue&&t.updatedCustomerMessage.clientPsid===n.psid?e.dispatch({type:h.UPDATE_MESSAGE,payload:t.updatedCustomerMessage,key:"chatlogId"}):t&&t.messageSeen&&t.messageSeen.clientPsid===n.psid&&t.messageSeen.senderPsid!==n.psid&&e.dispatch({type:h.MESSAGE_SEEN})})),t.on(S.d.END_CONVERSATION,(function(t){Object(f.r)("end conversation listener",t);var n=e.getState().chat_details;t.psid===n.psid&&e.dispatch({type:h.UPDATE_END_CHAT,payload:{visible:!0,show_resolved_card:!0}})}))},j=function(){var e=null;return function(t){return function(n){return function(a){switch(a.type){case h.MAKE_SOCKET_CONNECTION:null!==e&&e.close();var o=Object(g.d)();e=E()(o),R(t,e);break;case h.EMIT_CUSTOM_EVENT:e&&a.event&&(Object(f.r)("emit custom event",a.payload),a.callback?e.emit(a.event,a.payload,a.callback):e.emit(a.event,a.payload));break;case h.EMIT_NEW_MESSAGE:e&&(a.payload.session_id=e.io.engine.id,a.payload.current_session_id=e.io.engine.id,e.emit(S.d.NEW_MESSAGE,a.payload,(function(e,n){if(e){Object(f.r)("emit new message event error",e);var o={cmid:a.payload.cmid,changedValue:{readStatus:S.e.FAILED}};t.dispatch({type:h.UPDATE_MESSAGE,payload:o,key:"cmid"})}else!e&&n&&n.data&&n.data.cmid&&n.data.changedValue&&t.dispatch({type:h.UPDATE_MESSAGE,payload:n.data,key:"cmid"})})));break;case h.BOT_POPUP_REQUEST:e&&e.emit(S.d.BOT_AUTO_POPUP_REQUEST,a.payload,(function(e,n){if(!e&&n&&n.data&&n.data.displayMessage){Object(f.r)("bot auto popup request response",n);var a=n.data.displayMessage;t.dispatch({type:h.PUSH_SENDER_MESSAGE,payload:{message:a}})}else Object(f.r)("bot auto popup request error",e)}));break;case h.MESSAGE_VOTING:e&&e.emit(S.d.CHATLOG_FEEDBACK,a.payload,(function(e){if(Object(f.r)("chatlog feedback res",e),!e.error&&e.data&&e.data.chatlogId&&e.data.voteType){var n={chatlogId:e.data.chatlogId,changedValue:{voteType:e.data.voteType}};t.dispatch({type:h.UPDATE_MESSAGE,key:"chatlogId",payload:n})}else Object(f.r)("chatlog feedback event request error")}));break;case h.RESET_CHAT:e&&e.emit(S.d.RESET_CHAT,a.payload,(function(e){Object(f.r)("chatlog feedback res",e),e.ok?a.callback():e.error&&Object(f.r)("reset chat event error")}));break;case h.SEND_FEEDBACK:e&&e.emit(S.d.RECORD_FEEDBACK,a.payload,(function(e,t){a.callback&&a.callback(e)}));break;case h.SOCKET_DISCONNECT:null!==e&&(Object(f.r)("socket disconnected",e),e.close()),e=null;break;default:return n(a)}}}}}(),U=n(24),L=n(214),G=n.n(L),B=Object(f.p)(),H=Object(f.l)(),x=Object(f.n)(),F=Object(f.k)(),V=Object(f.m)(),W={chat_details:{is_socket_connected:!1,is_internet_connected:!1,messages:Object(f.q)()?Object(f.j)():H,psid:B,unseen_messages:x,notification_count:V,is_chat_open:F,downtime:{},is_typing:!1,typing_text:"",quick_replies:H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].quickReplies?H[H.length-1].quickReplies:[],is_input_lock:!!(H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].inputLock)&&H[H.length-1].inputLock,input_lock_text:H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].inputLockMessage?H[H.length-1].inputLockMessage:"please select any option to proceed",skipLS:!!(H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].skipLS)&&H[H.length-1].skipLS,send_variable_to_apiai:!!(H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].send_variable_to_apiai)&&H[H.length-1].send_variable_to_apiai,sendVariableToLS:!!(H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].sendVariableToLS)&&H[H.length-1].sendVariableToLS,variable_name:H&&H.length>0&&H[H.length-1].sender===S.f.SERVER&&H[H.length-1].variable_name?H[H.length-1].variable_name:"",end_chat:Object(f.i)(f.a.END_CHAT,{visible:!1,show_confirmation_card:!1,show_resolved_card:!1,show_form_card:!1,form:[],description:null})}};function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(n,!0).forEach((function(t){Object(_.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W.chat_details,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h.UPDATE_STATE:return q({},e,Object(_.a)({},t.key,t.payload));case h.UPDATE_END_CHAT:var n=q({},e.end_chat,{},t.payload);return Object(f.t)(f.a.END_CHAT,n),q({},e,{end_chat:n});case h.HANDLE_CHATBOT_INTERFACE:return localStorage.setItem(f.a.IS_CHAT_OPEN,JSON.stringify(t.payload)),localStorage.removeItem(f.a.UNSEEN_MESSAGES),localStorage.removeItem(f.a.NOTIFICATION_COUNT),q({},e,{is_chat_open:t.payload,notification_count:t.payload?0:e.notification_count,unseen_messages:[]});case h.PUSH_SENDER_MESSAGE:localStorage.setItem(f.a.MESSAGES(),JSON.stringify([].concat(Object(U.a)(e.messages),[t.payload.message])));var a=Object(U.a)(e.unseen_messages),o=e.notification_count;return e.is_chat_open||(a=[].concat(Object(U.a)(e.unseen_messages),[t.payload.message]),o=0,localStorage.setItem(f.a.UNSEEN_MESSAGES,JSON.stringify(a)),localStorage.setItem(f.a.NOTIFICATION_COUNT,JSON.stringify(o))),q({},e,{unseen_messages:a,notification_count:o,messages:[].concat(Object(U.a)(e.messages),[t.payload.message]),skipLS:!1,send_variable_to_apiai:!1,sendVariableToLS:!1,variable_name:"",quick_replies:[],is_input_lock:!1});case h.PUSH_RESPONSE_MESSAGE:localStorage.setItem(f.a.MESSAGES(),JSON.stringify([].concat(Object(U.a)(e.messages),[t.payload.message])));var i=e.notification_count,r=Object(U.a)(e.unseen_messages);return e.is_chat_open||(i++,r=[].concat(Object(U.a)(e.unseen_messages),[t.payload.message]),localStorage.setItem(f.a.UNSEEN_MESSAGES,JSON.stringify(r)),localStorage.setItem(f.a.NOTIFICATION_COUNT,JSON.stringify(i))),q({},e,{notification_count:i,unseen_messages:r,messages:[].concat(Object(U.a)(e.messages),[t.payload.message]),quick_replies:t.payload.message.quickReplies?t.payload.message.quickReplies:[],is_input_lock:!!t.payload.message.inputLock&&t.payload.message.inputLock,input_lock_text:t.payload.message.inputLockMessage?t.payload.message.inputLockMessage:"please select any option to proceed",skipLS:t.payload.message.skipLS,sendVariableToLS:t.payload.message.sendVariableToLS,send_variable_to_apiai:t.payload.message.send_variable_to_apiai,variable_name:t.payload.message.variable_name});case h.SET_DEFAULT_STATE:var s=t.payload.messages.length,c=t.payload.messages;return q({},e,{messages:c,skipLS:!!(c&&s>0&&c[s-1].skipLS)&&c[s-1].skipLS,send_variable_to_apiai:!!(c&&s>0&&c[s-1].send_variable_to_apiai)&&c[s-1].send_variable_to_apiai,sendVariableToLS:!!(c&&s>0&&c[s-1].sendVariableToLS)&&c[s-1].sendVariableToLS,variable_name:c&&s>0&&c[s-1].variable_name?c[s-1].variable_name:"",quick_replies:c&&s>0&&c[s-1].quickReplies?c[s-1].quickReplies:[],is_input_lock:!!(c&&s>0&&c[s-1].inputLock)&&c[s-1].inputLock,input_lock_text:c&&s>0&&c[s-1].inputLockMessage?c[s-1].inputLockMessage:"please select any option to proceed",is_typing:!1,typing_text:""});case h.UPDATE_TYPING_INFO:return q({},e,{is_typing:t.payload.isTyping,typing_text:t.payload.typingMessage?t.payload.typingMessage:""});case h.UPDATE_FILE_UPLOAD_MESSAGE:var d=Object(U.a)(e.messages),l=-1;return-1!==(l=G()(d,(function(e){return e.chatlogId===t.payload.message.chatlogId})))&&(d=[].concat(Object(U.a)(d.slice(0,l)),[q({},d[l],{payload:q({},d[l].payload,{},t.payload.data)})],Object(U.a)(d.slice(l+1))),localStorage.setItem(f.a.MESSAGES(),JSON.stringify(d))),q({},e,{messages:d});case h.UPDATE_MESSAGE:var u=Object(U.a)(e.messages),p=-1;return-1!==(p=G()(u,(function(e){return e[t.key]===t.payload[t.key]})))&&(u=[].concat(Object(U.a)(u.slice(0,p)),[q({},u[p],{},t.payload.changedValue)],Object(U.a)(u.slice(p+1))),localStorage.setItem(f.a.MESSAGES(),JSON.stringify(u))),q({},e,{messages:u});case h.MESSAGE_SEEN:for(var E=Object(U.a)(e.messages),g=0;g<E.length;g++)E[g].readStatus===S.e.DELIVERED&&E[g].sender===S.f.CUSTOMER&&(E[g]=q({},E[g],{readStatus:S.e.SEEN}));return q({},e,{messages:E});default:return e}},X={page_details:{device_data:{},is_adster_bot:!1}};function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(n,!0).forEach((function(t){Object(_.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var z=Object(u.c)({chat_details:J,page_details:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X.page_details,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h.DEVICE_DATA_LOADED:return Q({},e,{device_data:t.payload.device_data});case h.ENABLE_ADSTER_BOT:return Q({},e,{is_adster_bot:t.payload});default:return e}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(698);var $=n(107),Z=n(108),ee=n(111),te=n(109),ne=n(110),ae=n(331),oe=n.n(ae),ie=n(332),re=n.n(ie),se=n(328),ce=n.n(se),de=(n(725),function(e){return{type:h.DEVICE_DATA_LOADED,payload:{device_data:e}}}),le=function(){return{type:h.ENABLE_ADSTER_BOT,payload:!0}},ue=n(219),_e=n.n(ue),pe=n(333),Ee=n.n(pe),Se=n(334),ge=n.n(Se),fe=(n(731),function(e){function t(){var e,n;Object($.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(ee.a)(this,(e=Object(te.a)(t)).call.apply(e,[this].concat(o)))).lottieDefaultOptions={loop:!0,autoplay:!0,path:g.a.trigger.lottie_path,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}},n.handleChatInterfaceView=function(){var e=n.props,t=e.is_chat_open;(0,e.handleSocketConnection)(!t)},n}return Object(ne.a)(t,e),Object(Z.a)(t,[{key:"render",value:function(){var e=this.props.is_chat_open;return r.a.createElement("div",{className:"ori-fixed ori-animated ori-zoom-in oriTriggerChatBotContainer",onClick:this.handleChatInterfaceView},!e&&g.a.trigger.lottie_visibility&&r.a.createElement(ge.a,{options:this.lottieDefaultOptions,height:g.a.trigger.lottie_icon_height,width:g.a.trigger.lottie_icon_width}),g.a.trigger.visibility&&!e&&r.a.createElement("div",{className:"ori-animated ori-pulse ori-infinite",style:{height:"".concat(g.a.trigger.icon_height,"px"),animationDuration:"".concat(g.a.trigger.animation_duration,"ms")}},r.a.createElement("img",{src:g.a.trigger.icon_url,alt:"",className:"ori-full-parent-height"})),!g.a.trigger.visibility&&!g.a.trigger.lottie_visibility&&!e&&r.a.createElement("div",{className:"ori-flex-row ori-flex-center triggerIconContainer"},r.a.createElement(Ee.a,{size:30})),e&&g.a.trigger.show_close_icon&&r.a.createElement("div",{className:"ori-flex-row ori-flex-center triggerIconContainer"},r.a.createElement(_e.a,{size:28})))}}]),t}(r.a.PureComponent));function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function Te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?he(n,!0).forEach((function(t){Object(_.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var be=r.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(6)]).then(n.bind(null,930))})),Oe=r.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(9)]).then(n.bind(null,931))})),me=function(e){function t(e){var n;return Object($.a)(this,t),(n=Object(ee.a)(this,Object(te.a)(t).call(this,e))).handleConnectionChange=function(){var e=n.props.actions;if("online"!==(navigator.onLine?"online":"offline"))return e.updateState("is_internet_connected",!1);var t=setInterval((function(){fetch("https//:google.com",{mode:"no-cors"}).then((function(){e.updateState("is_internet_connected",!0),clearInterval(t)})).catch((function(){return e.updateState("is_internet_connected",!1)}))}),1500)},n.botPopup=function(e,t){var a=n.props,o=a.chat_details,i=a.actions,r={case:e,params:t,psid:o.psid};i.handleBotPopupRequest(r)},n.handleSocketConnection=function(e){var t=n.props,a=t.chat_details,o=t.actions,i=Object(f.q)();if(o.handleChatbotInterface(e),e&&a.is_socket_connected){var r={clientPsid:a.psid,senderPsid:a.psid};o.emitCustomEvent(S.d.MESSAGE_SEEN,r)}!e||a.is_socket_connected||i||o.makeSocketConnection()},n.handleOfferSelection=function(e,t){n.setState({selected_offer:Te({},n.state.selected_offer,{offer_id:e,offer_name:t})})},n.setDefaultOfferState=function(){n.setState({selected_offer:Te({},n.state.selected_offer,{offer_id:null,offer_name:null})})},n.onChangeCheckbox=function(e){n.setState({selected_checkbox_values:e})},n.emitResponseToServer=function(e){var t=n.props,a=t.chat_details,o=t.actions,i=Object(f.q)(),r=Te({},e,{sender_id:g.a.sender_id,navigator_userAgent:navigator.userAgent,navigator_platform:navigator.platform,variable_name:a.variable_name,send_variable_to_apiai:a.send_variable_to_apiai,sendVariableToLS:a.sendVariableToLS,skipLS:a.skipLS});i&&localStorage.getItem(f.a.APP_PARAMS)&&(r.lockedParams=JSON.parse(localStorage.getItem(f.a.APP_PARAMS)),localStorage.removeItem(f.a.APP_PARAMS)),o.emitNewMessageToServer(r);var s=(new Date).getTime();localStorage.setItem(f.a.LAST_EMIT,JSON.stringify(s))},n.pushSenderNewMsgToChatbot=function(e,t){var a=n.props.actions,o=Te({type:e,sender_id:g.a.sender_id,timestamp:new Date,sender:S.f.CUSTOMER,readStatus:S.e.SENDING},t);a.pushSenderMessage(o)},n.sendTextToServer=function(e){var t=Object(f.v)(),a={type:S.h.TEXT,text:e,cmid:t},o={payload:{text:e},cmid:t};n.emitResponseToServer(a),n.pushSenderNewMsgToChatbot(S.h.TEXT,o)},n.handleButtonSubTypes=function(e){switch(i.button.subtype){case S.a.DISH_OFFERS:var t=n.state.selected_offer,a=Object(f.v)(),o={type:S.h.TEXT,text:t.offer_id,cmid:a},i={payload:{text:t.offer_name},cmid:a};n.pushSenderNewMsgToChatbot(S.h.TEXT,i),n.emitResponseToServer(o),t.offer_id&&n.setDefaultOfferState();break;case S.a.CHECKBOX_SUBMIT:if(i.message&&i.message.payload&&i.message.payload.options){var r=n.state.selected_checkbox_values,s=i.message.payload.options.filter((function(e){return-1!==r.findIndex((function(t){return t===e.value}))}));if(s.length>0){var c=Object(f.v)(),d={type:S.h.LIST,list:s,relayData:i.button.relayData,cmid:c},l={payload:{list:s},cmid:c};n.pushSenderNewMsgToChatbot(S.h.LIST,l),n.emitResponseToServer(d)}}break;default:return}},n.handleMsgBtnClick=function(e){if(e.button)switch(e.button.type){case S.b.LINK:if(e.button.url&&e.button.url.trim().length>0)!!localStorage.getItem(f.a.ANDROID)&&JSON.parse(localStorage.getItem(f.a.ANDROID))?window.androidObj.textToAndroid(JSON.stringify(e)):window.open(e.button.url,"_blank");break;case S.b.CUSTOM:e.button.subtype&&n.handleButtonSubTypes(e);break;case S.b.CUSTOM_SOCKET_EVENT:var t=Object(f.v)();if(e.button.text){var a={payload:{text:e.button.text},cmid:t};n.pushSenderNewMsgToChatbot(S.h.TEXT,a)}if(e.button.eventName){var o={relayData:re()({},e.message.relayData,e.button.relayData),text:e.message.payload.title,type:e.message.payload&&e.message.payload.expectedClientResponseType?e.message.payload.expectedClientResponseType:S.h.TEXT,cmid:t};n.props.actions.emitCustomEvent(e.button.eventName,o)}break;case S.b.POST_BACK_RESPONSE:var i=Object(f.v)();if(e.button.text){var r={payload:{text:e.button.text},cmid:i};n.pushSenderNewMsgToChatbot(S.h.TEXT,r)}if(e.button.postbackRes){var s={type:S.h.TEXT,text:e.button.postbackRes,cmid:i};n.emitResponseToServer(s)}break;default:e.button.text&&n.sendTextToServer(e.button.text)}},n.handleFileUpload=function(e,t){if(e&&e.fileUrl&&e.file){if(console.log("upload data",e),t){var a={data:e,message:t};n.props.actions.updateFileUploadMessage(a)}var o=Object(f.v)(),i={type:S.h.FILE,relayData:t&&t.payload?t.payload.relayData:null,fileBase64:e.fileUrl,cmid:o};n.emitResponseToServer(i);var r={payload:{title:e.file.name,imageUrl:e.fileUrl},cmid:o};n.pushSenderNewMsgToChatbot(S.h.IMAGE_WITH_BUTTONS,r)}},window.androidObj=function(){},e.actions.setDeviceData(f.c.deviceStatus()),n.timeout=!1,n.state={selected_checkbox_values:[],selected_offer:{offer_id:null,offer_name:null}},n}return Object(ne.a)(t,e),Object(Z.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,n=t.chat_details,a=t.actions,o=Object(f.q)(),i=this;if(window.bot_popup=this.botPopup,window.addEventListener("resize",(function(){clearTimeout(e.timeout),e.timeout=setTimeout((function(){i.props.actions.setDeviceData(f.c.deviceStatus())}),300)})),this.handleConnectionChange(),window.addEventListener("online",this.handleConnectionChange),window.addEventListener("offline",this.handleConnectionChange),document.addEventListener("visibilitychange",(function(){if("visible"===document.visibilityState&&i.props.chat_details.is_chat_open){var e={clientPsid:i.props.chat_details.psid,senderPsid:i.props.chat_details.psid};i.props.actions.emitCustomEvent(S.d.MESSAGE_SEEN,e)}})),o)window.androidObj.updateFromAndroid=function(e,t){e.toLowerCase()===f.b.ANDROID?localStorage.setItem(f.a.ANDROID,JSON.stringify(!0)):"psid"===e.toLowerCase()&&((t=JSON.parse(t)).psid&&(localStorage.setItem(f.a.PSID,t.psid),a.updateState("psid",t.psid)),t.params&&localStorage.setItem(f.a.APP_PARAMS,JSON.stringify(t.params)),n.is_socket_connected||(a.makeSocketConnection(),a.setDefaultState()))},a.handleChatbotInterface(!0);else if(!n.is_socket_connected){var r=localStorage.getItem(f.a.LAST_EMIT)?JSON.parse(localStorage.getItem(f.a.LAST_EMIT)):null;if(r){var s=((new Date).getTime()-r)/1e3;if(s<g.b.automate_connection_time?a.makeSocketConnection():a.handleChatbotInterface(!1),s>g.b.automate_reset_chat_time){var c=Object(f.j)();localStorage.setItem(f.a.MESSAGES,JSON.stringify(c)),a.setDefaultState()}}else a.handleChatbotInterface(!1);if(g.b.adster_bot.visibility)new URLSearchParams(window.location.search).get(g.b.adster_bot.query_param_key)&&(this.handleSocketConnection(!0),a.enableAdsterBot())}}},{key:"componentWillUnmount",value:function(){var e=this.props.actions;window.removeEventListener("online",this.handleConnectionChange),window.removeEventListener("offline",this.handleConnectionChange),e.socketDisconnect()}},{key:"render",value:function(){var e=this.props,t=e.page_details,n=e.chat_details,a=e.actions;return r.a.createElement("div",{className:"ori-app-container ori-ant-design-container oriAppContainer"},r.a.createElement(oe.a,{count:n.notification_count,overflowCount:9,className:"ori-animated ori-fade-in notificationBadge"},r.a.createElement(fe,{is_chat_open:n.is_chat_open,handleSocketConnection:this.handleSocketConnection})),r.a.createElement(i.Suspense,{fallback:r.a.createElement("div",null,r.a.createElement(ce.a,{className:"ori-l-mrgn-5 ori-animated ori-rotate ori-infinite"}))},n.is_chat_open&&r.a.createElement(be,{is_adster_bot:t.is_adster_bot,chat_details:n,actions:a,sendTextToServer:this.sendTextToServer,handleMsgBtnClick:this.handleMsgBtnClick,handleFileUpload:this.handleFileUpload,handleOfferSelection:this.handleOfferSelection,onChangeCheckbox:this.onChangeCheckbox}),g.b.notification_bot.visibility&&!n.is_chat_open&&n.unseen_messages.length>0&&r.a.createElement(Oe,{page_details:t,chat_details:n,actions:a,sendTextToServer:this.sendTextToServer,handleMsgBtnClick:this.handleMsgBtnClick,handleFileUpload:this.handleFileUpload,handleOfferSelection:this.handleOfferSelection,stack_view:g.b.notification_bot.stack_view,onChangeCheckbox:this.onChangeCheckbox})))}}]),t}(i.Component),ye=Object(d.b)((function(e){return{chat_details:e.chat_details,page_details:e.page_details}}),(function(e){return{actions:Object(u.b)(Object.assign({},o,a),e)}}))(me);Object(l.a)({dsn:g.a.sentry_dsn});var ve=function(){var e=[j];return Object(u.e)(z,Object(u.d)(u.a.apply(void 0,e),window.devToolsExtension?window.devToolsExtension():function(e){return e}))}(),Ae=document.createElement("DIV");Ae.setAttribute("id","ori-chatbot-root"),document.body.appendChild(Ae),c.a.render(r.a.createElement(d.a,{store:ve},r.a.createElement(ye,null)),document.getElementById("ori-chatbot-root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[352,3,4]]]);
//# sourceMappingURL=main.449920bf.chunk.js.map