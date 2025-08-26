import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoading = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (data) => setIsLoading(data);

  return (
    <LoaderContext.Provider value={{ isLoading, handleLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export { LoaderContext };
