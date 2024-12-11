import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './root/Root'
import Lesson from './pages/lessions/Lesson'
import Tutorials from './pages/tutorials/Tutorials'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: <Error />,
    children: [
      {
        path: '/lessions',
        element: <ProtectedRoute>
          <Lesson />
        </ProtectedRoute>
      },
      {
        path: '/tutorials',
        element: <ProtectedRoute>
          <Tutorials />
        </ProtectedRoute>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  // {
  //   path: '/admin/dashboard',
  //   element: <ProtectedRoute>
  //     <AdminDashBoard />
  //   </ProtectedRoute>,
  //   children: [
  //     {
  //       path: '/admin/dashboard/admin-profile',
  //       element: <AdminProfile />
  //     },
  //     {
  //       path: '/admin/dashboard/bike-management',
  //       element: <BikeManagement />
  //     },
  //     {
  //       path: '/admin/dashboard/user-management',
  //       element: <UserManagement />
  //     },
  //     {
  //       path: '/admin/dashboard/return',
  //       element: <ReturnBike />
  //     },
  //     {
  //       path: '/admin/dashboard/cart',
  //       element: <Cart />
  //     },
  //     {
  //       path: '/admin/dashboard/chart',
  //       element: <LineChart />
  //     },
  //     {
  //       path: '/admin/dashboard/coupon-management',
  //       element: <Coupon />
  //     }
  //   ]
  // },
  // {
  //   path: '/user/dashboard',
  //   element: <ProtectedRoute><UserDashBoard /></ProtectedRoute>,
  //   children: [
  //     {
  //       path: '/user/dashboard/profile',
  //       element: <Profile />
  //     },
  //     {
  //       path: '/user/dashboard/my-rental',
  //       element: <MyRental />
  //     },
  //     {
  //       path: '/user/dashboard/test',
  //       element: <UserProfile />
  //     },
  //     {
  //       path: '/user/dashboard/cart',
  //       element: <Cart />
  //     },

  //     {
  //       path: '/user/dashboard/booking',
  //       element: (
  //         <Elements stripe={stripePromise}>
  //           <Booking />
  //         </Elements>
  //       )
  //     },
  //     {
  //       path: '/user/dashboard/bike-list',
  //       element: <BikeList />
  //     }
  //   ]
  // }
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
