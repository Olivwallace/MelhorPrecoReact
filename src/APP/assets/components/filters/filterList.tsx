import { useEffect, useState } from "react";
import { PropsFilter } from "./PropsFilter";

import { ReactComponent as PriceSVG } from "../../components/Bars/img/price.svg"
import { ReactComponent as RatingSVG } from "../../components/Bars/img/rating.svg"
import { ReactComponent as DistanceSVG } from "../../components/Bars/img/distance.svg"

export const FilterLists: React.FC<PropsFilter> = (props) => {

    const [select, setSelect] = useState(-1)
    const [radioSelect, setRadio] = useState("Distance")

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setSelect(Number.parseInt(event.target.value))
        props.onChange[0](event)
    };

    const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadio(event.target.value)
        props.onChange[1](event)
    }


    // Realiza carregamento de listas do usuario no filtro
    const [options, setOptions] = useState<React.ReactNode>();

    useEffect(() => {
        if(props.options){
            const option = props.options.map((element, index) => {
                return(
                    <option id={index.toString()} value={element.idLista}>{element.nomeLista}</option>
                )
            })
            setOptions(option);
        }
    }, [props.options])

    return (
        <div className={props.className}>
            <div className="filter-text">
                <p>Listas </p>
            </div>

            <select onChange={handleSelect} defaultValue={props.filters.select} className="select_filter" id="selecao" name="selecao">
                {options}
            </select>

            <div className="rating-filter">
                <form className="rating-form-1">

                    <label htmlFor="rating">
                        <input  onChange={handleRadio} 
                                checked={radioSelect === "Rating"} 
                                type="radio" name="select" 
                                className="rating_label" id="rating" value="Rating" />
                        <RatingSVG />
                    </label>

                    <label htmlFor="distance">
                        <input  onChange={handleRadio} 
                                checked={radioSelect === "Distance"}
                                type="radio" name="select" 
                                className="distance_label" id="distance" value="Distance" />
                        <DistanceSVG />
                    </label>

                    <label htmlFor="price">
                        <input  onChange={handleRadio} 
                                checked={radioSelect === "Price"}
                                type="radio" name="select" 
                                className="price_label" id="price" value="Price" />
                        <PriceSVG />
                    </label>
                </form>
            </div>
        </div>
    )
}