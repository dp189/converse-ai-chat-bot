import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import './rootLayouts.css';
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react';
import { FaBars } from 'react-icons/fa';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      }}}
    >
      <QueryClientProvider client={queryClient}>
        <div className="root-layout">
          <header>
            <div className="sidebar-toggle-container">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            </div>
            <div>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Convers AI Logo" />
              <span>Convers AI</span>
            </Link></div>
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            
          </header>
          <main>
            <Outlet context={{ isSidebarOpen, toggleSidebar }} />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;