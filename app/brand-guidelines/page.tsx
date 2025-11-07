'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BrandGuidelines() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'colors', 'typography', 'components', 'spacing', 'motion', 'voice', 'usage'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-lg"
      >
        <div className="space-y-1.5">
          <div className={`w-5 h-0.5 bg-black transition-all ${mobileNavOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-black transition-all ${mobileNavOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-black transition-all ${mobileNavOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          {/* Logo Area */}
          <div className="mb-12">
            <img src="/favicon.svg" alt="Kanopy Labs" className="w-10 h-10 mb-3" />
            <h1 className="text-lg font-bold mb-0.5">Kanopy Labs</h1>
            <p className="text-xs text-gray-500">Brand System</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-0.5">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'colors', label: 'Colors' },
              { id: 'typography', label: 'Typography' },
              { id: 'components', label: 'Components' },
              { id: 'spacing', label: 'Spacing' },
              { id: 'motion', label: 'Motion' },
              { id: 'voice', label: 'Voice & Tone' },
              { id: 'usage', label: 'Usage' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left block px-3 py-2.5 text-sm rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-[#0EA5E9] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Version */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Version</p>
            <p className="text-sm font-semibold">1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200">
          <div className="px-6 lg:px-12 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-base lg:text-lg font-bold">Future Canvas</h2>
              <p className="text-xs text-gray-500">Design System</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden sm:block px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Export
              </button>
              <button className="px-3 py-2 text-xs font-medium bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors">
                Download
              </button>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-12 py-8 lg:py-12 max-w-6xl">
          {/* Hero */}
          <div className="mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0EA5E9]/10 rounded-full mb-6">
              <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#0EA5E9]">Living Document</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-none tracking-tight">
              Brand<br />
              Guidelines
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
              A complete design system for building products that inspire optimism and drive action.
            </p>
          </div>

          {/* Overview */}
          <section id="overview" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Overview</h2>
                <p className="text-sm lg:text-base text-gray-600">Foundation of our design language</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">01</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
              <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-base lg:text-lg font-bold mb-2">Optimistic</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bright colors, generous spacing, uplifting interactions
                </p>
              </div>

              <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-base lg:text-lg font-bold mb-2">Clear</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Strong hierarchy, purposeful typography, intentional color
                </p>
              </div>

              <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                <h3 className="text-base lg:text-lg font-bold mb-2">Approachable</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Rounded corners, soft shadows, friendly interactions
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {[
                { label: 'Colors', value: '12' },
                { label: 'Components', value: '24+' },
                { label: 'Type Styles', value: '8' },
                { label: 'Spacing Units', value: '9' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 lg:p-5 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Colors */}
          <section id="colors" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Colors</h2>
                <p className="text-sm lg:text-base text-gray-600">Vibrant, purposeful, accessible</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">02</div>
            </div>

            {/* Primary */}
            <div className="mb-12 lg:mb-16">
              <h3 className="text-lg lg:text-xl font-bold mb-6">Primary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <button
                  onClick={() => copyToClipboard('#0EA5E9')}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="h-40 lg:h-48 bg-[#0EA5E9] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/10" />
                    <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
                      <div className="flex items-end justify-between text-white">
                        <div>
                          <p className="text-xl lg:text-2xl font-bold mb-1">Electric Blue</p>
                          <p className="text-xs lg:text-sm text-white/80">Primary actions</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                            {copiedColor === '#0EA5E9' ? '✓ Copied' : 'Copy'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5 bg-white border-x border-b border-gray-200 rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <code className="text-sm font-mono font-bold">#0EA5E9</code>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>RGB: 14, 165, 233</span>
                        <span className="hidden sm:inline">HSL: 199°, 89%, 48%</span>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => copyToClipboard('#06B6D4')}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="h-40 lg:h-48 bg-[#06B6D4] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-black/10" />
                    <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
                      <div className="flex items-end justify-between text-white">
                        <div>
                          <p className="text-xl lg:text-2xl font-bold mb-1">Cyan</p>
                          <p className="text-xs lg:text-sm text-white/80">Secondary accent</p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                            {copiedColor === '#06B6D4' ? '✓ Copied' : 'Copy'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:p-5 bg-white border-x border-b border-gray-200 rounded-b-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <code className="text-sm font-mono font-bold">#06B6D4</code>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>RGB: 6, 182, 212</span>
                        <span className="hidden sm:inline">HSL: 189°, 94%, 43%</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Accent */}
            <div className="mb-12 lg:mb-16">
              <h3 className="text-lg lg:text-xl font-bold mb-6">Accent</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {[
                  { name: 'Peach', hex: '#FFA07A', use: 'Warm highlights' },
                  { name: 'Coral', hex: '#FF9A76', use: 'Success states' },
                  { name: 'Lavender', hex: '#C77DFF', use: 'Creative' },
                  { name: 'Mint', hex: '#7FD8BE', use: 'Positive' },
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group text-left"
                  >
                    <div
                      className="h-20 lg:h-24 rounded-xl mb-2 lg:mb-3 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="font-bold text-sm mb-0.5">{color.name}</p>
                    <p className="text-xs text-gray-500 mb-1">{color.use}</p>
                    <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">{color.hex}</code>
                  </button>
                ))}
              </div>
            </div>

            {/* Neutrals */}
            <div className="mb-12 lg:mb-16">
              <h3 className="text-lg lg:text-xl font-bold mb-6">Neutrals</h3>
              <div className="space-y-2">
                {[
                  { name: 'Black', hex: '#000000', rgb: '0, 0, 0' },
                  { name: 'Gray 900', hex: '#111827', rgb: '17, 24, 39' },
                  { name: 'Gray 700', hex: '#374151', rgb: '55, 65, 81' },
                  { name: 'Gray 500', hex: '#6B7280', rgb: '107, 114, 128' },
                  { name: 'Gray 300', hex: '#D1D5DB', rgb: '209, 213, 219' },
                  { name: 'Gray 100', hex: '#F3F4F6', rgb: '243, 244, 246' },
                  { name: 'Gray 50', hex: '#F9FAFB', rgb: '249, 250, 251' },
                  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255' },
                ].map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="w-full group hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 lg:gap-4 p-2 lg:p-3">
                      <div
                        className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg border border-gray-200 flex-shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-bold text-sm mb-0.5">{color.name}</p>
                        <p className="text-xs text-gray-500 truncate">RGB: {color.rgb}</p>
                      </div>
                      <code className="hidden sm:block text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {color.hex}
                      </code>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gradients */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-6">Gradients</h3>
              <div className="grid gap-4">
                {[
                  { name: 'Primary', css: 'from-[#0EA5E9] to-[#06B6D4]', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 100%)' },
                  { name: 'Warm', css: 'from-[#FFA07A] to-[#FF9A76]', gradient: 'linear-gradient(135deg, #FFA07A 0%, #FF9A76 100%)' },
                  { name: 'Hero', css: 'from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A]', gradient: 'linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #FFA07A 100%)' },
                ].map((grad) => (
                  <div key={grad.name} className="rounded-xl overflow-hidden border border-gray-200">
                    <div className="h-24 lg:h-32" style={{ background: grad.gradient }} />
                    <div className="p-3 lg:p-4 bg-white">
                      <p className="font-bold text-sm mb-1">{grad.name} Gradient</p>
                      <code className="text-xs font-mono text-gray-600 break-all">{grad.css}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography */}
          <section id="typography" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Typography</h2>
                <p className="text-sm lg:text-base text-gray-600">Clear hierarchy, excellent readability</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">03</div>
            </div>

            {/* Typeface */}
            <div className="mb-12 lg:mb-16 p-6 lg:p-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-6 lg:mb-10">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Typeface</p>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-3">Inter</h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    Variable sans-serif optimized for interfaces
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <div className="text-6xl lg:text-8xl font-bold text-gray-200">Aa</div>
                </div>
              </div>

              <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                {[
                  { weight: 'Light', value: '300' },
                  { weight: 'Regular', value: '400' },
                  { weight: 'Medium', value: '500' },
                  { weight: 'Semibold', value: '600' },
                  { weight: 'Bold', value: '700' },
                ].map((w) => (
                  <div key={w.value}>
                    <p className="text-3xl lg:text-4xl mb-2" style={{ fontWeight: w.value }}>Aa</p>
                    <p className="font-semibold text-xs">{w.weight}</p>
                    <p className="text-xs text-gray-500">{w.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Type Scale */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-6">Type Scale</h3>
              <div className="space-y-6 lg:space-y-10">
                {[
                  { name: 'Display XL', rem: '6rem', class: 'text-5xl lg:text-8xl', text: 'The future is now' },
                  { name: 'Display', rem: '4.5rem', class: 'text-4xl lg:text-7xl', text: 'Build something great' },
                  { name: 'Heading 1', rem: '3rem', class: 'text-3xl lg:text-5xl', text: 'Product excellence' },
                  { name: 'Heading 2', rem: '2.25rem', class: 'text-2xl lg:text-4xl', text: 'Clear communication' },
                  { name: 'Heading 3', rem: '1.5rem', class: 'text-xl lg:text-2xl', text: 'Consistent hierarchy' },
                  { name: 'Body Large', rem: '1.25rem', class: 'text-lg lg:text-xl', text: 'Readable typography for all users' },
                  { name: 'Body', rem: '1rem', class: 'text-base', text: 'The quick brown fox jumps over the lazy dog' },
                  { name: 'Small', rem: '0.875rem', class: 'text-sm', text: 'Perfect for captions and metadata' },
                ].map((type) => (
                  <div key={type.name} className="pb-4 lg:pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex flex-col lg:flex-row lg:items-baseline gap-3 lg:gap-6 mb-2 lg:mb-3">
                      <div className="w-full lg:w-28 flex-shrink-0">
                        <p className="text-xs font-bold text-gray-900">{type.name}</p>
                        <p className="text-xs text-gray-500 font-mono">{type.rem}</p>
                      </div>
                      <p className={`${type.class} font-bold flex-1`}>{type.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Components</h2>
                <p className="text-sm lg:text-base text-gray-600">UI building blocks</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">04</div>
            </div>

            {/* Buttons */}
            <div className="mb-12 lg:mb-16">
              <h3 className="text-lg lg:text-xl font-bold mb-6">Buttons</h3>
              <div className="space-y-4 lg:space-y-6">
                <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
                    <div>
                      <p className="font-bold text-sm mb-0.5">Primary Button</p>
                      <p className="text-xs text-gray-500">Main actions</p>
                    </div>
                    <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">.btn-primary</code>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-full shadow-lg shadow-[#0EA5E9]/30 px-6 py-5 text-sm">
                      Small
                    </Button>
                    <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-full shadow-lg shadow-[#0EA5E9]/30 px-8 py-6 text-base">
                      Default
                    </Button>
                    <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-full shadow-lg shadow-[#0EA5E9]/30 px-10 py-7 text-lg">
                      Large
                    </Button>
                  </div>
                </div>

                <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-2">
                    <div>
                      <p className="font-bold text-sm mb-0.5">Secondary Button</p>
                      <p className="text-xs text-gray-500">Alternative actions</p>
                    </div>
                    <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">.btn-secondary</code>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" className="border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/5 rounded-full px-6 py-5 text-sm">
                      Small
                    </Button>
                    <Button variant="outline" className="border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/5 rounded-full px-8 py-6 text-base">
                      Default
                    </Button>
                    <Button variant="outline" className="border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/5 rounded-full px-10 py-7 text-lg">
                      Large
                    </Button>
                  </div>
                </div>

                <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                  <p className="font-bold text-sm mb-5">States</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                    <div>
                      <Button className="w-full bg-[#0EA5E9] text-white rounded-full mb-1.5 py-5">Default</Button>
                      <p className="text-xs text-gray-500 text-center">Normal</p>
                    </div>
                    <div>
                      <Button className="w-full bg-[#0284C7] text-white rounded-full mb-1.5 py-5">Hover</Button>
                      <p className="text-xs text-gray-500 text-center">On hover</p>
                    </div>
                    <div>
                      <Button className="w-full bg-[#0EA5E9] text-white rounded-full ring-4 ring-[#0EA5E9]/20 mb-1.5 py-5">Focus</Button>
                      <p className="text-xs text-gray-500 text-center">Focus</p>
                    </div>
                    <div>
                      <Button disabled className="w-full rounded-full mb-1.5 py-5">Disabled</Button>
                      <p className="text-xs text-gray-500 text-center">Inactive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="mb-12 lg:mb-16">
              <h3 className="text-lg lg:text-xl font-bold mb-6">Form Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                  <p className="font-bold text-sm mb-5">Text Input</p>
                  <div className="space-y-3">
                    <Input placeholder="Enter text..." className="border-2 focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 h-12" />
                    <Input value="example@email.com" className="border-2 border-[#0EA5E9] focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 h-12" readOnly />
                    <Input placeholder="Disabled" disabled className="h-12" />
                  </div>
                </div>

                <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                  <p className="font-bold text-sm mb-5">Select</p>
                  <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 h-12 text-sm focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 focus:outline-none">
                    <option>Choose option...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-6">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg mb-3" />
                  <h4 className="text-base font-bold mb-1.5">Standard</h4>
                  <p className="text-xs text-gray-600 mb-3">Basic card with border</p>
                  <code className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded">border-2</code>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent rounded-xl border-2 border-[#0EA5E9]/30 hover:border-[#0EA5E9]/50 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-lg mb-3" />
                  <h4 className="text-base font-bold mb-1.5">Accent</h4>
                  <p className="text-xs text-gray-600 mb-3">Colored accent card</p>
                  <code className="text-xs font-mono bg-white/80 px-1.5 py-0.5 rounded">gradient-bg</code>
                </div>

                <div className="p-6 bg-black text-white rounded-xl hover:scale-[1.02] transition-transform">
                  <div className="w-10 h-10 bg-white/10 rounded-lg mb-3" />
                  <h4 className="text-base font-bold mb-1.5">Dark</h4>
                  <p className="text-xs text-white/70 mb-3">High contrast variant</p>
                  <code className="text-xs font-mono bg-white/10 px-1.5 py-0.5 rounded">dark-mode</code>
                </div>
              </div>
            </div>
          </section>

          {/* Spacing */}
          <section id="spacing" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Spacing</h2>
                <p className="text-sm lg:text-base text-gray-600">8px baseline scale</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">05</div>
            </div>

            <div className="space-y-4 lg:space-y-5">
              {[
                { name: '2xs', rem: '0.25rem', pixels: 4 },
                { name: 'xs', rem: '0.5rem', pixels: 8 },
                { name: 'sm', rem: '1rem', pixels: 16 },
                { name: 'md', rem: '1.5rem', pixels: 24 },
                { name: 'lg', rem: '2rem', pixels: 32 },
                { name: 'xl', rem: '3rem', pixels: 48 },
                { name: '2xl', rem: '4rem', pixels: 64 },
                { name: '3xl', rem: '6rem', pixels: 96 },
                { name: '4xl', rem: '8rem', pixels: 128 },
              ].map((space) => (
                <div key={space.name} className="flex items-center gap-4 lg:gap-6">
                  <div className="w-16 lg:w-24 flex-shrink-0">
                    <p className="text-sm lg:text-base font-bold mb-0.5">{space.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{space.rem}</p>
                  </div>
                  <div className="flex-1 h-10 lg:h-12 bg-gray-100 rounded-lg relative overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] rounded-lg flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${Math.min((space.pixels / 128) * 100, 100)}%` }}
                    >
                      {space.pixels >= 24 && `${space.pixels}px`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Motion */}
          <section id="motion" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Motion</h2>
                <p className="text-sm lg:text-base text-gray-600">Smooth, purposeful animations</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">06</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                <h3 className="text-sm lg:text-base font-bold mb-5">Duration</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Fast', value: '150ms', use: 'Micro-interactions' },
                    { name: 'Base', value: '300ms', use: 'Standard transitions' },
                    { name: 'Slow', value: '500ms', use: 'Complex animations' },
                  ].map((d) => (
                    <div key={d.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-bold text-sm">{d.name}</p>
                        <p className="text-xs text-gray-500">{d.use}</p>
                      </div>
                      <code className="font-mono text-xs">{d.value}</code>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-white rounded-xl border border-gray-200">
                <h3 className="text-sm lg:text-base font-bold mb-5">Easing</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Ease Out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
                    { name: 'Ease In Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
                    { name: 'Spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
                  ].map((e) => (
                    <div key={e.name} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-bold text-sm mb-1">{e.name}</p>
                      <code className="text-xs font-mono text-gray-600 break-all">{e.value}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Voice */}
          <section id="voice" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Voice & Tone</h2>
                <p className="text-sm lg:text-base text-gray-600">Communication principles</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">07</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
              <div className="p-8 lg:p-10 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent rounded-2xl border-2 border-[#0EA5E9]/20">
                <h3 className="text-lg lg:text-xl font-bold mb-6">We Are</h3>
                <ul className="space-y-3">
                  {[
                    'Optimistic but grounded',
                    'Clear and direct',
                    'Friendly and approachable',
                    'Confident but humble',
                    'Professional but human',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <p className="text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 lg:p-10 bg-gray-100 rounded-2xl border-2 border-gray-200">
                <h3 className="text-lg lg:text-xl font-bold mb-6 text-gray-400">We Avoid</h3>
                <ul className="space-y-3">
                  {[
                    'Corporate jargon',
                    'Being overly technical',
                    'Pretentious language',
                    'Generic buzzwords',
                    'Empty promises',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs flex-shrink-0 mt-0.5">
                        ×
                      </div>
                      <p className="text-sm text-gray-600">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 lg:p-8 bg-white rounded-xl border-2 border-[#0EA5E9]/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white flex-shrink-0">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#0EA5E9] mb-1.5">GOOD</p>
                    <p className="text-lg lg:text-xl font-bold mb-1.5">&quot;We turn visions into products people love.&quot;</p>
                    <p className="text-xs text-gray-600">Clear, direct, human</p>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8 bg-gray-50 rounded-xl border-2 border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 flex-shrink-0">
                    ×
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 mb-1.5">AVOID</p>
                    <p className="text-lg lg:text-xl font-bold mb-1.5 text-gray-400 line-through">&quot;Leveraging synergies to optimize deliverables.&quot;</p>
                    <p className="text-xs text-gray-500">Corporate speak, meaningless</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section id="usage" className="mb-24 lg:mb-32 scroll-mt-20">
            <div className="flex items-end justify-between mb-8 lg:mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">Usage</h2>
                <p className="text-sm lg:text-base text-gray-600">Real-world examples</p>
              </div>
              <div className="text-xs text-gray-400 font-mono">08</div>
            </div>

            <div className="space-y-8 lg:space-y-10">
              {/* Hero */}
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
                <div className="bg-gradient-to-br from-[#0EA5E9]/5 via-white to-[#FFA07A]/5 p-10 lg:p-16 text-center">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A] bg-clip-text text-transparent leading-tight">
                    Build the future<br />you imagine
                  </h1>
                  <p className="text-base lg:text-lg text-gray-600 max-w-xl mx-auto mb-8 lg:mb-10">
                    Full-stack product partners for founders who dream big
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white shadow-xl shadow-[#0EA5E9]/30 rounded-full px-10 py-6 text-base">
                      Get Started
                    </Button>
                    <Button variant="outline" className="border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/5 rounded-full px-10 py-6 text-base">
                      View Work
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t-2 border-gray-200 flex items-center justify-between">
                  <p className="font-semibold text-xs lg:text-sm">Hero Section</p>
                  <code className="text-xs font-mono bg-white px-2 py-1 rounded hidden sm:block">gradient-text + cta</code>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="rounded-2xl overflow-hidden border-2 border-gray-200">
                <div className="p-8 lg:p-12 bg-white">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-8 lg:mb-10">What we build</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {[
                      { title: 'Mobile Apps', desc: 'iOS & Android', color: '#0EA5E9' },
                      { title: 'Web Apps', desc: 'Fast & beautiful', color: '#FFA07A' },
                      { title: 'APIs', desc: 'Scalable backend', color: '#06B6D4' },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="p-6 bg-white rounded-xl border-2 hover:shadow-lg transition-all"
                        style={{ borderColor: `${item.color}33` }}
                      >
                        <div className="w-10 h-10 rounded-lg mb-4" style={{ backgroundColor: `${item.color}20` }} />
                        <h3 className="text-base font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t-2 border-gray-200 flex items-center justify-between">
                  <p className="font-semibold text-xs lg:text-sm">Feature Grid</p>
                  <code className="text-xs font-mono bg-white px-2 py-1 rounded hidden sm:block">3-col-grid</code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
