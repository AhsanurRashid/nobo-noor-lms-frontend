import Logo from '@/components/layout/logo'
import ThemeToggler from '@/components/layout/toggle-theme'
import UserAvatar from '@/components/layout/user-avatar'

const NavbarForAdmin = () => {
  return (
    <header>
        <nav className='flex items-center justify-between px-5 py-1.5 bg-gray-100 dark:bg-gray-600'>
            <Logo />
            <div className="flex items-center space-x-2">
              <UserAvatar />
              <ThemeToggler />
            </div>
            
        </nav>
    </header>
  )
}

export default NavbarForAdmin