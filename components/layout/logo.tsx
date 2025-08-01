import Image from 'next/image'
import logo from '@/public/assets/logo.png';
import Link from 'next/link';

const Logo = ({ className }: { className?: string}) => {
  return (
    <Link href="/">
    <Image
        src={logo}
        alt="Logo"
        width={60}
        height={60}
        className={`object-contain ${className}`}
    />
    </Link>
  )
}

export default Logo