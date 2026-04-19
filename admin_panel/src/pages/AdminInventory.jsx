import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { InventoryContext } from '../store/InventoryContext';
import { inventoryApi } from '../services/inventoryApi';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';

export default function AdminInventory() {
  const { items, loading, fetchItems } = useContext(InventoryContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await inventoryApi.delete(itemToDelete);
      fetchItems();
      setModalOpen(false);
    } catch (error) {
      alert('Помилка при видаленні');
    }
  };

  if (loading) return <p>Завантаження складу...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Адмін-панель складу</h1>
      <Link to="/admin/create">
        <button style={{ padding: '10px' }}>+ Додати нову позицію</button>
      </Link>
      
      <InventoryTable items={items} onDeleteClick={handleDeleteClick} />
      
      <ConfirmModal 
        isOpen={modalOpen} 
        onConfirm={confirmDelete} 
        onCancel={() => setModalOpen(false)} 
        message="Ви впевнені, що хочете видалити цей інвентар назавжди?"
      />
    </div>
  );
}