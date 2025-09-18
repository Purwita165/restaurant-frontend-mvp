'use client'

import { formatCurrency } from '@/lib/formatCurrency'
import type { Order } from '@/types'
import { format } from 'date-fns'

const OrderItem = ({ order }: { order: Order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">Pesanan #{order.id.slice(-6)}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <span className="font-bold">{formatCurrency(order.total)}</span>
      </div>
      <div className="mt-2">
        <p className="text-sm"><strong>Pemesan:</strong> {order.customerName}</p>
        <p className="text-sm"><strong>Telepon:</strong> {order.phone}</p>
        <p className="text-sm"><strong>Alamat:</strong> {order.address}</p>
      </div>
      <div className="mt-3">
        <p className="font-medium">Produk:</p>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {order.items.map((item) => (
            <li key={item.id}>{item.name} x{item.qty}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default OrderItem