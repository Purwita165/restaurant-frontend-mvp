import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

interface EmptyStateProps {
  message: string
  onReset?: () => void
}

const EmptyState = ({ message, onReset }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <SearchIcon className="h-12 w-12 text-gray-300 mb-4" />
    <p className="text-lg text-gray-600 mb-4">{message}</p>
    {onReset && (
      <Button variant="outline" onClick={onReset}>
        Reset Filter
      </Button>
    )}
  </div>
)

export default EmptyState