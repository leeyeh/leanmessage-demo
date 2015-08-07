var appId = '9p6hyhh60av3ukkni3i9z53q1l8yy3cijj6sie3cewft18vm';

class UserService {
  constructor(rt) {
    'ngInject';

    this.user = {};
    this._connected = false;
    this.rt = rt;
  }

  isCached() {
    try {
      return localStorage.getItem('user') !== null;
    } catch (e) {
      return false;
    }
  }

  cache(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getCachedInfo() {
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch (e) {
        return undefined;
      }
  }

  login(id, email) {
    var user = {
      id: id,
      email: email
    };

    this.user = user;
    console.log(user);
    this.cache(user);

    return this.connect(id);
  }

  isLoggedin() {
    return this._connected;
  }
  connect(clientId) {
    return new Promise(function (resolve) {
      this._connected = true;
      this.rt.connect({
        appId: appId,
        clientId: clientId
      }, () => {
        resolve();
      });

      // TODO: SDK 在断线重连时也会派发 open 与 close 事件，在区分断线重连之前无法判断真正的链接断开时机
      // this.rt.on('close', () => {});
    }.bind(this));
  }
}

export default UserService;
