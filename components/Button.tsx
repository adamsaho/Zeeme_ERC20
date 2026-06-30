import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./css/Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

function getClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean
): string {
  return [
    styles.button,
    styles[variant],
    size !== "md" ? styles[size] : "",
    fullWidth ? styles.fullWidth : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    children,
  } = props;

  const className = getClassName(variant, size, fullWidth);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        {icon}
        {children}
      </Link>
    );
  }

  const { href, ...buttonProps } = props as ButtonAsButton & { href?: never };

  return (
    <button className={className} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
}
