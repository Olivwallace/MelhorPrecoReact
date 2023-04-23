import L, { LatLng } from "leaflet"
import { useEffect, useState } from "react"

//Coordenadas Padrão de Belo Horizonte
const coordsDefault = new L.LatLng(-19.917299, -43.934559)

export const useGetLocation = () => {
    
    const [coords, setCoords] = useState<LatLng | null>()

    useEffect(() => {

        function sucess (position: GeolocationPosition) {
            setCoords(new L.LatLng(position.coords.latitude, position.coords.longitude))
        }

        function err() { setCoords(coordsDefault) }

        try {
            navigator.geolocation.getCurrentPosition(sucess, err)
        } catch (error) {
            setCoords(coordsDefault)
        }

    },[])

    return coords
}