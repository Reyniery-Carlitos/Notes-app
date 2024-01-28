import useModalContext from "../../../hooks/useModalContext.ts"

export default function NoteCard () {
  const {setShowEditModal, setShowDeleteModal} = useModalContext()

  // Handle click
  const handleEditClick = () => {
    setShowEditModal(true)
  }

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  return (
    <div className="flex flex-col bg-white p-5 rounded-lg gap-2 shadow-lg">
      <div className="flex flex-row justify-between">
        <span className="bg-red-500 px-2 py-1 text-sm text-white rounded-full"> Business </span>
        <div className="flex flex-row gap-5">
          <input type="checkbox" />

          <svg onClick={handleEditClick} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil h-6 w-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          
          <svg onClick={handleDeleteClick} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash h-6 w-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold"> Title </h2>
        <p> Lorem ipsum dolor sit ammet... Lorem ipsum dolor sit ammet... Lorem ipsum dolor sit ammet... Lorem ipsum dolor sit ammet... </p>
      </div>
      
      <div className="flex justify-end">
        <span className="text-gray-500"> 22.01.2024 </span>
      </div>
    </div>
  )
}