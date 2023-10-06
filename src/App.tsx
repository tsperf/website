import { createClient, type PostgrestError } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { useReducer } from 'react'

const supabase = createClient<Database>(
  'https://tolzxagdkwvomdmumxrx.supabase.co',
  import.meta.env.VITE_APP_SUPABASE_KEY
)

const subscribe = async (email: string) => {
  return await supabase
    .from('subscribers')
    .insert([{ email, subscriptions: ['waitlist'] }])
}

type Actions =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SUBSCRIBING' }
  | { type: 'ERROR'; error: PostgrestError }
  | { type: 'SUCCESS' }
  | { type: 'RESET' }

type State = {
  email: string
  error: PostgrestError | null
  loading: boolean
  success: boolean
}

const initialState: State = {
  email: '',
  error: null,
  loading: false,
  success: false,
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'RESET':
      return initialState
    case 'SUBSCRIBING':
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    case 'ERROR':
      return { ...state, error: action.error, loading: false }
    case 'SUCCESS':
      return { email: '', error: null, loading: false, success: true }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="h-full bg-white flex flex-col justify-between">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-[33%] sm:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5"
            >
              <h3>tsperf</h3>
            </a>
          </div>
          <a
            href="https://github.com/tsperf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="tsperf GitHub"
          >
            <svg
              className="h-[20px] w-[20px] text-black"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="currentColor"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
          </a>
        </nav>
      </header>

      <main className="isolate">
        <div className="relative pt-14">
          <div className="py-12 sm:py-36">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl flex flex-col items-start">
                  <span>TypeScript</span>
                  <span className="inline-block -my-4 text-transparent leading-snug bg-clip-text bg-gradient-to-br from-[#395ef9] to-[#ff32ab]">
                    performance
                  </span>
                  <span>made easy</span>
                </h1>
                <div className="mt-6 flex flex-col gap-6">
                  <span className="tracking-tight text-lg ">
                    We're building a suite of open-source tools that help you
                    visualise potential performance issues, detect regressions,
                    decode compiler measurements and much more.
                  </span>

                  <ul className="flex flex-row flex-wrap gap-8 justify-between bg-gray-100 rounded px-8 pt-6 pb-5 -m-0.5 mt-2">
                    <li className="flex flex-col gap-2 items-center flex-[33%] sm:flex-1">
                      <div className="bg-[#6754e8] text-xl p-3 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm0-2h16V8H4v10Zm3.5-1l-1.4-1.4L8.675 13l-2.6-2.6L7.5 9l4 4l-4 4Zm4.5 0v-2h6v2h-6Z"
                          ></path>
                        </svg>
                      </div>
                      <h2>CLI</h2>
                    </li>
                    <li className="flex flex-col gap-2 items-center flex-[33%] sm:flex-1">
                      <div className="bg-[#6754e8] text-xl p-3 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"
                          ></path>
                        </svg>
                      </div>
                      <h2>Web</h2>
                    </li>
                    <li className="flex flex-col gap-2 items-center flex-[33%] sm:flex-1">
                      <div className="bg-[#6754e8] text-xl p-3 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                          ></path>
                        </svg>
                      </div>
                      <h2>GitHub</h2>
                    </li>
                    <li className="flex flex-col gap-2 items-center flex-[33%] sm:flex-1">
                      <div className="bg-[#6754e8] text-xl p-3 rounded text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none">
                            <g
                              fill="currentColor"
                              clipPath="url(#akarIconsVscodeFill0)"
                            >
                              <path d="M.228 8.37s-.584-.427.117-.995L1.98 5.897s.467-.497.962-.064l15.081 11.542v5.534s-.007.87-1.11.774L.227 8.369Z"></path>
                              <path d="M4.116 11.937L.228 15.509s-.4.3 0 .837l1.805 1.66s.429.465 1.062-.065l4.121-3.158l-3.1-2.846Zm6.824.029l7.13-5.502l-.047-5.505s-.305-1.202-1.32-.576L7.216 9.11l3.724 2.856Z"></path>
                              <path d="M16.912 23.69c.414.428.916.288.916.288l5.556-2.767c.711-.49.611-1.098.611-1.098V3.588c0-.726-.735-.977-.735-.977L18.444.264c-1.052-.657-1.741.119-1.741.119s.886-.645 1.32.576v21.85c0 .15-.032.297-.095.43c-.127.259-.402.5-1.062.4l.046.051Z"></path>
                            </g>
                            <defs>
                              <clipPath id="akarIconsVscodeFill0">
                                <path
                                  fill="#fff"
                                  d="M0 0h24v24H0z"
                                ></path>
                              </clipPath>
                            </defs>
                          </g>
                        </svg>
                      </div>
                      <h2>VSCode</h2>
                    </li>
                  </ul>
                  <span className="mt-8 tracking-tight max-w-md">
                    Want to know when you can try it? We'll send you an email
                    just before we launch.
                  </span>
                  <div className="max-w-7xl">
                    <form
                      className="mx-auto mt-2 flex bg-black rounded-md"
                      onSubmit={async (e) => {
                        e.preventDefault()
                        dispatch({ type: 'SUBSCRIBING' })
                        const { email } = state
                        const { error } = await subscribe(email)
                        if (error) {
                          dispatch({ type: 'ERROR', error })
                        } else {
                          dispatch({ type: 'SUCCESS' })
                          setTimeout(() => {
                            dispatch({ type: 'RESET' })
                          }, 5000)
                        }
                      }}
                    >
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
                        value={state.email}
                        onChange={(e) =>
                          dispatch({
                            type: 'SET_EMAIL',
                            payload: e.target.value,
                          })
                        }
                        required
                        className="min-w-0 flex-auto rounded-l-md rounded-r-none px-2 py-2 border-black border-2 focus:ring-1 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 -mr-0.5"
                        placeholder="Enter your email"
                      />

                      <button
                        type="submit"
                        className="w-[120px] flex justify-center items-center rounded-r-md bg-black flex-none text-white px-4 py-2.5 font-semibold hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        {state.loading && (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        )}
                        {state.success && 'Thank you!'}
                        {!state.loading && !state.success && 'Notify me'}
                      </button>
                    </form>
                    {state.error && (
                      <p className="text-xs text-red-500 mt-1 text-left">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>

                  <span className="mt-8 tracking-tight max-w-md">
                    If you can't wait, or want to help out, send us a DM on
                    Twitter.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="py-6 md:order-1 md:mt-0 space-y-1">
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
            {' • '}
            <a
              className="underline underline-offset-2 hover:text-gray-700"
              href="https://github.com/tsperf/website/tree/main/PRIVACY.md"
            >
              privacy policy
            </a>
          </p>
          <p className="text-center invert">
            <a
              href="https://vercel.com/?utm_source=vignette&utm_campaign=oss"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Powered by Vercel"
            >
              <img
                src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                alt="Powered by Vercel"
                width="116" height="24"
                loading="lazy"
                className="inline-block h-6 mb-0.5"
              />
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
