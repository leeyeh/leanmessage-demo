class LeancloudRealtimeService {
  constructor($rootScope, realtime) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.realtime = realtime;
    this._connectPromise = null;
  }

  connect(options, callback) {
    this._connectPromise = new Promise((resolve) => {
      this.realtimeInstance = this.realtime(options, (data) => {
        if (typeof callback === 'function') {
          callback(data);
        }
        this.$rootScope.$digest();
        resolve(data);
      });
    });
    return this._connectPromise;
  }
  _waitForConnect() {
    if (!this._connectPromise) {
      throw new Error('LeancloudRealtimeService.connect() never called.');
    } else {
      return this._connectPromise;
    }
  }

  on(event, callback) {
    this.realtimeInstance.on(event, (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
      this.$rootScope.$digest();
    });
  }

  once(event, callback) {
    this.realtimeInstance.once(event, (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
      this.$rootScope.$digest();
    });
  }

  off(...args) {
    this.realtimeInstance.off(...args);
  }

  emit(...args) {
    this.realtimeInstance.emit(...args);
  }

  room(options, callback) {
    return this._waitForConnect().then(() => new Promise((resolve) =>
      this.realtimeInstance.room(options, (originalConversation) => {
        new Conversation(originalConversation, this.$rootScope).then((conversation) => {
          if (typeof callback === 'function') {
            callback(conversation);
          }
          resolve(conversation);
          this.$rootScope.$digest();
        });
      })
    ));
  }

  conv(...args) {
    return this.room(...args);
  }
}

class Conversation {
  constructor(originalConversation, $rootScope) {
    this.originalConversation = originalConversation;
    this.$rootScope = $rootScope;

    [
      'id',
      'name',
      'attr'
    ].forEach((prop) => this[prop] = originalConversation[prop]);

    // TODO: members 应该是由 SDK 来维护的
    // SDK 中的 Conversation 封装把 members 等初始化的时候就能拿到的 members 信息都丢掉了
    // 这里只能异步再取一次
    return new Promise((resolve) => {
      this._list().then((members) => {
        this.members = members;
        resolve(this);
      });
    });
  }

  // members 变成属性由 service 来维护，用户不再需要 list 方法
  _list() {
    return new Promise((resolve) => {
      this.originalConversation.list((members) => {
        console.log(members);
        resolve(members);
        this.$rootScope.$digest();
      });
    });
  }
  destroy() {
    // TODO: implement SDK 中的 Conversation::off 方法
    console.log('destroy');
  }
}

export default LeancloudRealtimeService;
