import routes from '@constants/routes';
import DashboardPage from '@pages/Dashboard';
import SignInPage from '@pages/SignIn';
import SignUpPage from '@pages/signUp';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: routes.signin,
        element: <SignInPage />,
      },
      {
        path: routes.signup,
        element: <SignUpPage />,
      },
      {
        path: routes.dashboard,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
