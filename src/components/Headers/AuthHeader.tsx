import LinkButton from 'components/Buttons/LinkButton'
import React from 'react'

const AuthHeader = () => {
  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-semibold text-primary-blue-dark">
              SpotFirst
            </h1>
            <div className="flex space-x-2">
              <LinkButton href="/login" layout="accent">
                Login
              </LinkButton>
              <LinkButton href="/register">Register</LinkButton>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default AuthHeader
