(this.webpackJsonpchatbot=this.webpackJsonpchatbot||[]).push([[1],{352:function(e,t,a){"use strict";var i=a(36),n=a(37),r=a(40),o=a(38),s=a(39),l=a(0),c=a.n(l),m=function(e){return function(t){function a(){var e,t;Object(i.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(t=Object(r.a)(this,(e=Object(o.a)(a)).call.apply(e,[this].concat(s)))).state={shouldRender:t.props.isMounted},t}return Object(s.a)(a,t),Object(n.a)(a,[{key:"componentWillReceiveProps",value:function(e){var t=this,a=this.props,i=a.isMounted,n=a.delayMountTime,r=a.delayUnmountTime;i&&!e.isMounted?setTimeout((function(){return t.setState({shouldRender:!1})}),r):!i&&e.isMounted&&setTimeout((function(){return t.setState({shouldRender:!0})}),n)}},{key:"render",value:function(){return this.state.shouldRender?c.a.createElement(e,this.props):null}}]),a}(c.a.Component)};m.defaultProps={delayMountTime:0,delayUnmountTime:0},t.a=m},364:function(e,t,a){"use strict";var i=a(36),n=a(37),r=a(40),o=a(38),s=a(39),l=a(0),c=a.n(l),m=a(3),d=a.n(m),p=a(97),u=a.n(p),g=a(399),f=a.n(g),h=a(400),b=a.n(h),E=a(401),y=a.n(E),v=a(352),T=function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props,t=e.message,a=e.title,i=e.color,n=e.fontSize,r=e.fontLight,o=e.size,s=e.height,l=e.width,m=e.isMounted,d=e.delayUnmountTime,p=e.sad,g=e.success,h=e.failed,E=e.chainBreak;return c.a.createElement("div",{className:u()("ori-animated ori-full-parent-height ori-pad-20 ori-flex-column ori-flex-center",{"ori-fade-in":m,"ori-fade-out":!m}),style:{animationDuration:"".concat(d,"ms")}},c.a.createElement("div",{className:u()("ori-animated ori-b-mrgn-10",{"ori-font-primary":"primary"===i,"ori-font-green":"green"===i,"ori-font-warning":"warning"===i,"ori-font-danger":"danger"===i,"ori-zoom-in":m,"ori-zoom-out":!m}),style:{animationDuration:"".concat(d,"ms")}},p&&c.a.createElement("div",{style:{height:s+"px",width:l+"px"}},c.a.createElement("img",{src:"",alt:"",className:"ori-img-contain"})),E&&c.a.createElement(b.a,{size:o}),g&&c.a.createElement(f.a,{size:o}),h&&c.a.createElement(y.a,{size:o})),a&&a.trim().length>0&&c.a.createElement("p",{className:u()("ori-no-b-mrgn ori-capitalize",{"ori-font-xs":"xxs"===n,"ori-font-sm":"xs"===n,"ori-font-md":"sm"===n,"ori-font-lg":"md"===n})},a),c.a.createElement("p",{className:u()("ori-no-b-mrgn",{"ori-font-xxs":"xxs"===n,"ori-font-xs":"xs"===n,"ori-font-sm":"sm"===n,"ori-font-md":"md"===n,"ori-font-light":r})},t))}}]),t}(c.a.PureComponent),_=Object(v.a)(T);_.propTypes={message:d.a.string,title:d.a.string,color:d.a.string,size:d.a.number,fontSize:d.a.string,fontLight:d.a.bool,height:d.a.number,width:d.a.number,sad:d.a.bool,success:d.a.bool,chainBreak:d.a.bool,failed:d.a.bool,isMounted:d.a.bool,delayUnmountTime:d.a.number},_.defaultProps={title:null,size:30,fontSize:"sm",fontLight:!1,height:60,width:60,sad:!1,success:!1,failed:!1,chainBreak:!1,delayUnmountTime:500,delayMountTime:0},t.a=_},366:function(e,t,a){"use strict";var i=a(36),n=a(37),r=a(40),o=a(38),s=a(39),l=a(0),c=a.n(l),m=a(97),d=a.n(m),p=a(404),u=a.n(p),g=a(350),f=a.n(g),h=a(406),b=a.n(h),E=a(360),y=a.n(E),v=a(463),T=a.n(v),_=a(488),x=a.n(_),C=a(489),S=a.n(C),N=a(490),M=a.n(N),O=a(491),I=a.n(O),k=a(492),j=a.n(k),w=(a(493),a(1)),R=a(2),B=y.a.TextArea,D=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target.value;a.setState({input_message:t})},a.stopTypingIndicator=function(){a.state.typing&&a.setState({typing:!1},(function(){var e=a.props,t=e.emitCustomEvent,i={clientPsid:e.psid,isTyping:!1};t(R.d.TYPING_STATUS,i)}))},a.inputKeyDown=function(e){var t=a.state,i=t.input_message,n=t.typing,r=a.props,o=r.psid,s=r.emitCustomEvent;13===e.keyCode&&!e.shiftKey&&i.trim().length>0?a.handleMessageSend(e):n?(clearTimeout(a.typingTimer),a.typingTimer=setTimeout(a.stopTypingIndicator,3e3)):(a.setState({typing:!0},(function(){var e={clientPsid:o,isTyping:!0};s(R.d.TYPING_STATUS,e)})),a.typingTimer=setTimeout(a.stopTypingIndicator,3e3))},a.onClickMic=function(){var e=a.props,t=e.listening,i=e.startListening,n=e.stopListening,r=e.resetTranscript;t?n():(r(),i())},a.stopSpeechListening=function(){var e=a.props,t=e.listening,i=e.stopListening;a.setState({input_message:""}),t&&i()},a.handleMessageSend=function(e){e.preventDefault();var t=a.state.input_message.trim();a.props.sendTextToServer(t),a.stopSpeechListening(),a.stopTypingIndicator(),a.typingTimer&&clearTimeout(a.typingTimer)},a.onRemove=function(e){a.setState({file:null,fileUrl:""})},a.typingTimer=null,a.state={input_message:"",typing:!1,file:null,fileUrl:""},a}return Object(s.a)(t,e),Object(n.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.props,i=a.transcript;a.listening&&e.transcript!==i&&this.setState({input_message:i})}},{key:"render",value:function(){var e=this.props,t=e.is_input_lock,a=e.input_lock_text,i=e.onClickMenu,n=e.onInputFocus,r=e.browserSupportsSpeechRecognition,o=e.listening,s=e.notification_bot,l=e.beforeUpload,m=e.onRemove,p=this.state.input_message,u=Object(w.p)();return c.a.createElement("div",{className:d()("ori-relative ori-full-width oriInputComposerContainer",{"ori-placeholder-primary":t||o})},!s&&!o&&c.a.createElement("div",{className:"ori-animated ori-fade-in ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc alignMenuIcon",onClick:i},c.a.createElement(M.a,{size:20})),o&&c.a.createElement("div",{className:d()("ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc ori-font-danger",{alignCircleDotIcon:s,alignMenuIcon:!s}),onClick:this.stopSpeechListening},c.a.createElement(I.a,{size:18,className:"ori-animated ori-ripple ori-infinite"})),c.a.createElement("div",{className:"ori-animated ori-fade-in ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc alignAddFileIcon"},c.a.createElement(T.a,{showUploadList:!1,beforeUpload:l,onRemove:m},c.a.createElement(j.a,{size:20,className:"ori-font-light-hover-default"}))),c.a.createElement(b.a,{onSubmit:this.handleMessageSend},c.a.createElement(B,{placeholder:t?a:o?"Listening...":"send your query...",className:"ori-font-sm ori-line-height-1 inputField",autosize:{minRows:1,maxRows:u?1:3},value:p,name:"input_message",disabled:t,onKeyDown:this.inputKeyDown,onFocus:n,onChange:this.handleInputChange}),(p.trim().length>0||!r)&&c.a.createElement(f.a,{className:d()("ori-animated ori-fade-in ori-absolute ori-pad-5 ori-flex-column ori-flex-jc alignSendButton",{sendBtnActive:p.trim().length>0}),htmlType:"submit",disabled:0===p.trim().length||t},c.a.createElement(x.a,{size:20})),0===p.trim().length&&r&&c.a.createElement(f.a,{className:d()("ori-animated ori-fade-in ori-absolute ori-pad-5 ori-flex-column ori-flex-jc alignSendButton"),disabled:t,onClick:this.onClickMic},c.a.createElement(S.a,{size:20,className:d()("ori-font-light btnIcon",{"ori-font-primary ori-animated ori-pulse ori-infinite":o})}))))}}]),t}(c.a.PureComponent);D.defaultProps={is_input_lock:!1,notification_bot:!1,emitCustomEvent:function(){}};t.a=u()({autoStart:!1})(D)},387:function(e,t,a){"use strict";var i=a(36),n=a(37),r=a(40),o=a(38),s=a(39),l=a(0),c=a.n(l),m=a(97),d=a.n(m),p=a(392),u=a.n(p),g=a(393),f=a.n(g),h=a(394),b=a.n(h),E=a(395),y=a.n(E),v=a(146),T=a.n(v),_=a(363),x=a.n(_),C=a(396),S=(a(397),a(2)),N=a(4),M=a(1),O=(a(398),function(e){function t(){return Object(i.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props.dot_color;return c.a.createElement("div",{className:"ori-flex-row oriDotsLoaderContainer"},c.a.createElement("div",{className:"dot one ".concat(e)},"\xa0"),c.a.createElement("div",{className:"dot two ".concat(e)},"\xa0"),c.a.createElement("div",{className:"dot three ".concat(e)},"\xa0"))}}]),t}(c.a.PureComponent));O.defaultProps={dot_color:"ori-bg-primary"};var I=O,k=a(517),j=a(364),w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).state={hasError:!1},a}return Object(s.a)(t,e),Object(n.a)(t,[{key:"componentDidCatch",value:function(e,t){var a=this;k.b((function(a){Object.keys(t).forEach((function(e){a.setExtra(e,t[e])})),k.a(e)})),this.setState({hasError:!0},(function(){a.props.onErrorCallback&&a.props.onErrorCallback()}))}},{key:"render",value:function(){var e=this.props,t=e.type,a=e.children;return this.state.hasError?t===S.c.ERROR?c.a.createElement(j.a,{title:"Error",message:"something went worng.",height:100,width:100,error:!0}):null:a}}]),t}(l.Component),R=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(r.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).isTimeStampTagVisible=function(e,t){return new Date(e).getTime()-new Date(t).getTime()>864e5},a.displayTimeStamp=function(e){var t=(new Date).getTime(),a=new Date(e).getTime();return t-a<864e5?"Today":t-a<1728e5?"Yesterday":Object(M.e)(e,{year:"numeric",month:"short",day:"numeric"})},a.onClickMessageVoting=function(e,t){(0,a.props.onMessageVoting)({chatlogId:e.chatlogId,voteType:t})},a.renderReadStatusIcon=function(e){return e===S.e.SENDING?c.a.createElement(T.a,{size:13,className:"ori-l-mrgn-5 ori-animated ori-rotate ori-infinite"}):e===S.e.SENT?c.a.createElement(f.a,{size:13,className:"ori-l-mrgn-5"}):e===S.e.DELIVERED?c.a.createElement(b.a,{size:13,className:"ori-l-mrgn-5"}):e===S.e.SEEN?c.a.createElement(y.a,{size:13,className:"ori-l-mrgn-5"}):void 0},a}return Object(s.a)(t,e),Object(n.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.props,i=a.messages,n=a.messagesContainer;e.messages.length!==i.length&&Object(M.r)(n)}},{key:"render",value:function(){var e=this,t=this.props,a=t.messages,i=t.is_typing,n=t.typing_text,r=t.handleMsgBtnClick,o=t.onChangeCheckbox,s=t.notification_bot,l=t.stack_view,m=t.btn_disabled,p=t.bubble_animation,g=t.handleFileUpload;return c.a.createElement("div",{className:"ori-full-width ori-l-pad-20 ori-r-pad-40 ori-tb-pad-10 oriChatBotConversationContainer"},a.map((function(t,i){var n=0===i||i>0&&(a[i-1].sender!==t.sender||a[i-1].senderInfo&&t.senderInfo&&a[i-1].senderInfo.psid!==t.senderInfo.psid),f=t.sender===S.f.CUSTOMER,h=t.sender===S.f.SYSTEM,b=t.sender===S.f.ADMIN,E=t.sender===S.f.CHATBOT,y=t.type===S.h.TEXT,v=t.type===S.h.LIST,T=t.type===S.h.TEXT_WITH_BUTTONS,_=t.type===S.h.CHECKBOX_WITH_MEDIA,O=t.type===S.h.IMAGE_WITH_BUTTONS,I=t.type===S.h.VIDEO,k=t.type===S.h.CAROUSEL,j=T||O||I,R=t.type===S.h.NOTIFICATION,B=t.type===S.h.UPLOAD_FILE,D=t.type===S.h.CUSTOM_MSG&&t.payload.subtype===S.g.DISH_RECHARGE,U=t.type===S.h.CUSTOM_MSG&&t.payload.subtype===S.g.DISH_RECHARGE_DETAILS,z=t.type===S.h.CUSTOM_MSG&&t.payload.subtype===S.g.DISH_OFFERS,A=t.type===S.h.CUSTOM_MSG&&t.payload.subtype===S.g.DISH_RECHARGE_HISTORY,L="u",P="";t.senderInfo&&(L=t.senderInfo.pseudoName?t.senderInfo.pseudoName:"agent",P=t.senderInfo.imgUrl&&t.senderInfo.imgUrl.trim().length>0?t.senderInfo.imgUrl:"");var H=!s&&(0===i||!!t.timestamp&&e.isTimeStampTagVisible(t.timestamp,a[i-1].timestamp));return h&&t.type===S.h.SYSTEM_TEXT?c.a.createElement(w,{key:i},c.a.createElement("div",{className:"ori-l-pad-25 ori-tb-pad-10 ori-text-center "},c.a.createElement("p",{className:"ori-font-medium ori-font-xs"},t.payload.text),t.timestamp&&c.a.createElement("p",{className:"ori-font-xxs ori-font-light ori-lr-pad-10"},Object(M.f)(t.timestamp,{hour:"2-digit",minute:"2-digit"})))):c.a.createElement(w,{key:i},c.a.createElement("div",{className:"ori-full-width"},H&&c.a.createElement("div",{className:"ori-flex-row ori-flex-jc ori-l-pad-20"},c.a.createElement("div",{className:"ori-font-xs ori-border-radius-20 ori-lr-pad-10 ori-b-mrgn-10 ori-t-mrgn-15 ori-bg-header ori-box-shadow"},e.displayTimeStamp(t.timestamp))),c.a.createElement("div",{className:d()("ori-relative ori-flex-row msgContainer ori-animated "+p,{receiverMsgContainer:b||E,senderMsgContainer:f})},n&&b&&c.a.createElement("p",{className:"ori-absolute ori-font-11 ori-capitalize ori-align-top-4"},L),n&&E&&c.a.createElement("div",{className:d()("ori-absolute ori-animated ori-fade-in msgAvatar")},c.a.createElement(x.a,{src:""!==P?P:N.a.icon_url})),n&&b&&c.a.createElement("div",{className:d()("ori-absolute ori-animated ori-fade-in msgAvatar")},c.a.createElement(x.a,{src:P,className:"ori-font-default ori-capitalize ori-bg-white"},L.charAt(0))),(y||v||j||_||D||U||z||A||k||R||B)&&c.a.createElement("div",{className:d()("ori-b-mrgn-4",{"ori-t-pad-20":n,bubbleIndicatorDefault:n&&!s,bubbleIndicatorNotification:n&&s&&!l,bubbleIndicatorStack:n&&s&&l,"ori-full-width":k||B})},c.a.createElement("div",{className:d()("ori-pad-7 ori-border-radius-10 msgBox",{bubbleIndicator:n,defaultMsgBox:!s,notificationMsgBox:s&&!l,notificationStackMsgBox:s&&l,oriOffers:z,"ori-full-width oriRechargeHistory":A,"ori-full-width oriCarousel":k,"ori-l-pad-15":v})},y&&c.a.createElement(C.TextMessage,{message:t,disable_html_parser:f}),v&&c.a.createElement(C.ListMessage,{message:t}),j&&c.a.createElement(C.TextWithMedia,{message:t,handleMsgBtnClick:r,btn_hidden:l,btn_disabled:m}),_&&c.a.createElement(C.CheckboxWithMedia,{message:t,handleMsgBtnClick:r,onChangeCheckbox:o,checkbox_disabled:i!==a.length-1,btn_hidden:l||i!==a.length-1,btn_disabled:m}),D&&c.a.createElement(C.Recharge,{message:t,handleMsgBtnClick:r,btn_hidden:l,btn_disabled:m}),U&&c.a.createElement(C.RechargeDetails,{message:t,handleMsgBtnClick:r,btn_hidden:l,btn_disabled:m}),z&&c.a.createElement(C.Offers,{message:t,handleMsgBtnClick:r,handleOfferSelection:e.props.handleOfferSelection,disable_offer:i!==a.length-1||l,btn_disabled:m}),A&&c.a.createElement(C.RechargeHistory,{message:t,handleMsgBtnClick:r,btn_hidden:l,btn_disabled:m}),k&&c.a.createElement(C.CarouselWithButtons,{message:t,handleMsgBtnClick:r,btn_hidden:l,btn_disabled:m}),R&&c.a.createElement(C.PromptMsg,{message:t,handleMsgBtnClick:r,btn_disabled:i!==a.length-1||m,btn_hidden:l}),B&&c.a.createElement(C.UploadFile,{message:t,handleMsgBtnClick:r,btn_disabled:m,handleFileUpload:g,disabled:l||i!==a.length-1}),(t.timestamp||t.chatlogId)&&c.a.createElement("div",{className:d()("ori-flex-row ori-line-height-1 ori-t-mrgn-3 ori-flex-jsb",{"ori-font-white":f,"ori-font-light":E||b})},c.a.createElement("div",{className:"ori-flex-row"},t.chatlogId&&(E||b)&&c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:d()("ori-flex ori-cursor-ptr ori-r-pad-5",{"ori-font-primary":t.voteType&&"upvote"===t.voteType}),onClick:e.onClickMessageVoting.bind(e,t,"upvote")},c.a.createElement(u.a,{size:12})),c.a.createElement("div",{className:d()("ori-flex ori-cursor-ptr ori-l-pad-5 ori-rotate-180",{"ori-font-primary":t.voteType&&"downvote"===t.voteType}),onClick:e.onClickMessageVoting.bind(e,t,"downvote")},c.a.createElement(u.a,{size:12})))),(t.timestamp||t.readStatus)&&c.a.createElement("div",{className:"ori-flex-row"},t.timestamp&&c.a.createElement("span",{className:"ori-font-xxs ori-flex-column ori-flex-jfe ori-uppercase"},Object(M.f)(t.timestamp,{hour:"2-digit",minute:"2-digit"})),f&&t.readStatus&&e.renderReadStatusIcon(t.readStatus))))))))})),i&&c.a.createElement("div",{className:"msgContainer receiverMsgContainer ori-flex-row ori-t-pad-5"},c.a.createElement("div",{className:d()("ori-flex-row ori-border-radius-10 ori-pad-7",{defaultMsgBox:!s,notificationMsgBox:s&&!l,notificationStackMsgBox:s&&l})},""!==n&&c.a.createElement("div",{className:"ori-font-xs ori-font-primary ori-capitalize-first ori-r-pad-5"},n),c.a.createElement("div",{className:"ori-flex-column ori-flex-jc"},c.a.createElement(I,null)))))}}]),t}(c.a.PureComponent);R.defaultProps={notification_bot:!1,bubble_animation:"",typing_text:"",is_typing:!1,stack_view:!1,btn_disabled:!1};t.a=R},397:function(e,t,a){},398:function(e,t,a){},493:function(e,t,a){}}]);
//# sourceMappingURL=1.866fbcd0.chunk.js.map