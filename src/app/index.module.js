/* global md5:false, moment:false, AV:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import ConversationController from './conversation/conversation.controller';
import ConversationMessageController from './conversation/conversation-message/conversation-message.controller';
import LoginController from './login/login.controller';
import LeancloudRealtimeService from './components/leancloud-realtime/leancloud-realtime.service';
import ConversationCacheService from './components/conversation-cache/conversation-cache.service';
import UserService from './components/user/user.service';

angular.module('leanmessageDemo', ['ngResource', 'ui.router', 'ngMaterial', 'ui.gravatar'])
  .constant('moment', moment)
  .constant('md5', md5)
  .constant('realtime', AV.realtime)
  .constant('defaultConversation', {
    name: '广场',
    id: '551a2847e4b04d688d73dc54'
  })
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('rt', LeancloudRealtimeService)
  .service('conversationCache', ConversationCacheService)
  .service('user', UserService)
  .controller('ConversationController', ConversationController)
  .controller('ConversationMessageController', ConversationMessageController)
  .controller('LoginController', LoginController);
