import React, { Suspense, FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store, persistor } from "./redux/store/store";
import { Router, View } from "react-navi";
import { routes } from "./routes";
import { State } from "./redux/reducers";

import "./style/index.css";
import styles from "./style/index.module.css";

import { Menu } from "./components/Menu";

interface Props {
  sortType?: string;
  sortDirection: number;
}

const AppContainer: FunctionComponent<Props> = ({
  sortType = "date",
  sortDirection
}) => {
  return (
    <Router routes={routes} context={{ sortType, sortDirection }}>
      <main className={styles.app}>
        <Menu />
        <Suspense fallback={null}>
          <section className={styles.main}>
            <View />
          </section>
        </Suspense>
      </main>
    </Router>
  );
};

const mapStateProps = (state: State) => {
  return {
    sortType: state.sortTypeReducer.sortType,
    sortDirection: state.sortTypeReducer.sortDirection
  };
};

const App = connect(mapStateProps)(AppContainer);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
