import React, { Children } from 'react'
import Navigation from './Navigation'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div>
        <Navigation/>
        <div className='flex flex-row justify-center min-h-screen'>
        {children}
        </div>
    </div>
  )
}

export default Layout