import { AxiosInstance } from "axios";
import { Infonota, uploadNota } from "../../../model/infoNota";

export const NotaAPI = (api: AxiosInstance) => ({

    uploadImage: async (image:uploadNota) => {
   
        const response = await api.post('/uploadNota', image.image, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return response.data;
    },
    uploadNota: async (nota: Infonota) => {

      const response = await api.post('/retornoNota',nota);
      return response.data;

    }
})