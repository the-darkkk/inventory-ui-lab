export default function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', color: '#000' }}>
        <p>{message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '15px' }}>
          <button onClick={onCancel}>Скасувати</button>
          <button onClick={onConfirm} style={{ background: 'red', color: 'white' }}>Видалити</button>
        </div>
      </div>
    </div>
  );
}