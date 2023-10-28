import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import environemnt from "../environments/environment";
const vaultContex = createContext();
export const VaultProvider = ({ children }) => {
  const [passwords, setPasswords] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const baseUrl = environemnt.apiUrl;
  const [updatePass, setUpdatePass] = useState({
    action: null,
    isUpdating: false,
    _id: null,
    pName: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [modalDetails, setModalDetails] = useState({
    open: false,
    _id: null,
    type: "",
  });

  const handleModalDetails = (details) => {
    setModalDetails({ ...modalDetails, ...details });
  };

  const handleSnackbar = (open, message) => {
    setSnackbar({ ...snackbar, open: open, message: message });
  };
  const [slectedId, setSelectedId] = useState(null);
  useEffect(() => {
    console.log(user, "effect");
  }, [user]);

  const headers = user && {
    Authorization: "barrer " + user.token,
  };

  const savePassword = async (PasswordDetails) => {
    try {
      const repsonce = await axios.post(
        `${baseUrl}/vault/savePasswords`,
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
        status: repsonce.data.data.status,
      };

      setPasswords([...passwords, newPassword]);
    } catch (error) {
      console.log(error);
    }
  };
  const isUpdating = (details) => {
    setUpdatePass({
      ...updatePass,
      ...details,
    });
  };
  const resetUpdating = () => {
    setUpdatePass({
      ...updatePass,
      isUpdating: false,
      _id: null,
      pName: "",
    });
  };
  const updatePassword = async (passwordDetails) => {
    const { password, pName } = passwordDetails;
    const reqData = {
      password,
      _id: updatePass._id,
      pName,
    };
    const responece = await axios.put(
      `${baseUrl}/vault/updatePassword`,
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
      status: responece.data.data.status,
      pName,
    };
    setPasswords([...newPasswords]);
    handleSnackbar(true, "Password Updated Sucessfully");
  };

  const getAllPasswords = async () => {
    try {
      if (passwords.length === 0) {
        const repsonce = await axios.get(
          `${baseUrl}/vault/password/${user?.id}`,
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
  // validatePassword
  const checkPassword = async (data) => {
    try {
      const responce = await axios.post(
        `${baseUrl}/users/validatePassword`,
        data,
        {
          headers: headers,
        }
      );
      return responce;
    } catch (error) {
      if (error.status === 403) {
        navigate("/access");
      }
      return false;
    }
  };

  const deletePassword = async () => {
    try {
      const responce = await axios.delete(
        `${baseUrl}/vault/delete/${updatePass._id}`,
        {
          headers: headers,
        }
      );
      const newPasswords = [...passwords].filter(
        (val) => val._id !== updatePass._id
      );
      setPasswords(newPasswords);
      handleSnackbar(true, "Password Deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const loopElements = (range, element) => {
    for (let i = 0; i < range; i++) {
      console.log(i, range, "vault");
      return element;
    }
  };

  const getOnePassword = async (_id) => {
    const responce = await axios.get(`${baseUrl}/vault/getPassword/${_id}`, {
      headers: headers,
    });
    return responce;
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
      resetUpdating,
      checkPassword,
      slectedId,
      setSelectedId,
      deletePassword,
      pName: updatePass.pName,
      loopElements,
      getOnePassword,
      snackbar,
      handleSnackbar,
      modalDetails,
      handleModalDetails,
    };
  }, [
    passwords,
    updatePass,
    user,
    slectedId,
    snackbar.open,
    modalDetails,
    handleSnackbar,
  ]);

  return <vaultContex.Provider value={values}>{children}</vaultContex.Provider>;
};

export const useVault = () => {
  return useContext(vaultContex);
};
