import { AxiosInstance } from "axios";
import { uploadNota } from "../../../model/infoNota";

export const NotaAPI = (api: AxiosInstance) => ({

    uploadImage: async (image:uploadNota) => {
   
        const response = await api.post('/uploadNota', image.image, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return response.data;
    }
  
})