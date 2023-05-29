import React, { useCallback, useEffect, useState } from "react";
import { useAPI } from "../../service/api/useApi";
import { ReactComponent as DelSVG } from "./img/delete.svg";
import upload from "./img/upload.png"
import imgUp from "./img/imgUp.svg"
import { NavBar } from "../../assets/components";
import "./envioNota.css"

type EventSubmit = React.FormEvent<HTMLFormElement>

export const EnvioNota: React.FC = () => {
    const [isVazio, setIsVazio] = useState(false);
    const [isCheio, setIsCheio] = useState(false);
    const [isImgDefault, setImgDefault] = useState(true);
    const [image, setImage] = useState<File[]>([]); // inicializa o vetor de estados como um vetor vazio
    const [itens, setItens] = useState<React.ReactNode[]>([])
    const [isConfirmOne, setIsConfirmOne] = useState(false);
    const api = useAPI.Nota

    const handleDeleteImagem = (index: number) => {
        console.log(image.length);

        setIsCheio(false);
        return () => {

            const newImages = [...image];
            newImages.splice(index, 1);
            if (newImages.length < 1) {
                setImgDefault(true);
            }
            setImage(newImages);
        };
    };


    const handlesubmit = useCallback(async (event: EventSubmit) => {
        event.preventDefault();
        if (image.length <= 0) {
            setIsVazio(true);
            return;
        }
        const formData = new FormData();
        
           for (let i = 0; i < image.length; i++) {
            formData.append('image', image[i]);
           }

          await api.uploadImage({image: formData});
        setIsConfirmOne(true);
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
            tags={["Home", "Exibir Listas", "Nova Lista"]}
            namePerfil={""}
            hrefPerfil={""}
            hrefListas={"/"}
            hrefNota={"/lists"}
            hrefSobreNos={"/createList"} />

            <main className="main-container">
                {!isConfirmOne ? <><div className="div1">
                    <img className="uploadSVG" src={imgUp} alt="" />
                </div>
                    <div className="form">
                        <form onSubmit={handlesubmit} name="upfile">
                            <h1 className="titulo">Envie sua nota</h1>
                            <input disabled={isCheio} id="uploadPhoto" className="input-img" type="file" accept="image/*" name="upfile" onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (image.length < 3) {
                                        setImgDefault(false);
                                        setImage(image => [...image, file]);
                                    } else {
                                        setIsCheio(true);
                                    }
                                    setIsVazio(false);
                                }
                            }} />
                            <div className="container-img">
                                {isImgDefault && <img width={200} src={upload}></img>}
                                {itens}
                            </div>
                            {isCheio && <label className="erro">Limite de 3 notas fiscais!!</label>}
                            {isVazio && <label className="erro">Selecione notas fiscais!!</label>}
                            <div className="botoes">
                                <label className="btnUpload" htmlFor="uploadPhoto"> Enviar foto</label>
                                <button className="btn-submit" type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                </> : 
                
                
                <p></p>


                }
            </main>
        </>



    );

}



