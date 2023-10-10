import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export const ModalEdit = ({ product, onDelete, visible, setVisible }) => {
  return (
    <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
      Изменить
    </Dialog>
  )
}