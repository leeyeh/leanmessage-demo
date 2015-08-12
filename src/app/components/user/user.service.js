var appId = '9p6hyhh60av3ukkni3i9z53q1l8yy3cijj6sie3cewft18vm';

class UserService {
  constructor(rt, conversationCache) {
    'ngInject';

    this.user = {};
    this._connected = false;
    this.rt = rt;
    this.conversationCache = conversationCache;
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
    this.conversationCache.setCurrentClientId(id);

    return this.connect(id);
  }

  isLoggedin() {
    return this._connected;
  }
  connect(clientId) {
    this._connected = true;
    return this.rt.connect({
      appId: appId,
      clientId: clientId
    });
  }
}

export default UserService;
