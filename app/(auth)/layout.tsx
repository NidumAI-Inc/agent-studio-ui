
type props = Readonly<{
  children: React.ReactNode;
}>

function Layout({ children }: props) {
  return (
    <main className="dfc min-h-screen p-4">
      <nav className="df justify-center p-4 sm:absolute sm:top-0 sm:left-0">
        <img
          src="/logo.png"
          alt="logo"
          className="h-9"
        />
        <p className="text-lg font-bold tracking-widest">Agent Studio</p>
      </nav>

      <section className="max-w-sm m-auto p-6 rounded-2xl border bg-background-light">
        {children}
      </section>
    </main>
  )
}

export default Layout
