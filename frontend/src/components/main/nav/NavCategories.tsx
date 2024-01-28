export default function NavCategories () {
  return (
    <div className="flex justify-between w-full items-center">
      <nav>
        <ul className="flex flex-row">
          <li className="uppercase cursor-pointer text-gray-700 text-sm py-1 border-b-slate-300 border-b-2 w-24 text-center" > All </li>
          <li className="uppercase cursor-pointer text-gray-700 text-sm py-1 border-b-slate-300 border-b-2 w-24 text-center"> Personal </li>
          <li className="uppercase cursor-pointer text-gray-700 text-sm py-1 border-b-slate-300 border-b-2 w-24 text-center"> Home </li>
          <li className="uppercase cursor-pointer text-gray-700 text-sm py-1 border-b-slate-300 border-b-2 w-24 text-center"> Business </li>
        </ul>
      </nav>

      <div>
        <label htmlFor="input-check" className="flex gap-2">
          <input type="checkbox" id="input-check" />
          <span> Show only completed notes </span>
        </label>
      </div>
    </div>
  )
}