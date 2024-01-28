import React, { useState } from "react"
import useModalContext from "../../hooks/useModalContext"

export default function ModalAdd () {
  const [descriptionValue, setDescriptionValue] = useState<string>('')
  const [titleValue, setTitleValue] = useState<string>('')
  const {setShowAddModal} = useModalContext()
  
  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }  

  // Handle click
  const handleClick = () => {
    setShowAddModal(false)
  }

  // Handle Title Value
  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle: string = e.target.value

    if (newTitle.length <= 40) {
      setTitleValue(newTitle)
    }
  }

  // Handle Description Change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription:string = e.target.value
    
    if (newDescription.length <= 200) {
      setDescriptionValue(newDescription)
    }
  }

  return (
    <section className="relative flex flex-col gap-5 rounded-xl min-w-52 bg-white p-5">
      <header className="flex flex-row justify-between items-center">
        <h3 className="text-xl font-bold"> Add note </h3>
        
        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x h-6 w-6" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </header>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2"> 
            <label htmlFor="" className="font-bold text-sm"> Title </label>
            <input type="text" className="h-9 rounded-lg p-2 bg-gray-100 outline-none" placeholder="Add title" value={titleValue} onChange={handleTitleValue} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold text-sm"> Category </label>
            <select name="" id="" className="h-9 rounded-lg p-2 bg-gray-100 outline-none">
              <option value="personal"> Personal </option>
              <option value="home"> Home </option>
              <option value="business"> Business </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between"> 
            <label htmlFor="" className="font-bold text-sm"> Description <span className="text-slate-400 font-normal"> (optional) </span> </label>
            <span className="text-slate-400 text-sm"> {descriptionValue.length}/200 </span>
          </div>
          <textarea name="description" id="description" className="outline-none bg-gray-100 rounded-lg min-h-32 p-2 resize-none" placeholder="Add description" onChange={handleDescriptionChange} value={descriptionValue} />
        </div>

        <div className="flex flex-row justify-end gap-5">
          <button onClick={handleClick}> Cancel </button>
          <button className="bg-blue-400 py-2 px-3 text-white rounded-full"> Add </button>
        </div>
      </form>
    </section>
  )
}