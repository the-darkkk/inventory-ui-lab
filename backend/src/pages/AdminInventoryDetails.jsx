import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await inventoryApi.getById(id);
        setItem(response.data);
      } catch (error) {
        alert('Помилка завантаження деталей');
      }
    };
    loadItem();
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/admin" style={{ display: 'block', marginBottom: '15px' }}>← Назад до списку</Link>
      {item ? <InventoryDetails item={item} /> : <p>Завантаження...</p>}
    </div>
  );
}