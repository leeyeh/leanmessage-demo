class LeancloudRealtimeService {
  constructor($rootScope, realtime) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.realtime = realtime;
  }

  connect(options, callback) {
    this.realtimeInstance = this.realtime(options, (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
      this.$rootScope.$digest();
    });
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
    this.realtimeInstance.room(event, (data) => {
      if (typeof callback === 'function') {
        callback(data);
      }
      this.$rootScope.$digest();
    });
  }

  conv(...args) {
    this.room(...args);
  }
}

export default LeancloudRealtimeService;
