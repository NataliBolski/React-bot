import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export const ModalDelete = ({ products, onDelete, visible, setVisible }) => {
  const [inputId, setInputId] = useState('');

  const handleDelete = () => {
    console.log("Deleting product with id:", inputId);
    onDelete(inputId);
    setVisible(false);
  };

  return (
    <Dialog visible={visible} style={{ width: '350px', height: '230px' }} onHide={() => setVisible(false)}>
      <div className='deleteId'>
        <span style={{ textAlign: 'center', margin: '20px' }}>ID продукта: </span>
        <InputText value={inputId} onChange={(e) => setInputId(e.target.value)} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Button label="Удалить" className="p-button-danger" onClick={handleDelete} />
      </div>
    </Dialog>
  );
};

