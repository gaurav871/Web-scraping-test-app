import { Circles } from "react-loader-spinner";
import React from "react";

const ProgressSpinner = () => {
  return (
    <Circles
      height="120"
      width="120"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default ProgressSpinner;
