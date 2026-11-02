import { Link } from 'react-router-dom';

const baseStyles =
  'group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variantStyles = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary-hover hover:shadow-lift',
  honey: 'bg-honey text-ink shadow-soft hover:bg-amber hover:text-white',
  outline: 'border border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.04]',
  whatsapp: 'bg-whatsapp text-white shadow-soft hover:bg-[#178246]',
  light: 'bg-warm-white text-ink hover:bg-soft-yellow',
};

// md is the standard button: 14px × 28px padding with 15px text.
const sizeStyles = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[52px] px-7 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

/*
  One button for the whole site.
  - <Button to="/shop">     -> internal page link
  - <Button href="https://…"> -> external link (opens in new tab)
  - <Button onClick={…}>     -> normal button
*/
function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
