import { MAP_BOX_KEY } from '@/constants'
import { MapPinCheckInside } from 'lucide-react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, NavigationControl, ScaleControl } from 'react-map-gl/mapbox'

interface LocationProps {
  latitude: number
  longitude: number
}

const Location = ({ latitude, longitude }: LocationProps) => (
  <Map
    mapboxAccessToken={MAP_BOX_KEY}
    initialViewState={{
      longitude,
      latitude,
      zoom: 14,
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9">
    <ScaleControl position="bottom-right" />
    <NavigationControl position="bottom-left" />
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <MapPinCheckInside className="size-8 fill-green-500 text-green-700" />
    </Marker>
  </Map>
)

export default Location
