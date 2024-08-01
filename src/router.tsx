import routes from '@constants/routes';
import DashboardPage from '@pages/Dashboard';
import GoalDetailPage from '@pages/GoalDetail';
import NewNotePage from '@pages/NewNote';
import NotesPage from '@pages/Notes';
import SignInPage from '@pages/SignIn';
import SignUpPage from '@pages/SignUp';
import TodosPage from '@pages/Todos';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: routes.signIn,
        element: <SignInPage />,
      },
      {
        path: routes.signUp,
        element: <SignUpPage />,
      },
      {
        path: routes.dashboard,
        element: <DashboardPage />,
      },
      {
        path: routes.goalDetail,
        element: <GoalDetailPage />,
      },
      {
        path: routes.notes,
        element: <NotesPage />,
      },
      {
        path: routes.newNote,
        element: <NewNotePage />,
      },
      {
        path: routes.todos,
        element: <TodosPage />,
      },
    ],
  },
]);

export default router;
