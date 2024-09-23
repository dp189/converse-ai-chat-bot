import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './layout/rootLayout/RootLayout.jsx';
import HomePage from './routes/homepage/HomePage.jsx';
import DashBoardLayout from './layout/dashboard/DashBoardLayout.jsx';
import DashBoard from './routes/dashboard/DashBoard.jsx';
import ChatPage from './routes/chatpage/ChatPage.jsx';
import SignInPage from './routes/signin/SignInPage.jsx';
import SignUpPage from './routes/signup/SignUpPage.jsx';
import ContactUs from './routes/contactuspage/ContactUs.jsx';

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <HomePage/>,
      },
      {
        path: '/sign-in/*',
        element: <SignInPage/>,
      },
      {
        path: '/sign-up/*',
        element: <SignUpPage/>,
      },
      {
          path: '/contact-us',
          element: <ContactUs/>
      },
      {
        element: <DashBoardLayout/>,
        children: [
          
          {
            path:'/dashboard',
            element: <DashBoard/>,
          },
          {
            path:'/dashboard/chat/:id',
            element: <ChatPage/>
          }
        ]
      }
    ]

  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  ,
)
