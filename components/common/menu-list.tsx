import { menuList } from '@/lib/data/menu.list'
import { IMenu } from '@/lib/types/menu.type'
import Link from 'next/link'

const MenuList = () => {
  return (
        <ul className="col-span-2 lg:flex hidden items-center justify-center space-x-6 uppercase text-sm font-semibold tracking-wide">
            {
                menuList.map((item: IMenu, index: number) => (
                    <li key={`menu-list-laptop-${index}`}>
                        <Link href={item.url} className="hover:text-blue-500">{item.name}</Link>
                    </li>
                ))
            }
        </ul>
  )
}

export default MenuList