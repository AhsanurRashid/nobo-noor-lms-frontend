import Logo from "@/components/layout/logo";
import { Facebook, Headset, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import ThemeToggler from "@/components/layout/toggle-theme";
import { Button } from "@/components/ui/button";
import UserAvatar from "./user-avatar";
import MenuForMobile from "./menu-for-mobile";
import MenuList from "@/components/common/menu-list";
const Navbar = () => {
  return (
    <header>
        <div className="bg-gray-100 dark:bg-gray-600 px-5 py-1.5 rounded-b-lg flex items-center justify-between">
            <div className="flex items-center sm:space-x-6 space-x-2">
                <div className="flex items-center text-muted-foreground text-xs font-semibold tracking-wide space-x-1">
                <Headset size={15} /> 
                <p className="sm:block hidden">Call us now:</p>
                <p>+8801777644763</p>
                </div>
                <div className="flex items-center text-muted-foreground text-xs font-semibold tracking-wide space-x-1">
                <Mail size={15} /> 
                <p className="sm:block hidden">Email us:</p>
                <p>info@example.com</p>
                </div>
            </div>
            
            <div className="flex items-center space-x-2"> 
                <div className="sm:flex hidden items-center">
                    <Button variant="ghost" size="icon">
                        <Facebook size={15} className="inline-block text-muted-foreground cursor-pointer" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Instagram size={15} className="inline-block text-muted-foreground cursor-pointer" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Twitter size={15} className="inline-block text-muted-foreground cursor-pointer" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Linkedin size={15} className="inline-block text-muted-foreground cursor-pointer" />
                    </Button>
                </div>
                <div>
                    <ThemeToggler />
                </div>
            </div>
        </div>
        <nav className="grid lg:grid-cols-4 grid-cols-2 items-center py-4">
            <div className="flex items-center justify-start gap-3">
                <Logo />
                <MenuForMobile />
            </div>
            
            <MenuList />

            <div className="flex justify-end">
                <UserAvatar />
            </div>
        </nav>
    </header>
  )
}

export default Navbar