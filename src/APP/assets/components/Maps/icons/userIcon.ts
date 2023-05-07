import L from "leaflet";

export var userIcon = L.icon({
    iconUrl: require("./user.png"),
    iconSize: new L.Point(32,32),
    iconAnchor: [14,32]
})