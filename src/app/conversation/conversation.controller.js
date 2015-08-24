class ConversationController {
  constructor($mdSidenav, user, $state, $mdToast, rt, conversationCache, defaultConversation) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.userService = user;
    this.$state = $state;
    this.conversationCache = conversationCache;

    this.defaultConversation = defaultConversation;

    // this.conversations = conversationCache.getConversationHistory();

    this.isMenuOpen = undefined;

    rt.getMyConvs().then((convs) => {
      this.conversations = convs;
      if (convs.length === 0) {
        rt.conv(defaultConversation.id).then((conv) => {
          this.conversations.push(conv);
          $mdToast.show(
            $mdToast.simple()
            .content(`欢迎使用 LeanMessage，自动加入默认群聊（${conv.name}）`)
            .position('top right')
          );
        });
      }
    });

    // FIXME: 这里的事件错了，应该是莫个对话收到或发出了新消息之后调整顺序
    // $rootScope.$on('$stateChangeSuccess', (event, next) => {
    //   if (next.name !== 'conversation.message') {
    //     return;
    //   }
    //   if ($state.params.clientId[0] !== '@') {
    //     return;
    //   }
    //   var clientId = $state.params.clientId.slice(1);
    //   var index = this.conversations.indexOf(clientId);
    //   if (index === -1) {
    //     this.conversations.unshift(clientId);
    //   } else {
    //     this.conversations = [clientId]
    //       .concat(this.conversations.slice(0, index))
    //       .concat(this.conversations.slice(index + 1));
    //   }
    //   console.log(clientId, index, this.conversations);
    // });

  }

  getSingleConvTarge(members) {
    if (members[0] === this.userService.user.id) {
      return members[1];
    } else {
      return members[0];
    }
  }

  changeTo(clientId) {
    this.$state.go('conversation.message', {
      clientId: clientId
    });
    this.close('menu');
  }

  toggle(id) {
    this.$mdSidenav(id).toggle();
  }
  close(id) {
    this.$mdSidenav(id).close();
  }

  logout() {
    this.conversationCache.clearAll();
    this.userService.logout();
    this.$state.go('login');
  }

}

export default ConversationController;
