import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './rootLayouts.css'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient()

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      }}}
    >
      <QueryClientProvider client={queryClient}>
      <div className="root-layout">
          <header>
              <Link to="/" className="logo">
                  <img src="/logo.png"/>
                  <span>Convers AI</span>
              </Link>
              <div className="user">
                <SignedIn>
                  <UserButton/>
                </SignedIn>
              </div>
          </header>
          <main>
              <Outlet />
          </main>
      </div>
    </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayout