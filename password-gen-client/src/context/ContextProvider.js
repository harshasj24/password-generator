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
  const [breakPoint, setBreakPoint] = useState(null);
  const [isLoading, setisloading] = useState(false);
  const breakPoints = {
    mobile: "(max-width:600px)",
    tablet: "(min-width:600px) and (max-width:960px)",
    laptop: "(min-width:960px) and (max-width:1023px)",
    desktop: "(min-width:1024px)",
  };

  const copyToClipBoard = (text) => {
    window.navigator.clipboard.writeText(text);
  };

  const matchMediaQuerry = (breakPoints, setBreakPoint) => {
    Object.keys(breakPoints).map((key) => {
      if (window.matchMedia(breakPoints[key]).matches) {
        setBreakPoint(key);
      }
    });
  };

  const breakPointObserver = () => {
    window.addEventListener("resize", () => {
      matchMediaQuerry(breakPoints, setBreakPoint);
    });
  };

  const values = useMemo(() => {
    return {
      password,
      setPassword,
      sliderVal,
      setSliderVal,
      copyToClipBoard,
      breakPointObserver,
      breakPoint,
      isLoading,
      setisloading,
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
