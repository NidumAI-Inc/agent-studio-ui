import { FaPhoneAlt } from "react-icons/fa";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./colums";

import ImportPhoneBtn from "../import-phone-btn";

type props = {
  list: any[]
}

function List({ list }: props) {
  return (
    <section className="main-container mini-scroll-bar ">
      <header className="df justify-between px-6 py-4 text-lg font-medium sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <h1 className="df">
          <span className="p-1.5 bg-white/5 rounded"><FaPhoneAlt className="text-xl opacity-50" /></span>
          Phone Numbers
        </h1>

        <ImportPhoneBtn />
      </header>

      {
        list?.length > 0 &&
        <div className="p-6">
          <DataTable
            columns={columns}
            data={list}
          />
        </div>
      }
    </section>
  )
}

export default List
