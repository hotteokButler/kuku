import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GlobalStyle, MainWrapper } from './components/style/sty_common';
import { AuthContextProvider } from './app/auth_context';
import Layout from './components/layout';
import Login from './routes/login';
import SignIn from './routes/sign_in';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
