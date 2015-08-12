class ConversationMessageController {
  constructor($mdSidenav, user, $state, $scope, rt, conversationCache, defaultConversation) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.userService = user;
    this.$state = $state;

    this.queryString = '';
    this.queryClients = [];

    this.defaultConversation = defaultConversation;
    this.maxResultsAmount = 64;

    var conversationRoute = $state.params.clientId;
    this.isGroupConversation = false;

    var conversationPromise, conversationId;

    if (conversationRoute[0] === '@' && conversationRoute.length > 1) {
      // 单聊
      var clientId = conversationRoute.slice(1);
      conversationId = conversationCache.get(clientId);

      console.log(conversationId);
      if (conversationId === null) {
        // 新建一个对话
        conversationPromise = rt.conv({
          members: [clientId]
        });
        // 写入 cache
        conversationPromise.then((conv) => conversationCache.set(clientId, conv.id));
      } else {
        // 获取一个已存在的对话
        conversationPromise = rt.conv(conversationId);
      }
    } else if (conversationRoute.match(/^[0-9a-f]{24}$/)) {
      // 群聊
      this.isGroupConversation = true;
      conversationId = conversationRoute;
      conversationPromise = rt.conv(conversationId);
    } else {
      this.name = '404';
    }

    if (conversationPromise) {
      // 将 conversation 与当前 controller 绑定
      conversationPromise.then((conv) => {
        this.conv = conv;
        $scope.$on('$destroy', () => conv.destroy());
        $scope.$digest();
      }.bind(this));
    }

  }

  send(message) {
    console.log(message);
  }

  query(queryString) {
    var result = queryString ? this.conv.members.filter(this.createFilterFor(queryString)) : this.conv.members;
    this.queryClients = result;
  }
  createFilterFor(queryString) {
    var lowercaseQuery = angular.lowercase(queryString);
    return function filterFn(state) {
      return (state.indexOf(lowercaseQuery) !== -1);
    };
  }
  clearQuery() {
    this.queryString = '';
    this.query();
  }

  changeTo(clientId) {
    this.$state.go('conversation.message', {
      clientId: clientId
    });
    this.closeAll();
  }

  toggle(id) {
    this.$mdSidenav(id).toggle();
  }
  close(id) {
    this.$mdSidenav(id).close();
  }
  closeAll() {
    ['online', 'online-search'].map((id) => this.close(id));
  }

}

export default ConversationMessageController;
