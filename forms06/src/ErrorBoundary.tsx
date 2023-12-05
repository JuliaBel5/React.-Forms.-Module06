import { Component, ErrorInfo, ReactNode } from 'react'

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public static getDerivedStateFromError(text: Error): ErrorBoundaryState {
    console.error(`Error boundary ${text}`)
    return { hasError: true }
  }

  state: ErrorBoundaryState = { hasError: false }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo)
  }

  public render(): ReactNode {
    const { hasError } = this.state
    const { fallback, children } = this.props
    if (hasError) {
      return fallback
    }

    return children
  }
}

interface ErrorBoundaryProps {
  children?: ReactNode
  fallback: JSX.Element
}

interface ErrorBoundaryState {
  hasError: boolean
}
