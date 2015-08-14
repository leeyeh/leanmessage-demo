class ConversationMessageController {
  constructor($mdSidenav, user, $state, $scope, $q, rt, conversationCache, defaultConversation) {
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
    this.messages = [];

    var conversationPromise, conversationId;

    if (conversationRoute[0] === '@' && conversationRoute.length > 1) {
      // 单聊
      var clientId = conversationRoute.slice(1);
      conversationId = conversationCache.getConversationId(clientId);

      if (conversationId === null) {
        // 新建一个对话
        conversationPromise = rt.conv({
          members: [clientId]
        });
        // 写入 cache
        conversationPromise.then((conv) => conversationCache.setConversationId(clientId, conv.id));
      } else {
        // 获取一个已存在的对话
        conversationPromise = rt.conv(conversationId);
      }
    } else if (conversationRoute.match(/^[0-9a-f]{24}$/)) {
      // 群聊
      this.isGroupConversation = true;
      conversationId = conversationRoute;
      conversationPromise = rt.conv(conversationId).then(
        (conv) => conv.join().then(
          () => $q.resolve(conv)
        )
      );
    } else if (conversationRoute === '') {
      this.changeTo(defaultConversation.id, {
        location: 'replace'
      });
    } else {
      conversationPromise = $q.reject(new Error('404: Illegal id in URI'));
    }

    if (conversationPromise) {
      // 将 conversation 与当前 controller 绑定
      conversationPromise.then((conv) => {
        this.conv = conv;
        conv.log().then((messages) => this.messages = messages.concat(this.messages));
        conv.on('message', (message) => this.messages.push(message));
        $scope.$on('$destroy', () => conv.destroy());
      }.bind(this)).catch((e) => {
        // 将异常信息显示在页面上
        this.conv = {
          name: '👻' + e.message
        };
      }.bind(this));
    }

  }

  send() {
    this.conv.send({
      text: this.currentconversationMessage.draft
    }, {
      type: 'text'
    }).then((message) => {
      console.log(message);
      this.messages.push(message);
    });
    this.currentconversationMessage.draft = '';
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

  changeTo(clientId, options) {
    this.$state.go('conversation.message', {
      clientId: clientId
    }, options);
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
