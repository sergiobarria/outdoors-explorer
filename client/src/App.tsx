import { ToastContainer } from 'react-toastify'

import { AppProvider } from '@/providers'

export default function App() {
  return (
    <>
      <AppProvider />
      <ToastContainer />
    </>
  )
}
