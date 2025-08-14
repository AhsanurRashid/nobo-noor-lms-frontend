import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { menuList } from "@/lib/data/menu.list"
import { IMenu } from "@/lib/types/menu.type"
import { Menu } from "lucide-react"
const MenuForMobile = () => {
  return (
    <div className="lg:hidden block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='cursor-pointer'>
              <Menu />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-60 text-sm font-semibold tracking-wide uppercase" align="start">
            {
                menuList.map((item: IMenu, index: number) => (
                    <div key={`menu-list-mobile-${index}`}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer">{item.name}</DropdownMenuItem>
                    </DropdownMenuGroup>
                    {
                        index < ( menuList.length -1 ) && (
                            <DropdownMenuSeparator />
                        )
                    }
                    </div>
                ))
            }
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default MenuForMobile