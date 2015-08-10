class ConversationMessageController {
  constructor(user) {
    'ngInject';

    this.userService = user;
  }

  send(message) {
    console.log(message);
  }

}

export default ConversationMessageController;
