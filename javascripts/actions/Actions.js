import AppDispatcher from '../dispatcher/AppDispatcher';

class AppAction {
    create(result) {
        AppDispatcher.dispatch({
            actionType: 'create',
            result: result
        });
    }
}

const Actioin = new AppAction();

export default Actioin;