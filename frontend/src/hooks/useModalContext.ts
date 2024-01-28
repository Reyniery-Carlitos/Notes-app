import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"

export default function useModalContext () {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext debe ser utilizado dentro de un modal context provider')
  }

  return context
}