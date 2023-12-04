import { useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error: unknown = useRouteError()
  console.error(error)

  return (
    <div className="error">Something went wrong. Please, reload the page</div>
  )
}
