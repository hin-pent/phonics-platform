'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href: string;
  icon: string;
}

interface SidebarProps {
  children: ReactNode;
  items: SidebarItem[];
  title: string;
}

export function Sidebar({ children, items, title }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 border-r border-orange-100 bg-white/60 backdrop-blur-sm">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-orange-100 p-6">
            <h1 className="text-2xl font-bold text-orange-800">🐻 拼读乐园</h1>
            <p className="text-sm text-orange-600">{title}</p>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  pathname === item.href
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md"
                    : "text-orange-700 hover:bg-orange-100"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          
          {/* Footer */}
          <div className="border-t border-orange-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400"></div>
              <div>
                <p className="text-sm font-medium text-orange-900">用户名</p>
                <p className="text-xs text-orange-600">在线</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}