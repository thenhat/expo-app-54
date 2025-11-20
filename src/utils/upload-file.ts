import { apiConfig } from "@/constants/apiConfig";
import sendApiRequest from "./api";

export const uploadFile = async (file: any) => {
  console.log("file", file);

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name,
    type: file.mimeType, // Loại file (VD: image/jpeg, application/pdf)
  } as any);
  try {
    const res: any = await sendApiRequest({
      ...apiConfig.uploadFile,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
      requiredToken: false,
    });
    if (res) {
      return res;
    }
  } catch (error) {
    return null;
  }
};
