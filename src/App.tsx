export default function App() {
  return (
    <div className="h-full bg-white flex flex-col justify-between">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5"
            >
              <h3>tsperf</h3>
            </a>
          </div>
        </nav>
      </header>

      <main className="isolate">
        <div className="relative pt-14">
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Something to write here
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <div className="mx-auto max-w-7xlsm:px-6 lg:px-8">
                    <span className="mx-auto text-center tracking-tight">
                      Join the waitlist and get notified when we launch.
                    </span>
                    <form className="border-2 border-black rounded-md mx-auto mt-2 flex max-w-md">
                      <label
                        htmlFor="email-address"
                        className="sr-only"
                      >
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="min-w-0 flex-auto rounded-sm rounded-r-none border-0 bg-white/5 px-3.5 py-2 ring-inset ring-black focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                        placeholder="Enter your email"
                      />
                      <button
                        type="submit"
                        className="bg-black flex-none text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Notify me
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="mt-8 py-6 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5">
            made with ♥️ by{' '}
            <a
              className="underline underline-offset-2 hover:text-gray-700"
              href="https://twitter.com/aleksandrasays"
            >
              Aleksandra
            </a>{' '}
            and{' '}
            <a
              className="underline underline-offset-2 hover:text-gray-700"
              href="https://twitter.com/danielcroe"
            >
              Daniel
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
