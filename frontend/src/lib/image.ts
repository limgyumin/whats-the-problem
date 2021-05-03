import axios from "axios";
import { SERVER } from "config/config.json";
import { IUploadResult } from "types/upload/upload.result";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const url: string = `${SERVER}/upload`;

    const formData: FormData = new FormData();
    formData.append("images", file);

    const { data } = await axios.post<IUploadResult>(url, formData);

    console.log(data);

    return data.files[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
};
