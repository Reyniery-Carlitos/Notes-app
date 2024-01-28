import NavCategories from "./nav/NavCategories"
import ContainerCards from "./card/ContainerCards"

export default function Main () {
  return (
    <>
      <main className="flex w-4/5 mt-5 flex-col gap-5">
        <h1 className="text-2xl font-bold"> Your notes </h1>
        <NavCategories />
        <ContainerCards />
      </main>
    </>

    
  )
}

