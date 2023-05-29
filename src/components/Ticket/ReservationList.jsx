import { useState, useEffect } from 'react';
import { database } from '../../firebase';
import ReservationItem from './ReservationItem';
import SearchInput from '../UI/SearchInput';
import './ReservationList.css';

const ReservationList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = database.ref('orders');
        const snapshot = await ordersRef.once('value');
        const ordersData = snapshot.val();

        if (ordersData) {
          const ordersArray = Object.entries(ordersData).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setOrders(ordersArray);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania zamówień:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredOrders = orders.filter((order) =>
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a.status === false && b.status === true) {
      return -1; // Zamówienie a jest przed zamówieniem b
    } else if (a.status === true && b.status === false) {
      return 1; // Zamówienie b jest przed zamówieniem a
    } else {
      return 0; // Porządek nie jest zmieniany
    }
  });

  return (
    <div className="reservation-list">
      <div className="reservation-list__title">Wyszukiwanie po adresie email</div>
      <SearchInput handleSearch={handleSearch} className="reservation-list-search" />
      {sortedOrders.map((order) => (
        <ReservationItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default ReservationList;
