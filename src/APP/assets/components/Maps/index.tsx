import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { MapRouter } from './Rotas/mapRouter'
import L, { LatLng } from 'leaflet'
import { MarketModel } from '../../../model'
import { MarkerSupermaket, MarkerUser } from './Marcadores/markers'
import { useCallback, useEffect, useState } from 'react'

interface MapProps {
    positionCSS?: any,
    locateUser: L.LatLng,
    markers?: MarketModel[] 
}

export const Map = (props : MapProps) => {

    const defaultLocate = new L.LatLng(-19.917299, -43.934559)
    const [marketMarkers, setMarkers] = useState<{geocode: LatLng, popup: string}[]|null>()
    
    const obterMarcadores = useCallback(() => {
        let markers:{geocode:LatLng, popup:string}[] = []
        
        props.markers?.forEach(market => {
            let lat = parseFloat(market.coords[0]), lon = parseFloat(market.coords[1])
            markers.push({geocode: new LatLng(lat, lon), popup: market.nome})
        });

        setMarkers(markers)
    },[props.markers, props.locateUser])

    useEffect(()=> {
        obterMarcadores()
    },[props.markers, props.locateUser])

    return(
        <div className='mapa'>
            <MapContainer style={{height: '100%'}} maxZoom={18} minZoom={2} center={props.locateUser} zoom={15} zoomControl={false} scrollWheelZoom={true}>
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MarkerUser locate={(props.locateUser.equals(defaultLocate))? null : props.locateUser}/>
                {marketMarkers?.map(marker => (
                    <MarkerSupermaket locate={marker.geocode} popUp={marker.popup} />
                ))}

                <ZoomControl position='bottomright' zoomInText='➕' zoomOutText='➖'/>
            </MapContainer>
        </div>
    ) 
}