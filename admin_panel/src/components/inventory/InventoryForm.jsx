import { useState, useEffect } from 'react';

export default function InventoryForm({ initialData, onSubmit, isEditMode }) {
  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        inventory_name: initialData.inventory_name || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, photo);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
      <label>
        Назва інвентарю (обов'язково):
        <input 
          type="text" required value={formData.inventory_name}
          onChange={e => setFormData({...formData, inventory_name: e.target.value})}
          style={{ width: '100%', padding: '5px' }}
        />
      </label>
      <label>
        Опис:
        <textarea 
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          style={{ width: '100%', padding: '5px' }}
        />
      </label>
      <label>
        {isEditMode ? 'Нове фото (залишіть порожнім, щоб не змінювати):' : 'Фотографія:'}
        <input 
          type="file" accept="image/*"
          onChange={e => setPhoto(e.target.files[0])}
          style={{ width: '100%' }}
        />
      </label>
      <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        {isEditMode ? 'Зберегти зміни' : 'Додати інвентар'}
      </button>
    </form>
  );
}