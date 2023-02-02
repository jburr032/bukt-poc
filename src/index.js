import { ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpUsername from './components/sign-up/SignUpUsername';
import Wallet from './components/wallet/Wallet';
import HomePage from './pages/HomePage';
import Root from './Root';
import theme from './theme';
import Welcome from './components/welcome/Welcome';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './redux/Store';
import FeedPage from './pages/Feedpage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    //errorElement: <ErrorPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpUsername />,
  },
  {
    path: '/login',
    element: <Login />,
    //errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      <Wallet>
        <Root />
      </Wallet>
    ),
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
        //errorElement: <ErrorPage />,
      },
      {
        path: '/feed',
        element: <FeedPage />,
        //errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
