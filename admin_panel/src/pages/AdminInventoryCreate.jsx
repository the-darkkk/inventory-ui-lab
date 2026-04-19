import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { InventoryContext } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { fetchItems } = useContext(InventoryContext);

  const handleCreate = async (formData, photo) => {
    const data = new FormData();
    data.append('inventory_name', formData.inventory_name);
    data.append('description', formData.description);
    if (photo) data.append('photo', photo);

    try {
      await inventoryApi.create(data);
      fetchItems();
      navigate('/admin');
    } catch (error) {
      alert('Помилка при створенні');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/admin">← Назад до списку</Link>
      <h2>Додати новий інвентар</h2>
      <InventoryForm onSubmit={handleCreate} isEditMode={false} />
    </div>
  );
}