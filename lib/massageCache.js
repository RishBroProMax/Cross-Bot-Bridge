class MessageCache {
    constructor(size) {
      this.size = size;
      this.cache = new Map();
    }
  
    addMessage(id, message) {
      if (this.cache.size >= this.size) {
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
      this.cache.set(id, message);
    }
  
    getMessage(id) {
      return this.cache.get(id);
    }
  
    hasMessage(id) {
      return this.cache.has(id);
    }
  
    clear() {
      this.cache.clear();
    }
  }
  
  module.exports = MessageCache;