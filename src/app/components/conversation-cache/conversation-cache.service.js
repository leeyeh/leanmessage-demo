class ConversationCacheService {
  constructor($log) {
    'ngInject';
    this.$log = $log;
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
    if (this.clientConversationRelations[key]) {
      return this.clientConversationRelations[key];
    }
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
