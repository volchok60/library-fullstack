import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { CustomProvider } from "./components/ui/provider"
import App from './App'
import './index.css'

// const handleApiError = (error: Error) => {
//   if (error instanceof ApiError && [401, 403].includes(error.status)) {
//     localStorage.removeItem("access_token")
//     window.location.href = "/login"
//   }
// }
//TODO: const queryClient = new QueryClient({
//   queryCache: new QueryCache({
//     onError: handleApiError,
//   }),
//   mutationCache: new MutationCache({
//     onError: handleApiError,
//   }),
// })
const queryClient = new QueryClient()

function fallbackRender({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ErrorBoundary
            fallbackRender={fallbackRender}
            onReset={(details) => {
              // Reset the state of your app so the error doesn't happen again
            }}
          >
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </CustomProvider>
  </React.StrictMode>
)