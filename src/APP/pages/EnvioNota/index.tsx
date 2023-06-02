import React, { useCallback, useEffect, useState } from "react";
import { useAPI } from "../../service/api/useApi";
import { ReactComponent as DelSVG } from "./img/delete.svg";
import upload from "./img/upload.png";
import imgUp from "./img/imgUp.svg";
import imgRating from "./img/imgRating.svg";
import { NavBar } from "../../assets/components";
import {InputNota} from "../../assets/components";
import "./envioNota.css";
import { Infonota } from "../../model/infoNota";
import { useNavigate } from "react-router-dom";
import { Home } from "../home";

type SelectEvent = React.ChangeEvent<HTMLSelectElement>
type EventSubmit = React.FormEvent<HTMLFormElement>

export const EnvioNota: React.FC = () => {
    const navigate = useNavigate();
    const [isVazio, setIsVazio] = useState(false);
    const [isCheio, setIsCheio] = useState(false);
    const [isErro, setIsErro] = useState(false);
    const [isImgDefault, setImgDefault] = useState(true);
    const [image, setImage] = useState<File[]>([]); // inicializa o vetor de estados como um vetor vazio
    const [itens, setItens] = useState<React.ReactNode[]>([])
    const [isConfirmOne, setIsConfirmOne] = useState(false);
    const [notaInicial, setNotaInicial] = useState<Infonota>();
    const api = useAPI.Nota
    let nota;
    
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

        nota = await api.uploadImage({image: formData});
        console.log(nota);
        if(nota.status == 200){
           const notaInicial: Infonota = {
                chaveAcesso: nota.data.ChaveAcesso,
                mercado: nota.data.Mercado,
                produtos: nota.data.Produtos.map((produto: any) => ({
                    abreviacao: produto.abreviacao,
                    palavras: produto.palavras,
                    unMedida:produto.unMedida,
                    valor: produto.valor
                }))
            };
            setIsErro(false);
            setNotaInicial(notaInicial);
            console.log(notaInicial);
            setIsConfirmOne(true);
        } else {
            setIsErro(true);
        }
    }, [image]);
    const handlesubmit2 = useCallback(async (event: EventSubmit) => {
        event.preventDefault();
        const palavras = Array.from(document.querySelectorAll('.produtoFrase')).map((fraseElement: Element) => {
            const palavras = Array.from(fraseElement.querySelectorAll('.produtoPalavra')).map((palavraElement: Element) => {
              const selectElement = palavraElement.querySelector('select') as HTMLSelectElement;
              if (selectElement) {
                return selectElement.value;
              } else if (palavraElement instanceof HTMLElement) {
                return palavraElement.textContent;
              }
              return '';
            });
            return palavras.join(' '); 
          });
          let qtd =(notaInicial!=null&&notaInicial.produtos!=null)?notaInicial.produtos.length:0;
          for (let i = 0; i < qtd ; i++) {
            if (notaInicial && notaInicial.produtos[i]) {
                notaInicial.produtos[i].palavra = palavras[i];
              }
          }

          const nota = notaInicial;

            if (nota!=null) {

                await api.uploadNota(nota);
            }
            navigate("/");
    },[notaInicial]);


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

            
                {!isConfirmOne ? <><main className="main-container">
                    <div className="div1">
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
                            {isErro && <label className="erro">Erro no envio da nota!!</label>}
                            <div className="botoes">
                                <label className="btnUpload" htmlFor="uploadPhoto"> Enviar foto</label>
                                <button className="btn-submit" type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                    </main>
                </> 
                
                : 

                <>
                    <main className="main-container2">
                    <div className="form2">
                        <form onSubmit={handlesubmit2} name="confirmNota">
                            <h3 className="titulo">{notaInicial?.mercado[0]}</h3>
                                {notaInicial ? (
                                    <InputNota  
                                    produtos={notaInicial.produtos} />
                                    ) : (
                                    <div>Carregando...</div>
                                    )}
                            <div className="botoes">
                                <button className="btn-submit" type="submit">Salvar</button>
                            </div>
                        </form>
                    </div>
                    </main>
                </>     
              
                
              


                }
           
        </>



    );

}



