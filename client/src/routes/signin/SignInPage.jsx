
import { SignIn } from '@clerk/clerk-react';
import React from 'react'

import './signIn.css';

const SignInPage = () => {
  return (
    <div className="signPage" id="signIn" >
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl={`${import.meta.env.VITE_REDIRECT_URL}/dashboard`}/>
    </div>
  )
}

export default SignInPage;