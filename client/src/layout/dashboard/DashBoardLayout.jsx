import { useAuth } from '@clerk/clerk-react';
import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from '../../components/chatlist/ChatList';

import "./dashBoardLayout.css";
import Loader from '../../components/spinner/Loader';

const DashBoardLayout = () => {

  const {userId, isLoaded} = useAuth()
  const navigate = useNavigate();


  useEffect(() => {
    if(isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [userId, isLoaded, navigate])

  if(!isLoaded) return <div style={{margin:'20px'}}><Loader/></div>

  return (
    <div className="dashboardLayout">
      <div className="menu">
        <ChatList />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default DashBoardLayout;