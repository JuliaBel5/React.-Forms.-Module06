
import { App } from './App.tsx'
import './index.css'
import { ErrorPage } from './routes/ErrorPage'
import { NotFound } from './routes/NotFound'
import { store } from './store/store'
import { MarsForm } from './routes/MarsForm.js'
import { MoonForm } from './routes/MoonForm.js'
import { ErrorBoundary } from './ErrorBoundary.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
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
