function MessageDirective() {
  'ngInject';

  return {
    restrict: 'E',
    scope: {
      message: '=',
      previousMessage: '='
    },
    templateUrl: 'app/components/message/message.html',
    link: (scope, elem) => {
      elem.addClass('message');
    },
    controller: MessageController,
    controllerAs: 'vm',
    bindToController: true
  };
}

class MessageController {
  constructor() {
    'ngInject';
    console.log(this.message.timestamp);
    if (this.previousMessage) {
      var thisMinute = Math.floor(this.message.timestamp / 60000);
      var previousMinute = Math.floor(this.previousMessage.timestamp / 60000);
      if (thisMinute !== previousMinute) {
          this.displayTime = true;
        }
      }
    }
  }

  export default MessageDirective;