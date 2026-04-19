import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../../services/inventoryApi';
import { InventoryContext } from '../../store/InventoryContext';

export default function AdminInventoryForm() {
  const navigate = useNavigate();
  const { fetchItems } = useContext(InventoryContext);
  
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
  });
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Створюємо FormData для відправки файлу та тексту разом
    const data = new FormData();
    data.append('inventory_name', formData.inventory_name);
    data.append('description', formData.description);
    if (photo) {
      data.append('photo', photo);
    }

    try {
      await inventoryApi.create(data);
      fetchItems(); // update the global state
      navigate('/admin'); //back to the table
    } catch (error) {
      console.error('Помилка збереження:', error);
      alert('Не вдалося зберегти інвентар');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Додати новий інвентар</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        
        <label>Назва (обов'язково):</label>
        <input 
          type="text" 
          required 
          value={formData.inventory_name}
          onChange={(e) => setFormData({...formData, inventory_name: e.target.value})}
        />

        <label>Опис:</label>
        <textarea 
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        <label>Фотографія:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit" style={{ marginTop: '15px' }}>Зберегти</button>
      </form>
    </div>
  );
}