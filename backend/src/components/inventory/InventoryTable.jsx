import { Link } from 'react-router-dom';

export default function InventoryTable({ items, onDeleteClick }) {
  if (items.length === 0) return <p>Склад порожній.</p>;

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
              {item.photo_url ? (
                <img src={`http://localhost:3000${item.photo_url}`} alt="inv" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              ) : 'Немає фото'}
            </td>
            <td>{item.inventory_name}</td>
            <td>{item.description}</td>
            <td>
              <Link to={`/admin/details/${item.id}`}><button style={{ marginRight: '5px' }}>Переглянути</button></Link>
              <Link to={`/admin/edit/${item.id}`}><button style={{ marginRight: '5px' }}>Редагувати</button></Link>
              <button onClick={() => onDeleteClick(item.id)} style={{ color: 'red' }}>Видалити</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}