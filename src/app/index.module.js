/* global md5:false, moment:false, AV:false */
import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import ConversationController from './conversation/conversation.controller';
import LoginController from './login/login.controller';
import LeancloudRealtimeService from '../app/components/leancloudRealtime/leancloudRealtime.service';
import UserService from '../app/components/user/user.service';

angular.module('leanmessageDemo', ['ngResource', 'ui.router', 'ngMaterial', 'ui.gravatar'])
  .constant('moment', moment)
  .constant('md5', md5)
  .constant('realtime', AV.realtime)
  .config(config)

  .config(routerConfig)

  .run(runBlock)
  .service('rt', LeancloudRealtimeService)
  .service('user', UserService)
  .controller('ConversationController', ConversationController)
  .controller('LoginController', LoginController);
