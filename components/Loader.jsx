import React from "react";
import "../styles/components/loader.css";
import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="loader">
      <ClipLoader
        color="#fff"
        aria-label="Loading Spinner"
        data-testid="loader"
        className="loader"
      />
    </div>
  );
}
