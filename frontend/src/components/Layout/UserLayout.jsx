import 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <div className='w-full h-0.5 bg-black my-12 opacity-20'></div>
      </main>
      <Footer />
    </>
  )
}

export default UserLayout
