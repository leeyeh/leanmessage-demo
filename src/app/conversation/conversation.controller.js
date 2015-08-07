class ConversitionController {
  constructor($mdSidenav, user, $state) {
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.userService = user;
    this.$state = $state

    this.squareConversition = {};
    this.squareClients = ['hjiang', 'jfeng', 'jxi', 'bobama'];
    this.conversations = ['vputin', 'jxi', 'bobama'];

    this.queryString = '';
    this.queryClients = [];

    this.isOnlineOpen = undefined;
    this.isSearchOpen = undefined;
  }

  toggle(id) {
    this.$mdSidenav(id).toggle();
  }
  close(id) {
    this.$mdSidenav(id).close();
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

export default ConversitionController;
