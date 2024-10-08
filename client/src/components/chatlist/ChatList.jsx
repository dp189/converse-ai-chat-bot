import React, { useState } from "react";
import "./chatList.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../spinner/Loader";
import { FaBars } from "react-icons/fa";
import { useAuth } from "@clerk/clerk-react";

const ChatList =  () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/chats`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      
      <div className="chatList">
        <div className="title">DASHBOARD</div>
        <Link to="/dashboard">Create a new Chat</Link>
        <Link to="/">Explore Converse AI</Link>
        <Link to="/contact-us">Contact US</Link>
        <hr />
        <div className="title">RECENT CHATS</div>
        <div className="chatlists">
          {isPending ? (
            <div style={{ margin: "20px" }}><Loader /></div>
          ) : error ? (
            <div style={{ padding: "10px", borderRadius: "10px" }}>Something went wrong</div>
          ) : !Array.isArray(data) ? (
            <div style={{ padding: "10px", borderRadius: "10px" }}>No chats found.</div>
          ) : (
            data.map((chat) => (
              <Link to={`/dashboard/chat/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))
          )}
        </div>
        <hr />
        <div className="upgrade">
          <img src="/logo.png" alt="" />
          <div className="text">
            <span>Upgrade to Pro</span>
            <span>Get Unlimited Access to all features</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
























// const ChatList = () => {
//   const { isPending, error, data } = useQuery({
//     queryKey: ["userChats"],
//     queryFn: () =>
//       axios
//         .get(`${import.meta.env.VITE_BACKEND_URL}/api/chats`, {
//           withCredentials: true,
//         })
//         .then((res) => res.data),
//   });

//   //throttle function to prevent multiple clicks
//   function throttle(func, delay) {
//     let timeoutId = null;
//     return (...args) => {
//       if (timeoutId === null) {
//         timeoutId = setTimeout(() => {
//           func(...args);
//           timeoutId = null;
//         }, delay);
//       }
//     };
//   }



//   return (
//     <div className="chatList">
//       <div className="title">DASHBOARD</div>
//       <Link to="/dashboard">Create a new Chat</Link>
//       <Link to="/">Explore Converse AI</Link>
//       <Link to="/contact-us">Contact US</Link>
//       <hr />
//       <div className="title">RECENT CHATS</div>
//       <div className="chatlists">
        
//         {isPending ? (
//           <div style={{margin:'20px'}}><Loader/></div>
//         ) : error ? (
          
//           <div>Something went wrong</div>
//         ) : !Array.isArray(data) ? (
//           <div style={{"padding":"10px", "borderRadius":"10px"}}>No chats found.</div>
//         ) : (
//           data.map((chat) => (
//             <Link to={`/dashboard/chat/${chat._id}`} key={chat._id}>
//               {chat.title}
//             </Link>
//           ))
//         )}
//       </div>
//       <hr />
//       <div className="upgrade">
//         <img src="/logo.png" alt="" />
//         <div className="text">
//           <span>Upgrade to Pro</span>
//           <span>Get Unlimited Access to all features</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatList;
