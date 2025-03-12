import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainPage from './pages/MainPage';
import UncontrolledForm from './pages/UncontrolledForm';
import HookForm from './pages/HookForm';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'uncontrollerForm',
        element: <UncontrolledForm />,
      },
      {
        path: 'hookForm',
        element: <HookForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
