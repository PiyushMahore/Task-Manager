import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Inbox from './pages/Inbox.jsx'
import Today from './pages/Today.jsx'
import Upcoming from './pages/Upcoming.jsx'
import { TaskContextProvider } from './context/ContextProvider.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'inbox',
        element: <Inbox />
      },
      {
        path: 'today',
        element: <Today />
      },
      {
        path: 'upcoming',
        element: <Upcoming />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <TaskContextProvider>
    <RouterProvider router={router} />
  </TaskContextProvider>,
)
