import "./App.css";

import React, { useState } from "react";
import bs58 from "bs58";
import "./styles.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const handleConvert = () => {
    try {
      if (inputValue?.includes(",")) {
        const encoded = bs58.encode(
          new Uint8Array(
            inputValue.replace("[", "")?.replace("]")?.split(",")?.map(Number)
          )
        );
        setOutputValue(encoded);
      } else {
        const decoded = bs58.decode(inputValue);
        const result = Array.from(decoded).join(", ");
        setOutputValue(`[${result}]`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="title">Byte/String Converter</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter bytes or string"
        className="input"
      />
      <button onClick={handleConvert} className="button">
        Convert
      </button>
      <div className="output">
        <h3 className="output-title">Output:</h3>
        <p className="output-value">{outputValue}</p>
      </div>
    </div>
  );
}

export default App;
