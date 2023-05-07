import { useEffect } from "react"
import L from "leaflet"
import { useMap } from "react-leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

interface CoordsRouter {
    user: L.LatLng,
    market: L.LatLng
}

export const MapRouter = (props: CoordsRouter) => {
    
    const map = useMap()
    
    useEffect(()=>{
        L.Routing.control({
            waypoints: [props.user, props.market]
        }).addTo(map);
    },[props])

    return null
}