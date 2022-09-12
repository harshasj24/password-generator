import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const passwordCotext = createContext();

export const ContextProvider = ({ children }) => {
  const [sliderVal, setSliderVal] = useState(12);
  const [password, setPassword] = useState("");

  const copyToClipBoard = (text) => {
    window.navigator.clipboard.writeText(text);
  };

  const values = useMemo(() => {
    return {
      password,
      setPassword,
      sliderVal,
      setSliderVal,
      copyToClipBoard,
    };
  });

  return (
    <div>
      <passwordCotext.Provider value={values}>
        {children}
      </passwordCotext.Provider>
    </div>
  );
};

export const usePassword = () => {
  return useContext(passwordCotext);
};
