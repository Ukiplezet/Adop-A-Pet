import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Puff } from "react-loader-spinner";

function Spinner() {
  return (
    <Puff
      type="Puff"
      color="rgba(7, 190, 68, 0.733)"
      height={200}
      width={200}
    />
  );
}

export default Spinner;
