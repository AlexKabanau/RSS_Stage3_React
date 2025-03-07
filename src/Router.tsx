import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
// import HomePage from './app/HomePage';
// import CharacterDetails from './app/character/[id]/page';
import { characterLoader } from './loaders/characterLoader';
import HomePage from './components/HomePage';
import CharacterDetails from './components/CharacterDetails';
import { charactersLoader } from './loaders/charactersLoader';
import NotFoundPage from './components/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: ({ request }) => {
      const url = new URL(request.url);
      const search = url.searchParams.get('search') || '';
      const page = url.searchParams.get('page') || '1';
      return charactersLoader(search, Number(page));
    },
    children: [
      {
        path: '/character/:id',
        element: <CharacterDetails />,
        loader: ({ params }) => characterLoader(params.id!),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

// const AppRouter: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           path="/character/:id"
//           element={<CharacterDetails />}
//           loader={({ params }) => characterLoader(params.id!)}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;
