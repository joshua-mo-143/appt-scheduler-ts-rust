import React, { Children } from 'react'
import Navigation from './Navigation'

type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div>
        <Navigation/>
        {children}
    </div>
  )
}

export default Layout