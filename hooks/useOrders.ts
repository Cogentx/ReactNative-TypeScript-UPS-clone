import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;

    // 'data' is an object;
    // 'getOrders' is an array
    // each array element is an object with key of 'value'
    // destructure 'value'
    // return array of 'orders'
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      Address: value.Address,
      City: value.City,
      Lat: value.Lat,
      Lng: value.Lng,
      carrier: value.carrier,
      createdAt: value.createdAt,
      shippingCost: value.shippingCost,
      trackingId: value.trackingId,
      trackingItems: value.trackingItems,
    }));

    setOrders(orders);
  }, [data]);

  // return 'loading' and 'error' from GraphQL
  // return 'orders' from updated state
  return { loading, error, orders };
};

export default useOrders;
