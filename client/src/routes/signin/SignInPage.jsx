
import { SignIn } from '@clerk/clerk-react';
import React from 'react'

import './signIn.css';

const forcedUrl = import.meta.env.PROD_DOMAIN || 'http://localhost:5173';

const SignInPage = () => {
  return (
    <div className="signPage" id="signIn" >
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl={`${forcedUrl}/dashboard`}/>
    </div>
  )
}

export default SignInPage;