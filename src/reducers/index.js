import {
    createReactNavigationReduxMiddleware, createReduxContainer
  } from 'react-navigation-redux-helpers';
  import { NavigationActions } from 'react-navigation';
  import { connect } from 'react-redux';
  import createSagaMiddleware from 'redux-saga';
  import { createStore, applyMiddleware, combineReducers } from 'redux';
  import AppNavigator from '../navigators/AppNavigator';
  import sagas from '../sagas';
  import { SagaReducer } from './SagaReducer';
  
  const initialNavState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'));
  
  const NavReducer = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
      case 'RES_SIGNIN':
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'NewsList' }),
          state
        );
        break;
      default:
        nextState = AppNavigator.router.getStateForAction(action, state);
        break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
  };
  
  const appReducer = combineReducers({
    nav: NavReducer,
    saga: SagaReducer
  });
  
  // Create Middleware
  const middleware = createReactNavigationReduxMiddleware(
    state => state.nav
  );
  
  const sagaMiddleware = createSagaMiddleware();
  
  const App = createReduxContainer(AppNavigator);
  const mapStateToProps = (state) => ({
    state: state.nav
  });
  const AppWithNavigationState = connect(mapStateToProps)(App);
  
  // Create Store
  const store = createStore(
    appReducer,
    applyMiddleware(middleware, sagaMiddleware)
  );
  
  sagaMiddleware.run(sagas);
  
  export { store, AppWithNavigationState };
  