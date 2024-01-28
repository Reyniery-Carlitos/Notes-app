import NoteCard from "./NoteCard"

export default function ContainerCards () {
  return (
    <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </section>
  )
}