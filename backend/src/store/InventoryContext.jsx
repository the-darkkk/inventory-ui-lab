import { createContext, useState, useEffect } from 'react';
import { inventoryApi } from '../services/inventoryApi';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await inventoryApi.getAll();
      setItems(response.data);
    } catch (error) {
      console.error("Помилка завантаження інвентарю", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <InventoryContext.Provider value={{ items, loading, fetchItems }}>
      {children}
    </InventoryContext.Provider>
  );
};