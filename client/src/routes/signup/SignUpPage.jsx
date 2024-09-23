import { SignUp } from '@clerk/clerk-react';
import React from 'react'

import './signUp.css';

const SignUpPage = () => {
  return (
    <div className="signUp">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  )
}

export default SignUpPage;