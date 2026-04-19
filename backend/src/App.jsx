import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryProvider } from './store/InventoryContext';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryForm from './pages/AdminInventoryForm';

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <Routes>
          {/* temporary redirect to admin */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          
          <Route path="/admin" element={<AdminInventory />} />
          <Route path="/admin/create" element={<AdminInventoryForm />} />
          {/* For editing, we can reuse AdminInventoryForm by adding logic to load existing data */}
          <Route path="/admin/edit/:id" element={<AdminInventoryForm />} />
        </Routes>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;