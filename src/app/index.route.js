function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('conversation', {
      url: '/',
      templateUrl: 'app/conversation/conversation.html',
      controller: 'ConversationController',
      controllerAs: 'conversation'
    })
    .state('conversation.conversations', {
      url: 'conversations/:clientId',
      templateUrl: 'app/conversation/conversation.html',
      controller: 'ConversationController',
      controllerAs: 'conversation'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login'
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
