import { useRoutes } from 'react-router-dom';


import { NotFound } from './routes/NotFound';
import { MarsForm } from './routes/MarsForm';
import MoonForm from './routes/MoonForm';
import { RegistrationPage } from './routes/RegistrationPage';

export const App = () => {
  const element = useRoutes([
    { path: '/', element: <RegistrationPage /> },
    { path: '/mars', element: <MarsForm /> },
    { path: '/moon', element: <MoonForm /> },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <div className="app">
      {element}
    </div>
  );
};

