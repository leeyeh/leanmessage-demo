function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('conversation', {
      abstract: true,
      url: '/conversations',
      templateUrl: 'app/conversation/conversation.html',
      controller: 'ConversationController',
      controllerAs: 'conversation'
    })
    .state('conversation.message', {
      url: '/:clientId',
      templateUrl: 'app/conversation/conversation-message/conversation-message.html',
      controller: 'ConversationMessageController',
      controllerAs: 'conversationMessage'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });

  $urlRouterProvider.otherwise('/conversations/广场');
}

export default routerConfig;
