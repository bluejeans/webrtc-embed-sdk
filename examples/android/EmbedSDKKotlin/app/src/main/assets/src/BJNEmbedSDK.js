!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("mobx")):"function"==typeof define&&define.amd?define("BJNEmbedSDK",["mobx"],t):"object"==typeof exports?exports.BJNEmbedSDK=t(require("mobx")):e.BJN=t(e.mobx)}(self,(e=>(()=>{"use strict";var t={745:function(e,t,o){var n=this&&this.__decorate||function(e,t,o,n){var i,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,o,a):i(t,o))||a);return r>3&&a&&Object.defineProperty(t,o,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.BJNEmbedSDK=t.VideoState=t.BJNEConnectionState=t.Locale=void 0;const a=o(259),s=r(o(219)),c=o(610);class l{constructor(){this.isSDKInitComplete=!1,this.joinManager=new s.default(this)}_setConnectionState(){this.connectionState=this._connectionState}joinMeeting(e){let t=this._buildUIConfig(e);this.joinManager.joinMeeting(e,(0,a.action)((()=>{this.isSDKInitComplete=!0,this.setUIPropsFromConfig(t),(0,a.reaction)((()=>this._connectionState),(()=>{this._connectionState===c.BJNEConnectionState.DISCONNECTED?setTimeout((()=>{this._setConnectionState()}),500):this._setConnectionState()}))})))}_buildUIConfig(e){let t={},o=e.uiProps.teleHealthConfig&&Object.keys(e.uiProps.teleHealthConfig).length>0;if(e.uiProps.hideSignInButton&&(t.sign_in=!1),e.uiProps.disableFullScreenToggle&&(t.fullscreen_toggle=!1),e.uiProps.hideFooter&&(t.footer=!1),e.uiProps.hideChatPanel&&(t.chat=!1),e.uiProps.hideAppsPanel&&(t.apps=!1),e.uiProps.hideRoomJoinOption&&(t.room_pairing=!1),e.uiProps.lockMeetingControls&&(t.layout=!0),e.uiProps.hideCopyLink&&(t.copy_link=!1),e.uiProps.hideRatingScreen&&(t.rating=!1),e.uiProps.hideAppPitches&&(t.app_pitch=!1),e.uiProps.hideOtherJoinOptions&&(t.join_options=!1),o?e.uiProps.teleHealthConfig.backgroundColor&&(t.bg=encodeURIComponent(e.uiProps.teleHealthConfig.backgroundColor)):(e.uiProps.customBackground&&(t.bg=encodeURIComponent(e.uiProps.customBackground)),e.uiProps.inMeetingBGConfig&&e.uiProps.inMeetingBGConfig.audioTileColor&&(t.audioTileBG=encodeURIComponent(e.uiProps.inMeetingBGConfig.audioTileColor)),e.uiProps.inMeetingBGConfig&&e.uiProps.inMeetingBGConfig.containerColorOfAllTiles&&(t.tileContainerBG=encodeURIComponent(e.uiProps.inMeetingBGConfig.containerColorOfAllTiles))),e.uiProps.locale&&(t.ll=encodeURIComponent(e.uiProps.locale)),o||e.uiProps.hideCopyLink){let n=o?Object.assign({},e.uiProps.teleHealthConfig):{};n.shareLinkVisibility=!e.uiProps.hideCopyLink,t.teleHealthConfig=encodeURIComponent(JSON.stringify(n))}return t}get version(){return"2.2.0"}leave(){}leaveAndEndForAll(){}setAudioMuted(e){}setVideoMuted(e){}startScreenShare(){}stopScreenShare(){}setName(e){}setUIPropsFromConfig(e){}setRemoteAudioMuted(e){}observe(e,t){Object.getOwnPropertyNames(this).includes(e)?(0,a.reaction)((()=>this[e]),(()=>{t()})):console.error("Property is not supported.")}}n([a.observable,i("design:type",Boolean)],l.prototype,"isSDKInitComplete",void 0),n([a.observable,i("design:type",String)],l.prototype,"connectionState",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"audioMuted",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"videoMuted",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"receivingScreenShare",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"sharingScreen",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"canShareScreen",void 0),n([a.observable,i("design:type",Array)],l.prototype,"participants",void 0),n([a.observable,i("design:type",Object)],l.prototype,"selfParticipant",void 0),n([a.observable,i("design:type",Array)],l.prototype,"chatMessages",void 0),n([a.observable,i("design:type",String)],l.prototype,"videoState",void 0),n([a.observable,i("design:type",Boolean)],l.prototype,"remoteAudioMuted",void 0),n([a.observable,i("design:type",String)],l.prototype,"_connectionState",void 0),n([a.action,i("design:type",Function),i("design:paramtypes",[]),i("design:returntype",void 0)],l.prototype,"_setConnectionState",null);var d=o(754);Object.defineProperty(t,"Locale",{enumerable:!0,get:function(){return d.Locale}});var p=o(610);Object.defineProperty(t,"BJNEConnectionState",{enumerable:!0,get:function(){return p.BJNEConnectionState}}),Object.defineProperty(t,"VideoState",{enumerable:!0,get:function(){return p.VideoState}}),t.BJNEmbedSDK=new l},219:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(601),i=o(815);t.default=class{constructor(e){this.embedSDKInterface=e}joinMeeting(e,t){var o;let n=e.meetingInfo,r=e.iFrameProps,a=n.meetingOrigin||(0,i.getQueryParam)("env")||"https://bluejeans.com",s=this.formMeetingurl(n,a);s=this.applyUICustomisation(e.uiProps,s),(null===(o=null==e?void 0:e.meetingInfo)||void 0===o?void 0:o.eid)&&(s=this.attachExternalID(s,e.meetingInfo.eid));let c=this.buildMeetingIFrame(s,r);console.debug("Trying to establish the connection to the iframe."),this.establishConnectionWithChild(c.contentWindow,a,t)}formMeetingurl(e,t){let o=window.location.origin,n=e.meetingId,i=e.passcode,r=e.name,a=`${t}/${n}`;return i&&(a=`${a}/${i}`),"file://"===o&&(o="null"),a=`${a}/quick?embed=true&parent=${o}`,r&&(a=`${a}&name=${encodeURIComponent(r)}`),a=`${a}&version=${encodeURIComponent("2.2.0")}`,a}buildMeetingIFrame(e,t){let o=document.createElement("iframe");return o.setAttribute("src",e),o.style.width=t.width||"100%",o.style.height=t.height||"100%",o.style.borderRadius="10px",o.setAttribute("allow","autoplay; fullscreen; microphone; camera; display-capture"),o.setAttribute("noResize","true"),t.selectorId?document.querySelector(t.selectorId).appendChild(o):document.body.appendChild(o),o}applyUICustomisation(e,t){return t=e.hideSignInButton?`${t}&sign_in=false`:t,t=e.hideAppPitches?`${t}&app_pitch=false`:t,e.teleHealthConfig&&Object.keys(e.teleHealthConfig).length>0?e.teleHealthConfig.backgroundColor&&(t=`${t}&bg=${encodeURIComponent(e.teleHealthConfig.backgroundColor)}`):e.customBackground&&(t=`${t}&bg=${encodeURIComponent(e.customBackground)}`),e.locale?`${t}&ll=${encodeURIComponent(e.locale)}`:t}attachExternalID(e,t){return`${e}#eid=${encodeURIComponent(t)}`}establishConnectionWithChild(e,t,o){window.addEventListener("message",(i=>{console.debug("While establishing connection the parent received : ",i.data),(0,n.messageTypeFromKnownOrigin)(i,t,n.MESSAGE_TYPE_IFRAME)&&"SDK_INIT_COMPLETED"===i.data.info&&((0,n.makeCrossIframeProxy)(this.embedSDKInterface,e,t),o())}),!1)}}},754:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.Locale=void 0,function(e){e.EN="en",e.ES="es",e.DE="de",e.FR="fr",e.JA="ja"}(o||(t.Locale=o={}))},610:(e,t)=>{var o,n;Object.defineProperty(t,"__esModule",{value:!0}),t.VideoState=t.BJNEConnectionState=void 0,function(e){e.CONNECTING="Connecting",e.CONNECTED="Connected",e.RECONNECTING="Reconnecting",e.DISCONNECTED="Disconnected"}(o||(t.BJNEConnectionState=o={})),function(e){e.ACTIVE="ACTIVE",e.INACTIVE_ONLY_PARTICIPANT="INACTIVE_ONLY_PARTICIPANT",e.INACTIVE_NO_ONE_HAS_VIDEO="INACTIVE_NO_ONE_HAS_VIDEO",e.INACTIVE_NEEDS_MODERATOR="INACTIVE_NEEDS_MODERATOR",e.INACTIVE_DISCONNECTED="INACTIVE_DISCONNECTED"}(n||(t.VideoState=n={}))},601:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.makeCrossIframeProxy=t.messageTypeFromKnownOrigin=t.MESSAGE_TYPE_IFRAME=t.MESSAGE_TYPE_PARENT=void 0;const n=o(259);function i(e,t,o){return!(!e.data.type||e.data.type!=o)&&t==e.origin}t.MESSAGE_TYPE_PARENT="crossdomain.toTarget",t.MESSAGE_TYPE_IFRAME="crossdomain.toProxy",t.messageTypeFromKnownOrigin=i,t.makeCrossIframeProxy=function(e,o,r){!function(e,o,r){const a=(0,n.action)((o=>{console.debug("Parent Recieved data : ",o.data),i(o,r,t.MESSAGE_TYPE_IFRAME)&&("connectionState"===o.data.property?e._connectionState=o.data.value:e[o.data.property]=o.data.value)}));window.addEventListener("message",a,!1)}(e,0,r),function(e,o,n){const i=Object.getOwnPropertyDescriptors(Object.getPrototypeOf(e));Object.keys(i).forEach((r=>{const a=i[r];a.value&&"function"==typeof a.value&&"joinMeeting"!=r&&"observe"!=r&&"_"!==r[0]&&(e[r]=function(){const e=Array.prototype.slice.call(arguments);o.postMessage({type:t.MESSAGE_TYPE_PARENT,method:r,args:e},n)})}))}(e,o,r)}},815:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getQueryParam=void 0,t.getQueryParam=function(e){try{if(window.location.search){let t,o=function(e){return window.decodeURIComponent(e.replace(/\+/g," "))},n={},i=window.location.search.slice(1).split("&");for(let e=0;e<i.length;e++)t=i[e].split("="),t[0]&&(t.length<2&&t.push(""),n[o(t[0])]=o(t[1]));return n[e]}}catch(e){console.debug("Error in parsing the query params")}return null}},259:t=>{t.exports=e}},o={};return function e(n){var i=o[n];if(void 0!==i)return i.exports;var r=o[n]={exports:{}};return t[n].call(r.exports,r,r.exports,e),r.exports}(745)})()));