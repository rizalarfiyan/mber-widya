import Detail from './detail'
import { Route } from '../index.lazy'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAxios } from '@/utils/axios'
import { AlertCircle } from 'lucide-react'
import type { VehicleDetail } from './types'
import type { BaseResponse } from '@/types/response'

const Content = () => {
  const { id } = Route.useParams()

  const [{ data, loading, error }] = useAxios<BaseResponse<VehicleDetail>>({
    url: `/vehicle/${id}`,
    method: 'GET',
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <Skeleton className="min-h-96 w-full flex-1" />
            </CardContent>
          </Card>
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {(error as Error)?.message || 'Failed to load vehicle data. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return <Detail data={data.data} />
}

export default Content
