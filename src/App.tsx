import { createClient, type PostgrestError } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { useReducer } from 'react'

const supabase = createClient<Database>(
  'https://tolzxagdkwvomdmumxrx.supabase.co',
  import.meta.env.VITE_APP_SUPABASE_KEY,
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

  console.log(state)

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
                  <div className="mx-auto max-w-7xl">
                    <span className="mx-auto text-center tracking-tight">
                      Join the waitlist and get notified when we launch.
                    </span>
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
                        className="w-[120px] flex justify-center items-center rounded-r-md bg-black flex-none text-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
