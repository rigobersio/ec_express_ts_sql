import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './MainLayout';
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from './pages/LogoutPage';
import GalleryPage from './pages/GalleryPage';
import ProfilePage from './pages/ProfilePage';
import PaymentGateway from './pages/PaymentGateway';
import ProtectedRoutes from './components/ProtectedRoutes';
import Error from './components/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      path: "/gallery",
      element: (
        <MainLayout>
          <GalleryPage />
        </MainLayout>
      ),
      errorElement: <Error />
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/payment",
          element: (
            <MainLayout>
              <PaymentGateway />
            </MainLayout>
          ),
          errorElement: <Error />
        },
        {
          path: "/logout",
          element: (
            <MainLayout>
              <LogoutPage />
            </MainLayout>
          ),
          errorElement: <Error />
        },
        {
          path: "/profile",
          element: (
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          ),
          errorElement: <Error />
        },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;