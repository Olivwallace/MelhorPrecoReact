import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as DelSVG } from "./img/delete.svg";
import { NavBar } from "../../assets/components";
import "./envioNota.css"
type EventSubmit = React.FormEvent<HTMLFormElement>

export const EnvioNota: React.FC = () => {
    const [isVazio, setIsVazio] = useState(false);
    const [image, setImage] = useState<File[]>([]); // inicializa o vetor de estados como um vetor vazio
    const [itens, setItens] = useState<React.ReactNode[]>([])

    const handleDeleteImagem = (index: number) => {


        return () => {
            const newImages = [...image];
            newImages.splice(index, 1);
            setImage(newImages);
        };
    };


    const handlesubmit = useCallback(async (event: EventSubmit) => {
        event.preventDefault();
        if (image.length <= 0) {
            setIsVazio(true);
            return;

        }

        console.log(image);
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
        }


    }, [image]);


    useEffect(() => {
        const listaDeItens = image.map((element, index) => {
            return (
                <><div className="divImg" key={element.name}>
                    <button className="btnDelete" type="button" onClick={handleDeleteImagem(index)}>
                        <DelSVG />
                    </button>
                    <img className="imgNota" src={URL.createObjectURL(element)} />

                </div>
                </>
            );
        });
        setItens(listaDeItens)
    }, [image]);





    return (

        <> <NavBar auth={true}
            namePerfil={""}
            hrefPerfil={""}
            hrefListas={""}
            hrefNota={""}
            hrefSobreNos={""} />

            <main className="main-container">




                <div className="form">
                    <form onSubmit={handlesubmit}>
                        <h1 className="titulo">Envie sua nota</h1>

                        <input id="uploadPhoto" className="input-img" type="file" accept="image/*" name="image" onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setImage(image => [...image, file]); // adiciona o arquivo ao vetor de estados se ele existir
                                setIsVazio(false);
                            }
                        }} />
                        <div className="container-img">
                            {image? itens:<img src= "./img/upload.png"/>}
                        </div>
                        {isVazio && <label className="erro">Selecione imagens!!</label>}
                        <div className="botoes">
                            <label className="btnUpload" htmlFor="uploadPhoto"> Enviar foto</label>
                            <button className="btn-submit" type="submit">Salvar</button>
                        </div>
                    </form>
                </div>

            </main>
        </>



    );

}



