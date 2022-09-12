import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../context/AuthProvider";
const vaultContex = createContext();

export const VaultProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const { user } = useAuth();
  const [updatePass, setUpdatePass] = useState({
    isUpdating: false,
    _id: null,
  });
  useEffect(() => {
    console.log(user, "effect");
  }, [user]);

  const headers = user && {
    Authorization: "barrer " + user.token,
  };

  const savePassword = async (PasswordDetails) => {
    try {
      const repsonce = await axios.post(
        "http://localhost:4500/vault/savePasswords",
        { ...PasswordDetails, _id: user.id },
        {
          headers: headers,
        }
      );
      const newPassword = {
        ...PasswordDetails,
        _id: repsonce.data.data._id,
        date: repsonce.data.data.date,
        password: repsonce.data.data.cipherText,
      };

      setPasswords([...passwords, newPassword]);
    } catch (error) {
      console.log(error);
    }
  };
  const isUpdating = ({ isUpdating, _id }) => {
    setUpdatePass({
      ...updatePass,
      isUpdating: isUpdating,
      _id: _id,
    });
  };

  const updatePassword = async (password) => {
    const reqData = {
      password,
      _id: updatePass._id,
    };
    const responece = await axios.post(
      "http://localhost:4500/vault/updatePassword",
      reqData,
      {
        headers: headers,
      }
    );

    const index = passwords.findIndex((data) => {
      return data._id === updatePass._id;
    });
    console.log(index);

    const newPasswords = [...passwords];
    newPasswords[index] = {
      ...newPasswords[index],
      password: responece.data.data.cipherText,
      date: responece.data.data.date,
    };

    setPasswords([...newPasswords]);
  };

  const getAllPasswords = async () => {
    console.log(user);
    try {
      if (passwords.length === 0) {
        const repsonce = await axios.get(
          `http://localhost:4500/vault/password/${user.id}`,
          {
            headers: headers,
          }
        );
        console.log(repsonce);

        setPasswords(repsonce.data.data);
      }
    } catch (error) {
      console.log(error);
      setPasswords([]);
    }
  };

  const values = useMemo(() => {
    return {
      passwords,
      setPasswords,
      savePassword,
      getAllPasswords,
      updatePass,
      isUpdating,
      updatePassword,
      headers,
    };
  }, [passwords, updatePass, user]);

  return <vaultContex.Provider value={values}>{children}</vaultContex.Provider>;
};

export const useVault = () => {
  return useContext(vaultContex);
};
