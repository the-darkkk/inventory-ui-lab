import { useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await inventoryApi.getAll();
        // if there is item id in localstorage it goes to the favItems array
        const favItems = response.data.filter(item => favorites.includes(item.id));
        setItems(favItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [favorites]); // update favorites when localstorage changes

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '24px 0' }}>Мій улюблений інвентар</h1>
      <InventoryGallery 
        items={items} 
        loading={loading} 
        error={error}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}