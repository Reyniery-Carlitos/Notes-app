import { createContext, useState } from "react";

interface MyModalValues {
  showAddModal: boolean,
  showEditModal: boolean,
  showDeleteModal: boolean,
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalContext = createContext<MyModalValues | undefined>(undefined)

export function ModalProvider (props: any) {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const {children} = props;

  const contextValues: MyModalValues = {
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal
  }

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  )
}

