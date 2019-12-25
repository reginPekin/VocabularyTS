import React, { FunctionComponent, useState } from "react";

import { InputButton } from "./components/InputButton";
import { Popup } from "./components/Popup";

interface Props {
  name?: string;
  sername: string;
}

const App: FunctionComponent<Props> = ({ name = "Ja-ja", sername }) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="App">
      <p>
        Hi, {name} {sername}
        <InputButton
          changeVisibility={value => setIsVisible(value)}
          isVisible={isVisible}
          onChange={value => console.log(value)}
          text="Hi"
        />
      </p>
      <Popup
        isVisible={isVisible}
        changeVisibility={() => setIsVisible(!isVisible)}
      >
        Hello
      </Popup>
    </div>
  );
};

export default App;
