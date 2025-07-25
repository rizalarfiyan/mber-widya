import GaugeChart from './gauge'
import Location from './location'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDatetime } from '@/utils/date'
import { formatNumber } from '@/utils/number'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, Fuel, Gauge, GaugeCircle, MapPin } from 'lucide-react'
import type { VehicleDetail } from './types'

interface DetailProps {
  data: VehicleDetail
}

const Detail = ({ data }: DetailProps) => {
  const { name, status, latitude, longitude, speed, fuel_level, odometer, updated_at } = data

  const gaugeColors = [
    { value: 50, color: '#F16052' },
    { value: 25, color: '#FFD15B' },
    { value: 25, color: '#5CC860' },
  ]

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard/vehicle">
              <ChevronLeft />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{name}</h1>
        </div>
        <Badge variant={status === 'active' ? 'default' : 'destructive'} className="px-3 py-1 capitalize">
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Vehicle Location
            </CardTitle>
            <CardDescription>
              Current position: {latitude.toFixed(5)}, {longitude.toFixed(5)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <div className="relative flex h-full min-h-96 w-full flex-1 overflow-hidden rounded-lg">
              <Location latitude={latitude} longitude={longitude} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Fuel Level
              </CardTitle>
            </CardHeader>
            <CardContent className="-mb-[10%] h-80 w-full">
              <GaugeChart score={fuel_level} label="Fuel Remaining" colors={gaugeColors} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Current Speed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-600">{speed}</p>
                <p className="text-lg text-gray-500">km/h</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GaugeCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Odometer</span>
                </div>
                <span className="text-sm">{formatNumber(odometer)} km</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Latitude</span>
                </div>
                <span className="font-mono text-sm">{latitude.toFixed(5)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Longitude</span>
                </div>
                <span className="font-mono text-sm">{longitude.toFixed(5)}</span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Last Updated</span>
                  <span>{formatDatetime(updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Detail
