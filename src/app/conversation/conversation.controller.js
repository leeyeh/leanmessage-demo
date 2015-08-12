class ConversationController {
  constructor($mdSidenav, user, rt, $state, defaultConversation) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.userService = user;
    this.rt = rt;
    this.$state = $state;

    this.defaultConversation = defaultConversation;

    this.conversations = ['vputin', 'jxi', 'bobama'];

    this.isMenuOpen = undefined;

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

}

export default ConversationController;
