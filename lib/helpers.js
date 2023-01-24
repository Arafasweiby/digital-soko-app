import { isValidPhoneNumber } from "libphonenumber-js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const validatePhoneNumber = (value) => {
  if (value == null || value == undefined) return false;
  try {
    return isValidPhoneNumber(value.toString(), "KE");
  } catch (error) {
    return false;
  }
};

export const uploadFile = async ({ file, fileName, path }) => {
  const storageRef = ref(storage, `${path}/${fileName}`);
  return uploadBytes(storageRef, file)
    .then((snapshot) => getDownloadURL(snapshot.ref).then((url) => url))
    .catch((error) => {
      throw {
        code: error.code ?? "Firebase error",
        message: "Failed to upload file",
      };
    });
};
