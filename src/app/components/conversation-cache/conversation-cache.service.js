class ConversationCacheService {
  constructor($log, rt) {
    'ngInject';
    this.$log = $log;
    this.rt = rt;
    this._RELATION_KEY = 'clientConversationRelations';
    this._HISTORY_KEY = 'conversationHistory';
    this.clientConversationRelations = {};
    try {
      this.clientConversationRelations = JSON.parse(localStorage.getItem(this._RELATION_KEY)) || {};
    } catch (e) {
      $log.warn('Error occurred parsing clientConversationRelations from localStorage:', e);
    }

  }

  clearAll() {
    try {
      [
        '_RELATION_KEY',
        '_HISTORY_KEY'
      ].forEach((key) => localStorage.removeItem(this[key]));
    } catch (e) {}
    this.clientConversationRelations = {};
  }

  setCurrentClientId(id) {
    this.currentClientId = id;
  }

  getConversationId(clientId) {
    if (this.currentClientId === undefined) {
      throw new Error('currentClientId for ConversationCacheService not set.');
    }
    var key = [clientId, this.currentClientId].sort().join(' ');
    // 先从 localstorage 中查询
    if (this.clientConversationRelations[key]) {
      return this.clientConversationRelations[key];
    }
    // 然后查 server
    this.rt.queryConvs({
      where: {
        m: {
          $size: 2,
          $all: [clientId, this.currentClientId],
        }
      }
    }).then((convs) => console.log(1, convs));
    return null;
  }

  setConversationId(clientId, conversationId) {
    if (this.currentClientId === undefined) {
      throw new Error('currentClientId for ConversationCacheService not set.');
    }
    var key = [clientId, this.currentClientId].sort().join(' ');
    this.clientConversationRelations[key] = conversationId;
    try {
      localStorage.setItem(this._RELATION_KEY, JSON.stringify(this.clientConversationRelations));
    } catch (e) {
      this.$log.warn('Error occurred saving clientConversationRelations to localStorage:', e);
    }
  }

  getConversationHistory() {
    var conversationHistory = [];
    try {
      conversationHistory = JSON.parse(localStorage.getItem(this._HISTORY_KEY)) || [];
    } catch (e) {
      this.$log.warn('Error occurred parsing conversationHistory from localStorage:', e);
    }
    return conversationHistory;
  }

  setConversationHistory(conversationHistory = []) {
    try {
      conversationHistory = localStorage.setItem(this._HISTORY_KEY, JSON.stringify(conversationHistory));
    } catch (e) {
      this.$log.warn('Error occurred saving conversationHistory from localStorage:', e);
    }
  }
}


export default ConversationCacheService;
