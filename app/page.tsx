'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { ArrowRight, Check, Star, Quote, Sparkles, Code, Rocket, Zap, Shield, Clock, Users, Terminal, Layers, Cpu, Database, Smartphone, Globe, Server, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTech, setActiveTech] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [typedText, setTypedText] = useState<{ [key: number]: string }>({});
  const heroRef = useRef<HTMLDivElement>(null);

  const codeLines = [
    {
      text: "const product = 'amazing';", delay: 0, tokens: [
        { text: "const", color: "text-purple-400" },
        { text: " product", color: "text-blue-400" },
        { text: " =", color: "text-gray-500" },
        { text: " 'amazing'", color: "text-green-400" },
        { text: ";", color: "text-gray-500" },
      ]
    },
    {
      text: "const result = build(product);", delay: 2000, tokens: [
        { text: "const", color: "text-purple-400" },
        { text: " result", color: "text-blue-400" },
        { text: " =", color: "text-gray-500" },
        { text: " build", color: "text-yellow-400" },
        { text: "(", color: "text-gray-500" },
        { text: "product", color: "text-blue-400" },
        { text: ");", color: "text-gray-500" },
      ]
    },
    {
      text: "// We make it happen", delay: 4000, tokens: [
        { text: "// We make it happen", color: "text-gray-500" },
      ]
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Show nav when at top, hide when scrolling down, show when scrolling up
      if (currentScrollY < 50) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTech((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const typeNextChar = () => {
      if (currentLine >= codeLines.length) return;

      const line = codeLines[currentLine];
      const fullText = line.tokens.map(t => t.text).join('');

      if (currentChar < fullText.length) {
        const newText = fullText.slice(0, currentChar + 1);
        setTypedText(prev => ({ ...prev, [currentLine]: newText }));
        currentChar++;
        timeoutId = setTimeout(typeNextChar, 50); // Typing speed
      } else {
        // Move to next line
        currentLine++;
        currentChar = 0;
        if (currentLine < codeLines.length) {
          const nextLineDelay = codeLines[currentLine].delay - (currentLine > 0 ? codeLines[currentLine - 1].delay : 0);
          timeoutId = setTimeout(typeNextChar, nextLineDelay);
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, codeLines[0].delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const techStack = [
    { name: 'React', icon: Layers, color: '#0EA5E9' },
    { name: 'Next.js', icon: Cpu, color: '#06B6D4' },
    { name: 'TypeScript', icon: Code, color: '#FFA07A' },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Enhanced cursor follower with multiple layers */}
      <div
        className="fixed w-[600px] h-[600px] rounded-full bg-linear-to-br from-[#0EA5E9]/8 via-[#06B6D4]/6 to-[#FFA07A]/8 blur-3xl pointer-events-none z-0 transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="fixed w-96 h-96 rounded-full bg-linear-to-br from-[#0EA5E9]/4 via-[#06B6D4]/3 to-[#FFA07A]/4 blur-2xl pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          transform: 'translate(-50%, -50%)',
          transitionDelay: '100ms',
        }}
      />

      {/* Navigation */}
      <Navigation scrollY={scrollY} activePage="home" isVisible={isNavVisible} />

      {/* Hero Section with parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden">
        {/* Animated grid background with parallax */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating gradient orbs */}
        <div
          className="absolute top-20 right-20 w-72 h-72 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#FFA07A]/10 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-scrollY * 0.03}px, ${-scrollY * 0.05}px)`
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-5xl lg:max-w-4xl">
            {/* Tech stack indicator with enhanced animation */}
            <div className="flex items-center gap-3 mb-8">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                const isActive = index === activeTech;
                return (
                  <div
                    key={tech.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${isActive
                      ? 'bg-[#0EA5E9]/10 border-[#0EA5E9]/30 scale-105 shadow-lg shadow-[#0EA5E9]/20'
                      : 'bg-white/50 border-gray-200/50 opacity-60'
                      }`}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-[#0EA5E9] scale-110' : 'text-gray-400'}`} />
                    <span className={`text-xs font-semibold transition-all duration-500 ${isActive ? 'text-[#0EA5E9]' : 'text-gray-500'}`}>
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Headline with enhanced animated gradient */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
              <span className="block text-gray-900">We turn visions</span>
              <span className="block relative">
                <span className="relative z-10 bg-linear-to-r from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A] bg-clip-text text-transparent bg-size-[200%_100%] animate-gradient">
                  into products
                </span>
                <span className="absolute bottom-3 left-0 right-0 h-4 bg-[#0EA5E9]/10 -rotate-1 blur-sm" />
              </span>
              <span className="block text-gray-900">people love</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              Full-stack product partners for founders who dream big. From idea to launch to scale — we handle it all.
            </p>

            {/* CTAs with enhanced effects */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="group relative overflow-hidden shadow-xl shadow-[#0EA5E9]/25 hover:shadow-2xl hover:shadow-[#0EA5E9]/35 transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50 hover:scale-105 transition-all duration-300">
                View Case Studies
              </Button>
            </div>

            {/* Trust Indicators with stagger */}
            <div className="flex flex-wrap items-center gap-8 text-sm">
              {[
                { icon: Check, text: '50+ Products Launched', color: '#0EA5E9' },
                { icon: Check, text: '100% Satisfaction Rate', color: '#06B6D4' },
                { icon: Check, text: '6-12 Week MVP Timeline', color: '#FFA07A' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600 group cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon className="w-3 h-3 transition-all duration-300" style={{ color: item.color }} />
                    </div>
                    <span className="font-medium group-hover:font-semibold transition-all">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced floating code preview with typing effect */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="w-96 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden transform transition-all duration-500 hover:scale-105">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">app.tsx</span>
            </div>
            <div className="p-5 font-mono text-sm text-gray-300 min-h-[140px]">
              <div className="space-y-3">
                {codeLines.map((line, index) => {
                  const currentTyped = typedText[index] || '';
                  const fullText = line.tokens.map(t => t.text).join('');
                  const isComplete = currentTyped.length === fullText.length;

                  return (
                    <div key={index} className="min-h-[20px]">
                      {currentTyped.length > 0 && (
                        <span>
                          {line.tokens.map((token, tokenIndex) => {
                            const tokenStart = line.tokens.slice(0, tokenIndex).reduce((acc, t) => acc + t.text.length, 0);
                            const tokenEnd = tokenStart + token.text.length;
                            const visibleText = currentTyped.slice(tokenStart, Math.min(tokenEnd, currentTyped.length));

                            if (visibleText.length === 0) return null;

                            return (
                              <span key={tokenIndex} className={token.color}>
                                {visibleText}
                              </span>
                            );
                          })}
                          {!isComplete && (
                            <span className="inline-block w-2 h-4 bg-[#0EA5E9] ml-1 animate-pulse" />
                          )}
                        </span>
                      )}
                    </div>
                  );
                })}
                {typedText[codeLines.length - 1]?.length === codeLines[codeLines.length - 1].text.length && (
                  <div className="flex items-center gap-2 mt-4 opacity-0 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                    <div className="w-2 h-4 bg-[#0EA5E9] animate-pulse" />
                    <span className="text-gray-500 text-xs">Ready to build</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar with enhanced animation */}
      <section className="py-20 border-y border-gray-100 bg-linear-to-b from-white to-gray-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-xs font-semibold text-gray-400 text-center mb-12 tracking-widest uppercase">Trusted by founders at</p>
          <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-24">
            {['TechStart', 'GrowthCo', 'InnovateLab', 'ScaleUp', 'LaunchPad'].map((name, index) => (
              <div
                key={name}
                className="text-lg font-bold text-gray-300 hover:text-gray-900 transition-all duration-500 hover:scale-125 cursor-default"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  textShadow: '0 0 20px rgba(0,0,0,0.1)'
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build with scroll animations */}
      <section id="work" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('work') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">What We Build</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              End-to-end product development
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              We build across all platforms with modern tech stacks and proven methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: 'Mobile Apps',
                description: 'Native iOS and Android applications with beautiful interfaces, smooth performance, and intuitive user experiences.',
                benefits: ['Native performance', 'App Store optimization', 'Cross-platform consistency'],
                color: '#0EA5E9'
              },
              {
                icon: Globe,
                title: 'Web Applications',
                description: 'Fast, scalable web apps built with modern frameworks, optimized for performance, and designed for growth.',
                benefits: ['SEO optimized', 'Progressive Web Apps', 'Responsive design'],
                color: '#06B6D4'
              },
              {
                icon: Server,
                title: 'Backend & APIs',
                description: 'Scalable infrastructure, robust APIs, and cloud architecture that grows seamlessly with your business.',
                benefits: ['Auto-scaling', '99.9% uptime', 'Secure by default'],
                color: '#FFA07A'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleSections.has('work');
              return (
                <div
                  key={item.title}
                  className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-full p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl group-hover:-translate-y-2 flex flex-col">
                    {/* Icon with clean design */}
                    <div className="mb-8">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          backgroundColor: `${item.color}15`
                        }}
                      >
                        <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" style={{ color: item.color }} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg grow">{item.description}</p>

                    {/* Benefits */}
                    <ul className="space-y-3.5 mt-auto">
                      {item.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-3 text-gray-700 group/benefit transition-all duration-300"
                        >
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all duration-300 group-hover/benefit:scale-110"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <Check className="w-3 h-3" style={{ color: item.color }} />
                          </div>
                          <span className="font-medium text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section id="process" className="py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
        {/* Animated grid background with parallax - matching hero */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.1}px)`,
          }}
        />

        {/* Floating gradient orbs - matching hero */}
        <div
          className="absolute top-20 right-20 w-72 h-72 bg-[#0EA5E9]/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#FFA07A]/10 rounded-full blur-3xl animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-scrollY * 0.03}px, ${-scrollY * 0.05}px)`
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('process') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">How We Work</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              A proven process that delivers
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              From initial concept to scale, we guide you through every step
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
              {[
                {
                  step: '01',
                  title: 'Strategy & Design',
                  description: 'We start by understanding your vision, market, and users. Then we design intuitive experiences that solve real problems.',
                  icon: Sparkles,
                  color: '#0EA5E9'
                },
                {
                  step: '02',
                  title: 'Development & Launch',
                  description: 'Clean code, modern tech stack, and agile development. We build fast without cutting corners, then launch with confidence.',
                  icon: Code,
                  color: '#06B6D4'
                },
                {
                  step: '03',
                  title: 'Growth & Scale',
                  description: 'We help you iterate, optimize, and scale as your product grows. Ongoing support and continuous improvement.',
                  icon: Rocket,
                  color: '#FFA07A'
                }
              ].map((item, index) => {
                const Icon = item.icon;
                const isVisible = visibleSections.has('process');
                const isLast = index === 2;
                return (
                  <div key={item.step} className="relative group/card">
                    <div
                      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      {/* Card with hover effects matching "What We Build" */}
                      <div className="relative h-full p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl group-hover/card:-translate-y-2 flex flex-col">
                        {/* Icon with clean design */}
                        <div className="mb-8">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/card:scale-110 group-hover/card:rotate-3"
                            style={{
                              backgroundColor: `${item.color}15`
                            }}
                          >
                            <Icon className="w-8 h-8 transition-transform duration-500 group-hover/card:scale-110" style={{ color: item.color }} />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-lg grow">{item.description}</p>
                      </div>
                    </div>

                    {/* Arrow connector between cards - hidden on mobile, shown on desktop */}
                    {!isLast && (
                      <div className="hidden lg:flex absolute top-1/2 right-0 translate-x-full -translate-y-1/2 z-10 items-center" style={{ width: '3rem' }}>
                        {/* Connecting line - spans the gap */}
                        <div className="flex-1 h-0.5 bg-linear-to-r from-gray-300 to-gray-200 group-hover/card:from-[#0EA5E9] group-hover/card:via-[#06B6D4] group-hover/card:to-[#FFA07A] transition-all duration-500" />

                        {/* Arrowhead */}
                        <div className="shrink-0 -ml-0.5">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="transition-all duration-500 group-hover/card:translate-x-1"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400 group-hover/card:text-[#06B6D4] transition-colors duration-500"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Stats with enhanced interactions - Mobile Optimized */}
      <section className="py-20 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-32 items-start lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Why Choose Us</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">
                We're product partners, not just developers
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed">
                We're not just developers — we're product partners who care about your success. Every decision we make is with your vision in mind.
              </p>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  'Full-stack expertise from day one',
                  'Founder-friendly process and communication',
                  'Proven track record of successful launches',
                  'Ongoing support after launch',
                  'Transparent pricing and timelines'
                ].map((benefit, index) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 sm:gap-4 group cursor-default transition-all duration-300 hover:translate-x-1 sm:hover:translate-x-2"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-[#0EA5E9]/20">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0EA5E9] transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-medium group-hover:font-semibold transition-all">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats Grid - Mobile Optimized */}
            <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { value: '50+', label: 'Products launched', color: '#0EA5E9' },
                { value: '100%', label: 'Client satisfaction', color: '#06B6D4' },
                { value: '6-12', label: 'Weeks to MVP', color: '#FFA07A' },
                { value: '24/7', label: 'Support available', color: '#C77DFF' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative p-6 sm:p-8 lg:p-10 bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-default"
                >
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-500" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 font-semibold group-hover:font-bold transition-all leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with enhanced design */}
      <section id="testimonials" className="py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <Quote className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              What founders say about us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'Kanopy Labs took our idea from concept to launch in 8 weeks. The team understood our vision and delivered beyond expectations. They\'re not just developers — they\'re true partners.',
                author: 'Sarah Chen',
                role: 'Founder & CEO, TechStart',
                rating: 5
              },
              {
                quote: 'Working with Kanopy Labs felt like having a co-founder who codes. They\'re strategic, fast, and genuinely care about our success. Best decision we made for our product.',
                author: 'Michael Rodriguez',
                role: 'CEO, GrowthCo',
                rating: 5
              }
            ].map((testimonial, index) => {
              const isVisible = visibleSections.has('testimonials');
              return (
                <div
                  key={index}
                  className={`relative bg-white p-12 rounded-3xl border-2 border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Quote className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#0EA5E9] text-[#0EA5E9] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-10 leading-relaxed text-lg relative z-10 font-medium group-hover:text-gray-900 transition-colors">{testimonial.quote}</p>
                  <div className="pt-8 border-t border-gray-100">
                    <div className="font-bold text-gray-900 text-xl group-hover:text-[#0EA5E9] transition-colors">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 mt-1">{testimonial.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Minimal & Modern - Mobile Optimized */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        {/* Subtle background with minimal pattern */}
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0 opacity-[0.02] transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0,0,0) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0,0,0) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.05}px)`,
          }}
        />

        {/* Single floating gradient orb - subtle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-linear-to-br from-[#0EA5E9]/5 via-[#06B6D4]/3 to-[#FFA07A]/5 rounded-full blur-3xl"
          style={{
            transform: `translate(calc(-50% + ${scrollY * 0.02}px), calc(-50% + ${scrollY * 0.03}px))`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center space-y-8 sm:space-y-10">
            {/* Headline with gradient text - Mobile Optimized */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
              <span className="block text-gray-900 mb-1 sm:mb-2">Ready to build</span>
              <span className="block relative">
                <span className="relative z-10 bg-linear-to-r from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A] bg-clip-text text-transparent bg-size-[200%_100%] animate-gradient">
                  something amazing?
                </span>
                <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#0EA5E9]/10 -rotate-1 blur-sm" />
              </span>
            </h2>

            {/* Single CTA Button - Brand Guidelines Compliant */}
            <div className="flex flex-col items-center gap-5 sm:gap-6">
              <Link href="/contact" className="group w-full sm:w-auto">
                <Button
                  className="relative overflow-hidden shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/40 transition-all duration-500 hover:scale-105 w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto font-semibold rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </Button>
              </Link>

              {/* Trust indicators - minimal inline - Mobile Optimized */}
              <p className="text-xs sm:text-sm text-gray-500 font-medium flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6">
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0EA5E9]" />
                  Free consultation
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#06B6D4]" />
                  No commitment
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFA07A]" />
                  50+ products launched
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Brand Guidelines Compliant */}
      <footer className="border-t-2 border-gray-100 py-12 sm:py-16 bg-linear-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#0EA5E9]/20">
                <img src="/favicon.svg" alt="Kanopy Labs" className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-sm sm:text-base font-semibold tracking-tight text-gray-900">Kanopy Labs</span>
            </Link>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-sm">
              <Link
                href="/about"
                className="font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} Kanopy Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
