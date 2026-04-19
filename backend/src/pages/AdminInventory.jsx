import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../../store/InventoryContext';
import { inventoryApi } from '../../services/inventoryApi';

export default function AdminInventory() {
  const { items, loading, fetchItems } = useContext(InventoryContext);

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю позицію?')) {
      try {
        await inventoryApi.delete(id);
        fetchItems(); // pdate the global state after deletion
      } catch (error) {
        alert('Помилка при видаленні');
      }
    }
  };

  if (loading) return <div>Завантаження...</div>;
  if (!items.length) return <div>Склад порожній. Додайте інвентар.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Управління складом</h2>
      <Link to="/admin/create">
        <button style={{ marginBottom: '15px' }}>+ Додати інвентар</button>
      </Link>
      
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <img 
                  src={`http://localhost:3000${item.photo_url}`} 
                  alt={item.inventory_name} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                />
              </td>
              <td>{item.inventory_name}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/admin/edit/${item.id}`}><button>Редагувати</button></Link>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red', marginLeft: '5px' }}>
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}