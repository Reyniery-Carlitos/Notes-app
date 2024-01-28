import React, { useEffect, useState } from "react"
import useModalContext from "../../hooks/useModalContext"

export default function SearchBar () {
  const [inputValue, setInputValue] = useState<String>('')
  const [debouncedValue, setDebouncedValue] = useState<String>('')
  const {setShowAddModal} = useModalContext()

  // Debouncing mechanism
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
      console.log(debouncedValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  // Handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Handle click
  const handleClick = () => {
    setShowAddModal(true)
  }

  return (
    <form className="flex gap-5 py-3 justify-center w-4/5" onSubmit={handleSubmit}>
      <input type="text" className="w-11/12 h-10 pl-5 rounded-md bg-gray-100 outline-none" placeholder="Search" onChange={handleChange}/>
      <button className="bg-blue-400 py-2 px-3 text-white rounded-full" onClick={handleClick}> + Add </button>
    </form>
  )
}