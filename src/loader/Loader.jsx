import { useContext } from "react";
import "./loader.css";
import { LoaderContext } from "./LoaderContext";

const Loader = () => {
  const { isLoading } = useContext(LoaderContext);
  if (isLoading) {
    return (
      <div className="loader__wrapper">
        <div className="loader"> </div>
      </div>
    );
  }
};

export default Loader;