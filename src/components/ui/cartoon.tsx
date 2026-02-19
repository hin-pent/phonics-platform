import React from 'react';
import { cn } from '@/lib/utils';
import '@/styles/cartoon-design-system.css';

interface CartoonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'orange' | 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  animate?: 'bounce' | 'wiggle' | 'pulse';
  className?: string;
  children: React.ReactNode;
}

export function CartoonButton({
  variant = 'orange',
  size = 'md',
  icon,
  animate,
  className,
  children,
  ...props
}: CartoonButtonProps) {
  const baseClasses = 'btn-cartoon font-cartoon inline-flex items-center justify-center space-x-2';
  
  const variantClasses = {
    orange: 'btn-cartoon',
    blue: 'btn-cartoon-blue',
    green: 'btn-cartoon-green',
    purple: 'btn-cartoon-purple'
  };

  const sizeClasses = {
    sm: 'py-3 px-6 text-sm',
    md: 'py-4 px-8 text-base',
    lg: 'py-5 px-10 text-lg'
  };

  const animateClasses = animate ? `animate-${animate}-cartoon` : '';

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        animateClasses,
        className
      )}
      {...props}
    >
      {icon && <span className="icon-cartoon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

interface CartoonCardProps {
  variant?: 'orange' | 'blue' | 'green' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export function CartoonCard({
  variant = 'orange',
  children,
  className
}: CartoonCardProps) {
  return (
    <div className={cn(
      'card-cartoon',
      `card-cartoon-${variant}`,
      className
    )}>
      {children}
    </div>
  );
}

interface CartoonCardHeaderProps {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

export function CartoonCardHeader({
  icon,
  title,
  subtitle,
  className
}: CartoonCardHeaderProps) {
  return (
    <div className={cn('card-cartoon-header', className)}>
      {icon && <span className="icon-cartoon">{icon}</span>}
      <div>
        <h3 className="card-cartoon-title">{title}</h3>
        {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

interface CartoonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
}

export function CartoonInput({
  label,
  icon,
  error,
  className,
  ...props
}: CartoonInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-cartoon font-bold text-orange-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400">
            <span className="icon-cartoon text-2xl">{icon}</span>
          </div>
        )}
        <input
          className={cn(
            'input-cartoon',
            icon && 'pl-14',
            error && 'border-red-400',
            className
          )}
          {...props}
        />
        {props.value && !error && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
            <span className="icon-cartoon text-2xl">✨</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-600 font-cartoon text-sm animate-wiggle-cartoon">
          😅 {error}
        </p>
      )}
    </div>
  );
}

interface CartoonProgressProps {
  value: number;
  max?: number;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  showLabel?: boolean;
  className?: string;
}

export function CartoonProgress({
  value,
  max = 100,
  color = 'orange',
  showLabel = true,
  className
}: CartoonProgressProps) {
  const percentage = Math.round((value / max) * 100);
  
  const colorClasses = {
    orange: 'bg-gradient-to-r from-orange-400 to-orange-500',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-500',
    green: 'bg-gradient-to-r from-green-400 to-green-500',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-500'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm font-cartoon">
          <span className="text-gray-600">进度</span>
          <span className="font-bold">{percentage}%</span>
        </div>
      )}
      <div className="progress-cartoon">
        <div
          className={cn('progress-cartoon-fill', colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface CartoonBadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function CartoonBadge({
  children,
  variant = 'orange',
  size = 'md',
  className
}: CartoonBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={cn(
      'badge-cartoon',
      `badge-cartoon-${variant}`,
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  );
}

interface CartoonIconProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: 'bounce' | 'wiggle' | 'pulse' | 'float';
  className?: string;
}

export function CartoonIcon({
  children,
  size = 'md',
  animate,
  className
}: CartoonIconProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const animateClasses = animate ? `icon-cartoon-${animate}` : '';

  return (
    <span className={cn(
      'icon-cartoon',
      sizeClasses[size],
      animateClasses,
      className
    )}>
      {children}
    </span>
  );
}

interface CartoonBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function CartoonBorder({
  children,
  className
}: CartoonBorderProps) {
  return (
    <div className={cn('border-decoration-cartoon p-6', className)}>
      {children}
    </div>
  );
}