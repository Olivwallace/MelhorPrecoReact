import React, { useCallback, useState } from "react";
import upload from "./img/upload.svg"
type EventSubmit = React.FormEvent<HTMLFormElement>

export const EnvioNota: React.FC = (props) => {

    const [image, setImage] = useState<File | null>(null);
    const [endImage] = useState(upload);


    const handlesubmit = useCallback(async (event: EventSubmit) => {
        event.preventDefault();
        console.log(image);
    },[image]);



    return(

        <div>
            <form onSubmit={handlesubmit}>
                <h1>Envie sua nota</h1>
                <input type="file" accept="image/*" name="image" onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImage(file);
                        }
                        }} />

                        <div>
                        {image? <img src={URL.createObjectURL(image)} />: <img src={upload} />}


                        </div>


                <button type="submit">salvar</button>
            </form>



        </div>



    );

}