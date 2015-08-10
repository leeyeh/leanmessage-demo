class ConversationController {
  constructor($mdSidenav, user, $state) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.userService = user;
    this.$state = $state;

    this.defaultConversation = {
      name: '广场',
      id: '551a2847e4b04d688d73dc54'
    };

    this.squareConversation = {};
    this.squareClients = ['hjiang', 'jfeng', 'jxi', 'bobama'];
    this.conversations = ['vputin', 'jxi', 'bobama'];

    this.queryString = '';
    this.queryClients = [];

    this.isOnlineOpen = undefined;
    this.isSearchOpen = undefined;
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
    ['menu', 'online', 'online-search'].map((id) => this.close(id));
  }

  query(queryString) {
    var result = queryString ? this.squareClients.filter(this.createFilterFor(queryString)) : this.squareClients;
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
  }
}

export default ConversationController;
