// src/pages/OrdersPage.tsx
import { useSelector } from 'react-redux';
import { useOrdersQuery } from '@/services/queries/useOrdersQuery';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatCurrency';

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrdersQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Riwayat Pesanan</h1>

      {orders?.length === 0 ? (
        <p>Tidak ada pesanan.</p>
      ) : (
        <div>
        {orders && orders.length > 0 ? (
  <div>
    {orders.map((order) => (
      <Card key={order.id} className="mb-4 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Pesanan #{order.id}</h3>
            <p>{formatCurrency(order.total)}</p>
          </div>
          <Button variant="outline" size="sm">Detail</Button>
        </div>
      </Card>
    ))}
  </div>
) : (
  <p>Tidak ada pesanan.</p>
)}
        </div>
      )}
    </div>
  );
}