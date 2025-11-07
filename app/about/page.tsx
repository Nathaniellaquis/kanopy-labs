'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/navigation';
import { ArrowRight, Users, Target, Heart, Lightbulb, Award, Code, Rocket, Sparkles, Mail, Linkedin, Github, Twitter, TrendingUp, Zap, Shield, Globe, Coffee, Quote, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeStat, setActiveStat] = useState(0);

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
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '50+', label: 'Products Launched', icon: Rocket, color: '#0EA5E9' },
    { value: '100%', label: 'Client Satisfaction', icon: Star, color: '#06B6D4' },
    { value: '6-12', label: 'Weeks to MVP', icon: Zap, color: '#FFA07A' },
    { value: '24/7', label: 'Support Available', icon: Shield, color: '#C77DFF' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe in building products that make a real difference. Every project we take on is aligned with our mission to empower founders and create meaningful impact.',
      color: '#0EA5E9'
    },
    {
      icon: Heart,
      title: 'Founder-First',
      description: 'Your success is our success. We treat every project as if it were our own, bringing the same passion, dedication, and care that you bring to your vision.',
      color: '#06B6D4'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay at the cutting edge of technology and design, constantly learning and adapting to bring you the best solutions and experiences.',
      color: '#FFA07A'
    }
  ];

  const differentiators = [
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'We write clean, scalable code that stands the test of time. Our engineering practices ensure your product is built to last.',
      color: '#0EA5E9'
    },
    {
      icon: Globe,
      title: 'Product Thinking',
      description: 'We don\'t just code—we think about users, markets, and business models. Every feature we build serves a purpose.',
      color: '#06B6D4'
    },
    {
      icon: Sparkles,
      title: 'Design That Delights',
      description: 'Beautiful interfaces that users love. We combine aesthetics with functionality to create experiences that convert.',
      color: '#FFA07A'
    },
    {
      icon: TrendingUp,
      title: 'Growth Mindset',
      description: 'We build with scale in mind. Your product should grow seamlessly from MVP to millions of users.',
      color: '#C77DFF'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Co-Founder & CEO',
      bio: 'Former startup founder with 10+ years building products. Passionate about turning ideas into reality and helping founders succeed.',
      color: '#0EA5E9',
      funFact: 'Built 3 products before 30'
    },
    {
      name: 'Jordan Martinez',
      role: 'Co-Founder & CTO',
      bio: 'Full-stack engineer who loves clean code and scalable architecture. Previously at major tech companies, now building the future.',
      color: '#06B6D4',
      funFact: 'Open source contributor'
    },
    {
      name: 'Sam Taylor',
      role: 'Head of Design',
      bio: 'Designer with a focus on user experience and beautiful interfaces. Believes design should be both functional and delightful.',
      color: '#FFA07A',
      funFact: 'Design award winner'
    }
  ];

  const testimonials = [
    {
      quote: 'Kanopy Labs didn\'t just build our product—they became true partners. They understood our vision from day one and helped us navigate every challenge.',
      author: 'Sarah Chen',
      role: 'Founder, TechStart',
      rating: 5
    },
    {
      quote: 'Working with Kanopy Labs felt like having a co-founder who codes. They\'re strategic, fast, and genuinely care about our success.',
      author: 'Michael Rodriguez',
      role: 'CEO, GrowthCo',
      rating: 5
    }
  ];

  const culture = [
    { icon: Coffee, text: 'Remote-first culture' },
    { icon: Zap, text: 'Fast-paced environment' },
    { icon: Heart, text: 'Work-life balance' },
    { icon: Rocket, text: 'Continuous learning' }
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
      <Navigation scrollY={scrollY} activePage="about" isVisible={isNavVisible} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-32 overflow-hidden">
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
          <div className="max-w-5xl lg:max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200 shadow-sm">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">About Us</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
              <span className="block text-gray-900">We're product</span>
              <span className="block relative">
                <span className="relative z-10 bg-linear-to-r from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A] bg-clip-text text-transparent bg-size-[200%_100%] animate-gradient">
                  partners
                </span>
                <span className="absolute bottom-3 left-0 right-0 h-4 bg-[#0EA5E9]/10 -rotate-1 blur-sm" />
              </span>
              <span className="block text-gray-900">who build</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
              Founded by experienced entrepreneurs and engineers, Kanopy Labs exists to help founders turn their boldest ideas into successful products. We've been in your shoes, and we know what it takes.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated */}
      <section id="stats" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isActive = index === activeStat;
              return (
                <div
                  key={stat.label}
                  className={`group relative p-8 bg-white rounded-3xl border-2 transition-all duration-500 cursor-default ${
                    isActive ? 'border-[#0EA5E9] shadow-2xl scale-105' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                    isActive ? 'scale-110 rotate-3' : ''
                  }`}
                  style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? 'scale-110' : ''}`} style={{ color: stat.color }} />
                  </div>
                  <div className={`text-4xl lg:text-5xl font-bold mb-2 transition-all duration-500 ${isActive ? 'scale-110' : ''}`} style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Our Story</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Built by founders, for founders
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`space-y-8 text-lg lg:text-xl text-gray-600 leading-relaxed transition-all duration-1000 ${visibleSections.has('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <p className="text-xl lg:text-2xl font-medium text-gray-900">
                Kanopy Labs was born from a simple realization: building a great product shouldn't require you to become a technical expert or hire a massive team.
              </p>
              <p>
                As former founders ourselves, we've experienced the frustration of trying to bring a vision to life while juggling everything else. We know what it's like to have a brilliant idea but lack the technical resources to execute it. We've felt the pain of working with agencies that don't understand your vision, or developers who code without thinking about users.
              </p>
              <p>
                We started Kanopy Labs to be the partner we wish we'd had. A team that understands not just how to code, but how to build products that people actually want to use. We combine technical excellence with product thinking, design sensibility, and founder empathy.
              </p>
              <p>
                Today, we've helped launch 50+ products across industries, from SaaS platforms to mobile apps to marketplaces. But our mission remains the same: <strong className="text-gray-900">empower founders to build without limits.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section id="differentiators" className="py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
        {/* Animated grid background */}
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

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('differentiators') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Why We're Different</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              More than just developers
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              We bring a unique combination of skills that sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleSections.has('differentiators');
              return (
                <div
                  key={item.title}
                  className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-full p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl group-hover:-translate-y-2 flex flex-col">
                    <div className="mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          backgroundColor: `${item.color}15`
                        }}
                      >
                        <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" style={{ color: item.color }} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg grow">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section id="values" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('values') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200 shadow-sm">
              <Heart className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Our Values</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              What drives us
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isVisible = visibleSections.has('values');
              return (
                <div
                  key={value.title}
                  className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-full p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl group-hover:-translate-y-2 flex flex-col">
                    <div className="mb-8">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          backgroundColor: `${value.color}15`
                        }}
                      >
                        <Icon className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" style={{ color: value.color }} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg grow">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Our Team</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Meet the founders
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              The people behind Kanopy Labs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => {
              const isVisible = visibleSections.has('team');
              return (
                <div
                  key={member.name}
                  className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-full p-10 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl group-hover:-translate-y-2 flex flex-col">
                    <div className="mb-6">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${member.color}, ${member.color}dd)`
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300">{member.name}</h3>
                    <p className="text-gray-600 font-semibold mb-4" style={{ color: member.color }}>{member.role}</p>
                    <p className="text-gray-600 leading-relaxed mb-4 grow">{member.bio}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 italic">"{member.funFact}"</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6 border border-gray-200 shadow-sm">
              <Quote className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">What Founders Say</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Trusted by founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleSections.has('testimonials');
              return (
                <div
                  key={index}
                  className={`group relative bg-white p-10 border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Quote className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#0EA5E9] text-[#0EA5E9] transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg relative z-10 font-medium group-hover:text-gray-900 transition-colors">
                    {testimonial.quote}
                  </p>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="font-bold text-gray-900 text-xl group-hover:text-[#0EA5E9] transition-colors">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 mt-1">{testimonial.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-32 lg:py-40 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`text-center mb-20 transition-all duration-1000 ${visibleSections.has('culture') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 border border-gray-200 shadow-sm">
              <Coffee className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Our Culture</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              How we work
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {culture.map((item, index) => {
                const Icon = item.icon;
                const isVisible = visibleSections.has('culture');
                return (
                  <div
                    key={index}
                    className={`text-center p-6 bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#0EA5E9]" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-gray-50 via-white to-gray-50" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '64px 64px'
        }} />

        <div className="relative max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center bg-white rounded-3xl p-16 lg:p-20 border-2 border-gray-200 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-[#0EA5E9]/5 via-[#06B6D4]/5 to-[#FFA07A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0EA5E9]/10 rounded-full mb-8 border border-[#0EA5E9]/20">
                <Rocket className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">Let's Work Together</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Ready to build something amazing?
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                We'd love to hear about your project and see how we can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden shadow-xl shadow-[#0EA5E9]/30 hover:shadow-2xl hover:shadow-[#0EA5E9]/40 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      Get in Touch
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-gray-100 py-16 bg-linear-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-[#0EA5E9]/20">
                <img src="/favicon.svg" alt="Kanopy Labs" className="w-5 h-5" />
              </div>
              <span className="text-base font-semibold tracking-tight text-gray-900">Kanopy Labs</span>
            </Link>
            <div className="flex flex-wrap items-center gap-10 text-sm">
              <Link
                href="/about"
                className="font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4]" />
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kanopy Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
