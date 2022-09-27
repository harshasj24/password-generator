import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const encrypt = (data) => {
  const cyphertext = CryptoJS.AES.encrypt(JSON.stringify(data)).toString();
  return cyphertext;
};
const decrypt = (cyphertext) => {
  const bytes = CryptoJS.AES.decrypt(cyphertext);
  const originalData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalData;
};
export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const localStorageVal = localStorage.getItem(key);
      if (localStorageVal) {
        return JSON.parse(localStorageVal);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });
  const setNewValue = (newValue) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
  };
  return [value, setNewValue];
};
