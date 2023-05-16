interface asideProps {
  asideOpen: boolean
}

export default function Aside({ asideOpen }: asideProps) {
  return (
    <aside
      className={`bg-black-700 h-screen flex flex-col gap-6 pt-8 ${
        !asideOpen ? 'w-64' : 'w-0 px-0 py-0'
      } duration-700 grid-in-nav`}
    >
      <h2
        className={`text-gray-300 text-xl origin-left ml-5 ${
          asideOpen && 'scale-0'
        } duration-500`}
      >
        Coleções
      </h2>
      <div className="w-full">
        <ul className="">
          <li
            className={`text-gray-300 px-10 py-5 cursor-pointer hover:bg-black-600 ${
              asideOpen && 'scale-0'
            } duration-500`}
          >
            Design
          </li>
          <li
            className={`text-gray-300 px-10 py-5 cursor-pointer hover:bg-black-600 ${
              asideOpen && 'scale-0'
            } duration-500`}
          >
            Pessoal
          </li>
        </ul>
      </div>
    </aside>
  )
}
