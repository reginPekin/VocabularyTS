import React, { FunctionComponent } from "react";

import { Button } from "./components/Button";

import styles from "./App.module.css";

interface Props {
  name?: string;
  sername: string;
}

const App: FunctionComponent<Props> = ({ name = "Ja-ja", sername }) => {
  return (
    <div className="App">
      <p>
        Hi, {name} {sername}
        <Button
          onClick={() => alert("Hi")}
          buttonClassName={styles.newFolderButton}
        >
          <section className={styles.span}>
            <span> Add folder </span>
          </section>
        </Button>
      </p>
    </div>
  );
};

export default App;
