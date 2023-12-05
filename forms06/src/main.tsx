import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorPage } from './routes/ErrorPage'
import { MarsForm } from './routes/MarsForm'
import { MoonForm } from './routes/MoonForm'
import { NotFound } from './routes/NotFound'
import { store } from './store/store'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'mars',
        element: <MarsForm />,
      },
      {
        path: 'moon',
        element: <MoonForm />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
)
