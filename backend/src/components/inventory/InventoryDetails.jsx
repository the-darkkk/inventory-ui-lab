export default function InventoryDetails({ item }) {
  if (!item) return <p>Дані не знайдено</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '500px' }}>
      <h2>{item.inventory_name}</h2>
      {item.photo_url && (
        <img 
          src={`http://localhost:3000${item.photo_url}`} 
          alt={item.inventory_name} 
          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', marginBottom: '15px' }} 
        />
      )}
      <p><strong>Опис:</strong> {item.description || 'Опис відсутній'}</p>
    </div>
  );
}