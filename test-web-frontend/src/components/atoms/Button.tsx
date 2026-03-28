type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, className = "", ...props }: Props) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded text-white ${className}`}
    >
      {children}
    </button>
  );
};