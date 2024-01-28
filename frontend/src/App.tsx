import './App.css'

import Header from './components/header/Header.jsx'
import Main from './components/main/Main.js'
import Modal from './components/modal/Modal.js'
import ModalAdd from './components/modal/ModalAdd.js'
import ModalDelete from './components/modal/ModalDelete.js'
import useModalContext from './hooks/useModalContext.js'

function App() {
  const {showAddModal, showEditModal, showDeleteModal} = useModalContext()

  return (
    <>
      <Header />
      <Main />
      {
        showAddModal && 
        <div className="absolute bg-black/45 flex flex-row justify-center items-center min-w-full bg-red-500 min-h-full">
          <ModalAdd />
        </div>
      }

      {
        showEditModal && 
        <div className="absolute bg-black/45 flex flex-row justify-center items-center min-w-full bg-red-500 min-h-full">
          <Modal />
        </div>
      }

      {
        showDeleteModal && 
        <div className="absolute bg-black/45 flex flex-row justify-center items-center min-w-full bg-red-500 min-h-full">
          <ModalDelete />
        </div>
      }
    </>
  )
}

export default App
