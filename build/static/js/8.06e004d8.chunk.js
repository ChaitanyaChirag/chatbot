(this.webpackJsonpchatbot=this.webpackJsonpchatbot||[]).push([[8],{907:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},n=i(a(1)),l=i(a(148));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return n.default.createElement(l.default,r({viewBox:"0 0 40 40"},e),n.default.createElement("g",null,n.default.createElement("path",{d:"m25.7 12.3l-7.7 7.7 7.7 7.7-2.3 2.3-10-10 10-10z"})))},e.exports=t.default},908:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},n=i(a(1)),l=i(a(148));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){return n.default.createElement(l.default,r({viewBox:"0 0 40 40"},e),n.default.createElement("g",null,n.default.createElement("path",{d:"m16.6 10l10 10-10 10-2.3-2.3 7.7-7.7-7.7-7.7z"})))},e.exports=t.default},909:function(e,t,a){},924:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return g}));var r=a(107),n=a(108),l=a(111),i=a(109),o=a(322),c=a(110),s=a(1),u=a.n(s),f=a(741),d=a.n(f),h=a(907),p=a.n(h),m=a(908),b=a.n(m),v=(a(909),{LEFT:"left",RIGHT:"right"}),g=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(l.a)(this,Object(i.a)(t).call(this))).handleTranslate=function(t){var a=e.state.translate,r=e.quick_reply_view.offsetWidth,n=e.quick_replay_track.scrollWidth;if(r>n)e.setState({disableLeft:!0,disableRight:!0});else{if(t===v.LEFT)a>r-n&&a<=0?e.setState({translate:a-40,disableRight:!1}):e.setState({disableLeft:!0});if(t===v.RIGHT)a<n-r&&a<0?e.setState({translate:a+40,disableLeft:!1}):e.setState({disableRight:!0})}},e.translateRight=function(){e.handleTranslate(v.RIGHT)},e.translateLeft=function(){e.handleTranslate(v.LEFT)},e.handleTranslate=e.handleTranslate.bind(Object(o.a)(e)),e.state={translate:0,disableLeft:!1,disableRight:!0},e}return Object(c.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.translate,r=t.disableLeft,n=t.disableRight,l=this.props,i=l.quick_replies,o=l.sendTextToServer,c="".concat(a,"px");return u.a.createElement("div",{className:"ori-relative ori-full-width ori-full-parent-height oriQuickReplyContainer"},!n&&u.a.createElement(d.a,{className:"ori-absolute ori-pad-3 ori-flex-column ori-flex-jc iconBtn  alignLeftIcon",onClick:this.translateRight},u.a.createElement(p.a,{size:20})),!r&&u.a.createElement(d.a,{className:"ori-absolute ori-pad-3 ori-flex-column ori-flex-jc iconBtn alignRightIcon",onClick:this.translateLeft},u.a.createElement(b.a,{size:20})),u.a.createElement("div",{className:"ori-full-width ori-full-parent-height quickReplyBodyContainer",ref:function(t){e.quick_reply_view=t}},u.a.createElement("div",{id:"quick_reply_track",className:"ori-full-parent-height ori-flex-row quickReplyTrack",style:{transform:"translate3d("+c+",0,0)"},ref:function(t){e.quick_replay_track=t}},i.map((function(e,t){return u.a.createElement("div",{className:"ori-animated ori-fade-in ori-full-parent-height ori-lr-pad-5 ori-flex-column ori-flex-jc",key:t},u.a.createElement(d.a,{className:"ori-lr-pad-5 ori-btn-ghost-primary ori-font-xs",onClick:function(){o(e)}},e))})))))}}]),t}(u.a.PureComponent)}}]);
//# sourceMappingURL=8.06e004d8.chunk.js.map