import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import Link from "next/link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * ボタンの見た目のバリエーション
   */
  variant?: "primary" | "secondary";
  /**
   * ボタンのサイズ
   */
  size?: "sm" | "md" | "lg";
  /**
   * ボタンの中身（テキストやアイコンなど）
   */
  children: ReactNode;
  /**
   * リンクとして機能させる場合のURL
   */
  href?: string;
  /**
   * ボタンの左側に表示するアイコン
   */
  startIcon?: ReactNode;
  /**
   * ボタンの右側に表示するアイコン
   */
  endIcon?: ReactNode;
  /**
   * ボタンを丸みを帯びた形状にする
   */
  rounded?: boolean;
  /**
   * ボタンを幅いっぱいに広げる
   */
  fullWidth?: boolean;
  /**
   * ボタンを無効状態にする
   */
  disabled?: boolean;
}

/**
 * アプリケーション全体で使用する汎用的なボタンコンポーネント
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      href,
      startIcon,
      endIcon,
      className = "",
      rounded = false,
      fullWidth = false,
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    // バリアントに基づくクラス名
    const variantClasses = {
      primary: "primary-button",
      secondary: "secondary-button",
    };

    // サイズに基づくクラス名
    const sizeClasses = {
      sm: "px-4 py-1 text-sm",
      md: "px-6 py-2",
      lg: "px-8 py-3 text-lg",
    };

    // 共通のクラス名を構築
    const buttonClasses = [
      variantClasses[variant],
      sizeClasses[size],
      rounded ? "rounded-full" : "rounded",
      fullWidth ? "w-full" : "",
      disabled ? "opacity-60 cursor-not-allowed" : "",
      "font-medium flex items-center justify-center gap-2 transition-all",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // ボタンの内容
    const buttonContent = (
      <>
        {startIcon && <span className="inline-flex">{startIcon}</span>}
        <span>{children}</span>
        {endIcon && <span className="inline-flex">{endIcon}</span>}
      </>
    );

    // href が指定されている場合は Link コンポーネントを使用
    if (href && !disabled) {
      return (
        <Link href={href} className={buttonClasses}>
          {buttonContent}
        </Link>
      );
    }

    // 通常のボタン要素を返す
    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
