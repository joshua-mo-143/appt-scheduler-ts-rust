import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Create from './pages/appointments/create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Create/>
  )
}

export default App
