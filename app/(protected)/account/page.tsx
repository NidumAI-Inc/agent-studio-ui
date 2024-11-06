import { FaUserAlt } from "react-icons/fa";
import UpdateUser from "./update-user";
import DeleteUser from "./delete-user";

function Page() {
  return (
    <section className="main-container mini-scroll-bar overflow-y-auto">
      <header className="df mb-8 px-6 py-4 text-lg font-semibold sticky top-0 backdrop-blur-lg border-b rounded-t-3xl z-[1]">
        <span className="p-1 bg-white/5 rounded"><FaUserAlt className="text-2xl opacity-50" /></span>
        Account
      </header>

      <UpdateUser />
      <DeleteUser />
    </section>
  )
}

export default Page
