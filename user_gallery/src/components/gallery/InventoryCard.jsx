export default function InventoryCard({ item, onClick, isFav, onToggleFav }) {
  const handleFavClick = (e) => {
    e.stopPropagation(); // stop the default card click
    onToggleFav(item.id);
  };

  const imageUrl = item.photo_url 
    ? `http://localhost:3000${item.photo_url}` 
    : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="card" onClick={() => onClick(item)}>
      <div className="card-img-container">
        <img src={imageUrl} alt={item.inventory_name} className="card-img" />
      </div>
      <div className="card-info">
        <h3 className="card-title">{item.inventory_name}</h3>
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`} 
          onClick={handleFavClick}
          title="Додати в улюблені"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}