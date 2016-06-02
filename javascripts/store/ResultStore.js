import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _store = {
  list: []
};

function create(result) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _store.list.splice(0, 0, {
        id: id,
        result: result
    })
}

class ResultListStore extends EventEmitter {
    getAll() {
        return _store;
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * @param {function} callback
     */
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     * @param {function} callback
     */
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const ResultsStore = new ResultListStore();

AppDispatcher.register(function(action) {
  var result;

  switch(action.actionType) {
    case 'create':
      result = action.result;
      if (result !== '') {
        create(result);
        ResultsStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

export default ResultsStore;