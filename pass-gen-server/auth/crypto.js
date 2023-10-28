const Crypto = require("crypto-js");

const encrypt = (string) => {
  const cipherText = Crypto.AES.encrypt(string, process.env.SCREACT_KEY);
  return cipherText;
};
const decrypt = (string) => {
  const bytes = Crypto.AES.decrypt(string, process.env.SCREACT_KEY);
  const originalData = bytes.toString(Crypto.enc.Utf8);
  return originalData;
};

module.exports = { encrypt, decrypt };
