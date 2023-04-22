import "./searchBar.css"

import { ReactComponent as VoiceSVG } from "../img/voice.svg"
import { ReactComponent as PriceSVG } from "../img/price.svg"
import { ReactComponent as SearchSVG } from "../img/search.svg"
import { ReactComponent as RatingSVG } from "../img/rating.svg"
import { ReactComponent as DistanceSVG } from "../img/distance.svg"

import { useCallback, useState } from "react"
import { PropsSearch, PropsSearchHome } from "./PropsSearch"


export const SearchBar: React.FC<PropsSearch> = (props) => {

    const [textSearch, setText] = useState<string>("")
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
        props.onChange(event)
    }

    return (

        <div className="searchbar">

            <div className="searchbar-wrapper">
                <div className="searchbar-left">
                    <div className="search-icon-wrapper">
                        <span className="search-icon searchbar-icon" >
                            <SearchSVG />
                        </span>
                    </div>
                </div>

                <div className="searchbar-center">
                    <div className="searchbar-input-spacer"></div>

                    <input  onChange={handleSearch} 
                            value={props.search}
                            onKeyDown={props.onKeyDonw}
                            type="text" className="searchbar-input" 
                            maxLength={2048} name="q" autoCapitalize={'off'}
                            autoComplete={"off"} title="Search" role="combobox" 
                            placeholder="Busque por produto ou mercado" />
                </div>

                <div className="searchbar-right">
                    <VoiceSVG />
                </div>
            </div>
        </div>
    )
}

export const SearchBarHome: React.FC<PropsSearchHome> = (props) => {

    const [select, setSelect] = useState("Market")
    const [radioSelect, setRadio] = useState("Distance")

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setSelect(event.target.value)
        props.onChange[0](event)
    };

    const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadio(event.target.value)
        props.onChange[1](event)
    }

    return (
        <div className="bar">
            <SearchBar search={props.search.text} onKeyDonw={props.onKeyDonw} onChange={props.onChange[2]} />

            <div className="rating-container">
                <div className="rating-text">
                    <p>Filtros </p>
                </div>

                <select onChange={handleSelect} defaultValue={props.search.select} className="select_search" id="selecao" name="selecao">
                    <option value="Market">Mercado</option>
                    <option value="Product">Produto</option>
                    <option value="Promotion">Oferta</option>
                </select>

                <div className="rating">
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
        </div>
    )
}