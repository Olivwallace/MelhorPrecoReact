import { useEffect, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import { userIcon } from "../icons/userIcon"
import { MarketIcon } from "../icons/marketIcon"
import { LatLng } from "leaflet"
import { useGetLocation } from "../../../../hooks/useGetLocation"

interface PropsMarker {
  popUp?: string
  locate: LatLng | null,

}


export const MarkerUser = (props:PropsMarker) => {

    return props.locate === null ? null : (
      <Marker position={props.locate} icon={userIcon}>
        <Popup>{(props.popUp)?props.popUp:"Localização Calculada"}</Popup>
      </Marker>
    )
}

export const MarkerSupermaket = (props: PropsMarker) => {
    
    return props.locate === null ? null : (
      <Marker position={props.locate} icon={MarketIcon}>
        <Popup>{(props.popUp)?props.popUp:"Mercado"}</Popup>
      </Marker>
    )
    
}