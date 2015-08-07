/******/!function(e){function n(o){if(t[o])return t[o].exports;var s=t[o]={exports:{},id:o,loaded:!1};return e[o].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}// webpackBootstrap
/******/
var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}var s=t(2),i=o(s),a=t(3),r=o(a),c=t(4),l=o(c),u=t(5),d=o(u),m=t(6),v=o(m),g=t(1),f=o(g),h=t(7),p=o(h),y=t(8),b=o(y),C=t(9),M=o(C),$=t(10),S=o($);angular.module("leanmessageDemo",["ngResource","ui.router","ngMaterial","ui.gravatar","leancloud-realtime"]).constant("md5",md5).constant("defaultConversation",{id:"551a2847e4b04d688d73dc54"}).config(i["default"]).config(r["default"]).run(l["default"]).factory("rt",["LCRealtimeFactory",function(e){return e()}]).service("conversationCache",p["default"]).service("user",b["default"]).directive("infiniteList",M["default"]).directive("message",S["default"]).controller("ConversationController",d["default"]).controller("ConversationMessageController",v["default"]).controller("LoginController",f["default"])},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),s=function(){function e(n,o,s){"ngInject";t(this,e),this.$state=n,this.userService=o,this.md5=s,this.user={}}return e.$inject=["$state","user","md5"],o(e,[{key:"login",value:function(){var e=this;this.userService.login(this.user.id,this.md5(this.user.email||Math.random()+Date.now())).then(function(){return e.$state.go("conversation.message")})}}]),e}();n["default"]=s,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){"ngInject";e.theme("default").primaryPalette("blue").accentPalette("grey"),n.defaults={"default":"retro"}}Object.defineProperty(n,"__esModule",{value:!0}),t.$inject=["$mdThemingProvider","gravatarServiceProvider"],n["default"]=t,e.exports=n["default"]},function(e,n){"use strict";function t(e,n,t){"ngInject";e.state("conversation",{"abstract":!0,url:"/conversations",templateUrl:"app/conversation/conversation.html",controller:"ConversationController",controllerAs:"conversation"}).state("conversation.message",{url:"/:clientId",templateUrl:"app/conversation/conversation-message/conversation-message.html",controller:"ConversationMessageController",controllerAs:"conversationMessage"}).state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"login"}),n.otherwise("/conversations/"+t.id)}Object.defineProperty(n,"__esModule",{value:!0}),t.$inject=["$stateProvider","$urlRouterProvider","defaultConversation"],n["default"]=t,e.exports=n["default"]},function(e,n){"use strict";function t(e,n,t){"ngInject";e.$on("$stateChangeStart",function(e,o){if("login"!==o.name&&!t.isLoggedin())if(t.isCached()){var s=t.getCachedInfo();t.login(s.id,s.email)}else setTimeout(function(){return n.go("login")},0)})}Object.defineProperty(n,"__esModule",{value:!0}),t.$inject=["$rootScope","$state","user"],n["default"]=t,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),s=function(){function e(n,o,s,i,a,r,c,l){"ngInject";var u=this;t(this,e),this.$mdSidenav=o,this.userService=s,this.$state=i,this.conversationCache=c,this.defaultConversation=l,this.isMenuOpen=void 0,r.getMyConvs().then(function(e){u.conversations=e,console.log(e),0===e.length&&r.conv(l.id).then(function(e){u.conversations.push(e),a.show(a.simple().content("欢迎使用 LeanMessage，自动加入默认群聊（"+e.name+"）").position("top right"))})}),r.on("message",function(e){return console.log(e)}),r.on("message",function(e){var n=u.findFirstMatch(u.conversations,function(n){return n.id===e.cid});n&&n.id!==u.currentConversation.id&&("number"!=typeof n.unreadMessagesCount&&(n.unreadMessagesCount=0),n.unreadMessagesCount++)}),n.$on("conv.created",function(e,n){u.currentConversation=n;var t=u.findFirstMatch(u.conversations,function(e){return e.id===u.currentConversation.id});t.unreadMessagesCount=0}),n.$on("conv.messagesent",function(){var e=u.findFirstMatch(u.conversations,function(e){return e.id===u.currentConversation.id});e.lastMessageTime=Date.now()})}return e.$inject=["$scope","$mdSidenav","user","$state","$mdToast","rt","conversationCache","defaultConversation"],o(e,[{key:"findFirstMatch",value:function(e,n){for(var t=0,o=e.length;o>t;t++)if(n(e[t],t))return e[t]}},{key:"getSingleConvTarget",value:function(e){return e[0]===this.userService.user.id?e[1]:e[0]}},{key:"changeTo",value:function(e){this.$state.go("conversation.message",{clientId:e}),this.close("menu")}},{key:"toggle",value:function(e){this.$mdSidenav(e).toggle()}},{key:"close",value:function(e){this.$mdSidenav(e).close()}},{key:"logout",value:function(){this.conversationCache.clearAll(),this.userService.logout(),this.$state.go("login")}}]),e}();n["default"]=s,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),s=function(){function e(n,o,s,i,a,r,c,l,u,d,m){"ngInject";var v=this;t(this,e),this.$mdSidenav=n,this.user=o,this.$state=s,this.$timeout=d,this.$anchorScroll=m,this.$scope=i,this.LCTextMessage=c,this.queryString="",this.queryClients=[],this.defaultConversation=u,this.maxResultsAmount=64;var g=s.params.clientId;this.isGroupConversation=!1,this.messages=[];var f,h;if("@"===g[0]&&g.length>1){var p=g.slice(1);h=l.getConversationId(p),null===h?(f=r.conv({members:[p]}),f.then(function(e){return l.setConversationId(p,e.id)})):f=r.conv(h)}else g.match(/^[0-9a-f]{24}$/)?(this.isGroupConversation=!0,h=g,f=r.conv(h).then(function(e){return e.join().then(function(){return a.resolve(e)})})):""===g?this.changeTo(u.id,{location:"replace"}):f=a.reject(new Error("404: Illegal id in URI"));f&&f.then(function(e){v.conv=e,e.log().then(function(e){v.messages=e.concat(v.messages),v.scrollToBottom()}),e.on("message",function(e){v.messages.push(e),v.scrollToBottom()}),i.$on("$destroy",function(){return e.destroy()}),i.$emit("conv.created",e)}.bind(this))["catch"](function(e){v.conv={name:"👻"+e.message}}.bind(this))}return e.$inject=["$mdSidenav","user","$state","$scope","$q","rt","LCTextMessage","conversationCache","defaultConversation","$timeout","$anchorScroll"],o(e,[{key:"send",value:function(){var e=new this.LCTextMessage(this.currentconversationMessage.draft);e._state="sending",this.messages.push(e),this.scrollToBottom(),this.conv.send(e).then(function(e){return e._state="sended"},function(){return e._stats="failed"}),this.$scope.$emit("conv.messagesent"),this.currentconversationMessage.draft=""}},{key:"query",value:function(e){var n=e?this.conv.members.filter(this.createFilterFor(e)):this.conv.members;this.queryClients=n}},{key:"createFilterFor",value:function(e){var n=angular.lowercase(e);return function(e){return-1!==e.indexOf(n)}}},{key:"clearQuery",value:function(){this.queryString="",this.query()}},{key:"changeTo",value:function(e,n){this.$state.go("conversation.message",{clientId:e},n),this.closeAll()}},{key:"toggle",value:function(e){this.$mdSidenav(e).toggle()}},{key:"close",value:function(e){this.$mdSidenav(e).close()}},{key:"closeAll",value:function(){var e=this;["online","online-search"].map(function(n){return e.close(n)})}},{key:"scrollToBottom",value:function(){var e=this;return this.$timeout(function(){return e.$anchorScroll("message-view-bottom")},0)}},{key:"loadMore",value:function(){var e=this;if(void 0!==this.conv)return this.conv.log({t:this.messages.length?this.messages[0].timestamp:null},null).then(function(n){e.messages=n.concat(e.messages)})}}]),e}();n["default"]=s,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),s=function(){function e(n){"ngInject";t(this,e),this.$log=n,this._RELATION_KEY="clientConversationRelations",this._HISTORY_KEY="conversationHistory",this.clientConversationRelations={};try{this.clientConversationRelations=JSON.parse(localStorage.getItem(this._RELATION_KEY))||{}}catch(o){n.warn("Error occurred parsing clientConversationRelations from localStorage:",o)}}return e.$inject=["$log"],o(e,[{key:"clearAll",value:function(){var e=this;try{["_RELATION_KEY","_HISTORY_KEY"].forEach(function(n){return localStorage.removeItem(e[n])})}catch(n){}this.clientConversationRelations={}}},{key:"setCurrentClientId",value:function(e){this.currentClientId=e}},{key:"getConversationId",value:function(e){if(void 0===this.currentClientId)throw new Error("currentClientId for ConversationCacheService not set.");var n=[e,this.currentClientId].sort().join(" ");return this.clientConversationRelations[n]?this.clientConversationRelations[n]:null}},{key:"setConversationId",value:function(e,n){if(void 0===this.currentClientId)throw new Error("currentClientId for ConversationCacheService not set.");var t=[e,this.currentClientId].sort().join(" ");this.clientConversationRelations[t]=n;try{localStorage.setItem(this._RELATION_KEY,JSON.stringify(this.clientConversationRelations))}catch(o){this.$log.warn("Error occurred saving clientConversationRelations to localStorage:",o)}}},{key:"getConversationHistory",value:function(){var e=[];try{e=JSON.parse(localStorage.getItem(this._HISTORY_KEY))||[]}catch(n){this.$log.warn("Error occurred parsing conversationHistory from localStorage:",n)}return e}},{key:"setConversationHistory",value:function(){var e=void 0===arguments[0]?[]:arguments[0];try{e=localStorage.setItem(this._HISTORY_KEY,JSON.stringify(e))}catch(n){this.$log.warn("Error occurred saving conversationHistory from localStorage:",n)}}}]),e}();n["default"]=s,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),s="9p6hyhh60av3ukkni3i9z53q1l8yy3cijj6sie3cewft18vm",i=function(){function e(n,o){"ngInject";t(this,e),this.user={},this._connected=!1,this.rt=n,this.conversationCache=o}return e.$inject=["rt","conversationCache"],o(e,[{key:"isCached",value:function(){try{return null!==localStorage.getItem("user")}catch(e){return!1}}},{key:"cache",value:function(e){localStorage.setItem("user",JSON.stringify(e))}},{key:"getCachedInfo",value:function(){try{return JSON.parse(localStorage.getItem("user"))}catch(e){return void 0}}},{key:"login",value:function(e,n){var t={id:e,email:n};return this.user=t,console.log(t),this.cache(t),this.conversationCache.setCurrentClientId(e),this.connect(e)}},{key:"logout",value:function(){localStorage.removeItem("user"),this.close(),this._connected=!1}},{key:"isLoggedin",value:function(){return this._connected}},{key:"connect",value:function(e){return this._connected=!0,this.rt.connect({appId:s,clientId:e})}},{key:"close",value:function(){this.rt.close()}}]),e}();n["default"]=i,e.exports=n["default"]},function(e,n){"use strict";function t(e){"ngInject";return{transclude:!0,scope:{infiniteScroll:"&",infiniteScrollDistance:"="},template:"<div ng-transclude></div>",link:function(n,t){void 0===n.infiniteScrollDistance&&(n.infiniteScrollDistance=200);var o=!1,s=t.find(">div");t.on("scroll",function(){if(!o&&t.scrollTop()<n.infiniteScrollDistance){o=!0;var i=s.height(),a=n.infiniteScroll();!function(e){a&&"function"==typeof a.then?a.then(e):e()}(function(){return e(function(){t.scrollTop(t.scrollTop()+s.height()-i),o=!1},0)})}})}}}Object.defineProperty(n,"__esModule",{value:!0}),t.$inject=["$timeout"],n["default"]=t,e.exports=n["default"]},function(e,n){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(){"ngInject";return{restrict:"E",scope:{message:"=",previousMessage:"=",isMine:"="},templateUrl:"app/components/message/message.html",controller:s,controllerAs:"vm",bindToController:!0}}Object.defineProperty(n,"__esModule",{value:!0});var s=function i(){"ngInject";if(t(this,i),this.previousMessage&&this.previousMessage){var e=Math.floor(this.message.timestamp/6e4),n=Math.floor(this.previousMessage.timestamp/6e4);e!==n&&(this.displayTime=!0)}};n["default"]=o,e.exports=n["default"]}]),angular.module("leanmessageDemo").run(["$templateCache",function(e){e.put("app/conversation/conversation.html",'<md-sidenav class="menu md-sidenav-left md-whiteframe-z2" layout="column" ng-class="{ \'under-mask\': !conversation.isMenuOpen }" md-component-id="menu" md-is-open="conversation.isMenuOpen" md-is-locked-open="$mdMedia(\'gt-sm\')"><div flex="" layout="column" style="overflow:auto;"><div class="logo">LeanMessage</div><md-list flex=""><md-divider></md-divider><md-subheader class="md-no-sticky">群聊</md-subheader><md-list-item ng-repeat="conv in conversation.conversations | orderBy: \'-lastMessageTime\'" ng-if="conv.members.length > 2" ng-click="conversation.changeTo(conv.id)" ng-class="{\'active\': conv.id === conversation.currentConversation.id}"><p layout="row" layout-align="center center">{{::conv.name || \'广场 \' + conv.id.slice(-4) }} <span flex=""></span> <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span></p></md-list-item><md-divider></md-divider><md-subheader class="md-no-sticky">单聊</md-subheader><md-list-item ng-repeat="conv in conversation.conversations | orderBy: \'-lastMessageTime\'" ng-if="conv.members.length === 2" ng-click="conversation.changeTo(\'@\'+conversation.getSingleConvTarget(conv.members))" ng-class="{\'active\': conv.id === conversation.currentConversation.id}"><p layout="row" layout-align="center center">{{:: conversation.getSingleConvTarget(conv.members) }} <span flex=""></span> <span ng-if="conv.unreadMessagesCount" class="unreadCount">{{conv.unreadMessagesCount}}</span></p></md-list-item><div class="empty-list-hint" layout-padding="">群聊中点击对方 ID 开始单聊</div></md-list></div><md-divider></md-divider><div class="user" layout="" layout-align="center center" layout-padding=""><img gravatar-src-once="conversation.userService.user.email" gravatar-size="40"> <span flex="">{{::conversation.userService.user.id}}</span><md-button class="md-icon-button" aria-label="Logout" ng-click="conversation.logout()"><md-icon>exit_to_app</md-icon></md-button></div></md-sidenav><div layout="" flex="" ui-view=""></div>'),e.put("app/login/login.html",'<div class="login-container" layout="" layout-align="center center" flex=""><md-whiteframe class="md-whiteframe-z1 login-frame" layout="" layout-align="center center"><md-content layout-align="center center" flex=""><form name="loginForm" ng-submit="login.login()" layout="column" layout-align="center" flex=""><div class="logo">LeanMessage</div><md-input-container><label>ID</label> <input ng-model="login.user.id" required="" name="id"></md-input-container><md-input-container><label>Email（可选，仅用于显示头像）</label> <input ng-model="login.user.email" name="email"></md-input-container><md-button flex="">开始聊天</md-button></form></md-content></md-whiteframe></div>'),e.put("app/components/message/message.html",'<div ng-if="vm.displayTime" class="time">{{vm.message.timestamp | date:\'H:mm\'}}</div><div class="message" ng-class="{mine: vm.isMine}" layout="column"><div class="user" ng-if="!vm.isMine">{{ vm.message.from }}</div><div layout=""><md-icon ng-if="vm.message._state === \'sending\'" animation="fadeInOut">reply</md-icon><md-icon ng-if="vm.message._stats === \'failed\'">error</md-icon><div class="content" ng-class="{sending: vm.message._sending}">{{ vm.message.content.text }}</div></div></div>'),e.put("app/conversation/conversation-message/conversation-message.html",'<div flex="" layout="column"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Menu" hide-gt-sm="" ng-click="conversationMessage.toggle(\'menu\')"><md-icon>menu</md-icon></md-button><h2><span>{{ conversationMessage.conv.name || (conversationMessage.$state.params.clientId[0] === \'@\' ? conversationMessage.$state.params.clientId : (conversationMessage.conv.name || \'广场 \' + conversationMessage.conv.id.slice(-4))) }}</span></h2><span flex=""></span><md-button ng-if="conversationMessage.isGroupConversation" class="md-icon-button" aria-label="Online Clients" hide-gt-md="" ng-click="conversationMessage.toggle(\'online\')"><md-icon>group</md-icon></md-button></div></md-toolbar><md-content infinite-list="" infinite-scroll="conversationMessage.loadMore()" layout-padding="" flex="" class="messages"><div class="messages-wrapper"><message ng-repeat="(index, message) in conversationMessage.messages" message="message" ng-if="message" previous-message="conversationMessage.messages[index - 1]" is-mine="message.from === undefined || message.from == conversationMessage.user.user.id"></message><div id="message-view-bottom"></div></div></md-content><md-content layout="" layout-align="center center" class="editor-wrapper"><form class="editor" layout="" layout-align="center center" flex=""><md-input-container md-no-float="" flex="" class="textarea"><textarea ng-model="conversationMessage.currentconversationMessage.draft" placeholder="说点什么……"></textarea></md-input-container><md-button class="md-icon-button" aria-label="Send" ng-click="conversationMessage.send()"><md-icon>send</md-icon></md-button></form></md-content></div><md-sidenav id="online-aside" ng-if="conversationMessage.isGroupConversation" class="md-sidenav-right md-whiteframe-z2" md-component-id="online" md-is-locked-open="$mdMedia(\'gt-md\')" layout="column"><md-toolbar><div class="md-toolbar-tools"><md-button class="md-icon-button" aria-label="Back" hide-gt-sm="" ng-click="conversationMessage.close(\'online\')"><md-icon>arrow_back</md-icon></md-button><h2>在线用户 ({{conversationMessage.conv.members.length}})</h2><span flex=""></span><md-button class="md-icon-button" aria-label="Search" ng-click="conversationMessage.toggle(\'online-search\')"><md-icon>search</md-icon></md-button></div></md-toolbar><md-list class="square-clients" flex=""><md-list-item ng-repeat="client in conversationMessage.conv.members.slice(0, conversationMessage.maxResultsAmount)" ng-click="conversationMessage.changeTo(\'@\' + client)"><p>{{ client }}</p></md-list-item><p ng-if="conversationMessage.conv.members.length > conversationMessage.maxResultsAmount" class="max-results-amount-hint">最多显示 {{:: conversationMessage.maxResultsAmount }} 位在线用户</p></md-list></md-sidenav><md-sidenav id="online-aside" ng-if="conversationMessage.isGroupConversation" class="md-sidenav-right md-whiteframe-z2" md-component-id="online-search" layout="column"><form ng-submit="$event.preventDefault()"><div class="search-box" layout="" layout-align="center center"><md-button class="md-icon-button" aria-label="Back" ng-click="conversationMessage.close(\'online-search\')"><md-icon>arrow_back</md-icon></md-button><input type="text" flex="" ng-model="conversationMessage.queryString" ng-change="conversationMessage.query(conversationMessage.queryString)" placeholder="搜索在线用户" md-sidenav-focus=""><md-button class="md-icon-button" aria-label="Clear" ng-click="conversationMessage.clearQuery()" ng-hide="conversationMessage.queryString===\'\'"><md-icon>clear</md-icon></md-button></div><md-divider></md-divider></form><md-list class="result" flex=""><md-list-item ng-repeat="client in conversationMessage.queryClients.slice(0, conversationMessage.maxResultsAmount)" ng-click="conversationMessage.changeTo(\'@\' + client)"><p class="result-item">{{ client }}</p></md-list-item><p ng-if="conversationMessage.queryClients.length > conversationMessage.maxResultsAmount" class="max-results-amount-hint">最多显示 {{:: conversationMessage.maxResultsAmount }} 条结果</p></md-list></md-sidenav>')}]);