import { Loader2 } from 'lucide-react';

const SubmitButton = ({
    isPending,
    children,
    className = "",
    ...props
}: {
    isPending?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void | Promise<void>;
}) => {
  return (
    <button
      className={`flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      {...props}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
      {children}
    </button>
  )
}

export default SubmitButton