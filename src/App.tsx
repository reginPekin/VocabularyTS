import React, { FunctionComponent } from "react";

import { Button } from "./components/Button";

interface Props {
  name?: string;
  sername: string;
}

const App: FunctionComponent<Props> = ({ name = "Ja-ja", sername }) => {
  return (
    <div className="App">
      <p>
        Hi, {name} {sername}
        <Button onClick={() => alert("Hi")}>
          <section>
            <span> Add folder </span>
          </section>
        </Button>
      </p>
    </div>
  );
};

export default App;
