export default function InventoryQuickView({ item, onClose }) {
  if (!item) return null;

  const imageUrl = item.photo_url 
    ? `http://localhost:3000${item.photo_url}` 
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={imageUrl} alt={item.inventory_name} className="modal-img" />
        <h2>{item.inventory_name}</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
          {item.description || 'Опис відсутній.'}
        </p>
      </div>
    </div>
  );
}