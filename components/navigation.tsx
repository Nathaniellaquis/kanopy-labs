'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface NavigationProps {
    scrollY: number;
    activePage?: 'home' | 'about' | 'contact';
    isVisible?: boolean;
}

export function Navigation({ scrollY, activePage = 'home', isVisible = true }: NavigationProps) {
    const isScrolled = scrollY > 50;

    return (
        <nav
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible
                ? 'translate-y-0 opacity-100 scale-100'
                : '-translate-y-full opacity-0 scale-95 pointer-events-none'
                }`}
        >
            {/* Floating container with glassmorphism */}
            <div
                className={`
          relative rounded-2xl border transition-all duration-500 ease-out
          ${isScrolled
                        ? 'bg-white/80 backdrop-blur-2xl border-gray-200/60 shadow-2xl shadow-black/5'
                        : 'bg-white/60 backdrop-blur-xl border-gray-200/40 shadow-lg shadow-black/3'
                    }
        `}
            >
                {/* Gradient border glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.1), rgba(255, 160, 122, 0.1))',
                        maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMaskComposite: 'xor',
                        padding: '1px',
                    }}
                />

                {/* Inner glow on scroll */}
                {isScrolled && (
                    <div
                        className="absolute -inset-px rounded-2xl bg-linear-to-r from-[#0EA5E9]/20 via-[#06B6D4]/20 to-[#FFA07A]/20 blur-xl opacity-50 -z-10 transition-opacity duration-500"
                    />
                )}

                <div className="relative px-6 lg:px-8 py-3.5 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#0EA5E9]/20">
                                <img src="/favicon.svg" alt="Kanopy Labs" className="w-5 h-5" />
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
                        </div>
                        <span className="text-base font-semibold tracking-tight text-gray-900 transition-all duration-300 group-hover:text-[#0EA5E9]">
                            Kanopy Labs
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 ml-auto">
                        <Link
                            href="/about"
                            className={`text-sm font-medium transition-all duration-300 relative group px-3 py-1.5 rounded-lg ${activePage === 'about'
                                ? 'text-gray-900 bg-gray-100/50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                                }`}
                        >
                            <span className="relative z-10">About</span>
                            {activePage === 'about' && (
                                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10" />
                            )}
                        </Link>

                        <Link href="/contact">
                            <Button
                                size="sm"
                                className="relative overflow-hidden shadow-lg shadow-[#0EA5E9]/20 hover:shadow-xl hover:shadow-[#0EA5E9]/30 transition-all duration-300 hover:scale-105 group"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <Link href="/contact" className="md:hidden">
                        <Button
                            size="sm"
                            className="relative overflow-hidden shadow-lg shadow-[#0EA5E9]/20 hover:shadow-xl hover:shadow-[#0EA5E9]/30 transition-all duration-300 hover:scale-105 group"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
