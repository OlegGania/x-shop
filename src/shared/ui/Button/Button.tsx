import cn from 'classnames';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import classes from './Button.module.scss';

type ButtonVariant = 'dark' | 'white';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant: ButtonVariant;
  style?: CSSProperties;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
};

const Button = ({
  text,
  variant,
  type = 'button',
  style,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(classes.button, {
        [classes.buttonDark]: variant === 'dark',
        [classes.buttonWhite]: variant === 'white',
        [classes.buttonDisabled]: disabled,
      })}
      style={style}
      disabled={disabled}
      type={type}
      {...props}>
      {text}
    </button>
  );
};

export default Button;
