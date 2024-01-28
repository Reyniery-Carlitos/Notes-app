import useModalContext from "../../hooks/useModalContext.ts"

export default function ModalDelete() {
  const {setShowDeleteModal} = useModalContext()

  // Handle Click
  const handleClick = () => {
    setShowDeleteModal(false)
  }
  return (
    <section className="relative flex flex-col gap-5 rounded-xl min-w-52 bg-white p-5">
      <header className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold"> Delete note </h3>
        
        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x h-6 w-6" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </header>
      
      <div>
        <p> Are you sure you want to delete this note? </p>
      </div>

      <div className="flex flex-row justify-end gap-5">
        <button onClick={handleClick}> Cancel </button>
        <button className="bg-red-700 py-2 px-3 text-white rounded-full"> Delete </button>
      </div>
    </section>
  )
}