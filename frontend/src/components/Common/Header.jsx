import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-green-50 shadow-md border-b border-gray-300'>
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header
