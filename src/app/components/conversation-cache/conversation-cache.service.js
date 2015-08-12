class ConversationCacheService {
  constructor($log) {
    'ngInject';
    this.$log = $log;
    this._STORAGE_KEY = 'clientConversationRelations';
    this.clientConversationRelations = {};
    try {
      this.clientConversationRelations = JSON.parse(localStorage.getItem(this._STORAGE_KEY)) || {};
    } catch (e) {
      $log.warn('Error occurred parsing clientConversationRelations from localStorage:', e);
    }

  }

  setCurrentClientId(id) {
    this.currentClientId = id;
  }

  get(clientId) {
    if (this.currentClientId === undefined) {
      throw new Error('currentClientId for ConversationCacheService not set.');
    }
    var key = [clientId, this.currentClientId].sort().join(' ');
    if (this.clientConversationRelations[key]) {
      return this.clientConversationRelations[key];
    }
    return null;
  }

  set(clientId, conversationId) {
    if (this.currentClientId === undefined) {
      throw new Error('currentClientId for ConversationCacheService not set.');
    }
    var key = [clientId, this.currentClientId].sort().join(' ');
    this.clientConversationRelations[key] = conversationId;
    try {
      localStorage.setItem(this._STORAGE_KEY, JSON.stringify(this.clientConversationRelations));
    } catch (e) {
      this.$log.warn('Error occurred saving clientConversationRelations to localStorage:', e);
    }
  }
}


export default ConversationCacheService;
