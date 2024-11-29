import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Inbox from './pages/Inbox.jsx'
import Today from './pages/Today.jsx'
import Upcoming from './pages/Upcoming.jsx'
import { TaskContextProvider } from './context/TaskContextProvider.jsx'
import { UserContextProvider } from './context/UserContextProvider.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Inbox />
      },
      {
        path: 'today',
        element: <Today />
      },
      {
        path: 'upcoming',
        element: <Upcoming />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <TaskContextProvider>
      <RouterProvider router={router} />
    </TaskContextProvider>
  </UserContextProvider>,
)
