import { useState } from 'react';
import InventoryCard from './InventoryCard';
import InventoryQuickView from './InventoryQuickView';

export default function InventoryGallery({ items, loading, error, isFavorite, toggleFavorite }) {
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) {
    return (
      <div className="gallery-grid">
        {[1, 2, 3, 4, 5, 6].map(n => (
          <div key={n} className="card skeleton" style={{ height: '260px' }}></div>
        ))}
      </div>
    );
  }

  if (error) return <div className="empty-state" style={{color: 'red'}}>Помилка: {error}</div>;
  if (!items || items.length === 0) return <div className="empty-state">Немає інвентарю для відображення.</div>;

  return (
    <>
      <div className="gallery-grid">
        {items.map(item => (
          <InventoryCard 
            key={item.id} 
            item={item} 
            onClick={setSelectedItem}
            isFav={isFavorite(item.id)}
            onToggleFav={toggleFavorite}
          />
        ))}
      </div>

      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}