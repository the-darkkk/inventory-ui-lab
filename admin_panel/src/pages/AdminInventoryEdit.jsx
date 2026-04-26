import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { InventoryContext } from '../store/InventoryContext';
import InventoryForm from '../components/inventory/InventoryForm';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchItems } = useContext(InventoryContext);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await inventoryApi.getById(id);
        setInitialData(response.data);
      } catch (error) {
        alert('Помилка завантаження даних');
      }
    };
    loadItem();
  }, [id]);

  const handleEdit = async (formData, newPhoto) => {
    try {
      // request the text update
      await inventoryApi.updateText(id, formData);
      
      // if there's a photo update it too (form data)
      if (newPhoto) {
        const photoData = new FormData();
        photoData.append('photo', newPhoto);
        await inventoryApi.updatePhoto(id, photoData);
      }

      fetchItems();
      navigate('/admin');
    } catch (error) {
      alert('Помилка при оновленні');
    }
  };

  if (!initialData) return <p>Завантаження...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/admin">← Назад до списку</Link>
      <h2>Редагувати інвентар</h2>
      <InventoryForm initialData={initialData} onSubmit={handleEdit} isEditMode={true} />
    </div>
  );
}