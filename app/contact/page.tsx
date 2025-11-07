'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Navigation } from '@/components/navigation';
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or contact us directly.');
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@kanopylabs.com',
      link: 'mailto:hello@kanopylabs.com',
      color: '#0EA5E9'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: '#06B6D4'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New York, NY',
      link: 'https://maps.google.com/?q=New+York,+NY',
      color: '#FFA07A'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      text: 'Response within 24 hours',
      color: '#0EA5E9'
    },
    {
      icon: Users,
      text: 'Free consultation call',
      color: '#06B6D4'
    },
    {
      icon: MessageSquare,
      text: 'No commitment required',
      color: '#FFA07A'
    }
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
      <Navigation scrollY={scrollY} activePage="contact" isVisible={isNavVisible} />

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
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Us</span>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
              <span className="block text-gray-900">Let's build</span>
              <span className="block relative">
                <span className="relative z-10 bg-linear-to-r from-[#0EA5E9] via-[#06B6D4] to-[#FFA07A] bg-clip-text text-transparent bg-size-[200%_100%] animate-gradient">
                  something amazing
                </span>
                <span className="absolute bottom-3 left-0 right-0 h-4 bg-[#0EA5E9]/10 -rotate-1 blur-sm" />
              </span>
              <span className="block text-gray-900">together</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? We'd love to hear about it. Fill out the form below or reach out directly.
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm mb-20">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-600 group cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ backgroundColor: `${benefit.color}15` }}>
                      <Icon className="w-3 h-3 transition-all duration-300" style={{ color: benefit.color }} />
                    </div>
                    <span className="font-medium group-hover:font-semibold transition-all">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator - positioned below benefits */}
            <div className="mt-8">
              <a href="#contact-form" className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#0EA5E9] transition-colors group">
                <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
                <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-32 lg:py-40 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Send us a message
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-white border-2 border-green-200 rounded-3xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-[#0EA5E9] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-[#0EA5E9] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="h-12 border-2 border-gray-200 rounded-xl focus:border-[#0EA5E9] transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[160px] border-2 border-gray-200 rounded-xl focus:border-[#0EA5E9] transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden shadow-xl shadow-[#0EA5E9]/30 hover:shadow-2xl hover:shadow-[#0EA5E9]/40 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Get in touch
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Prefer to reach out directly? Here's how you can contact us.
              </p>

              <div className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <a
                      key={method.title}
                      href={method.link}
                      className="group block p-8 bg-white border-2 border-gray-200 rounded-3xl hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                          style={{ backgroundColor: `${method.color}15` }}
                        >
                          <Icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" style={{ color: method.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0EA5E9] transition-colors">
                            {method.title}
                          </h3>
                          <p className="text-gray-600 font-medium">{method.value}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-8 bg-gray-50 rounded-3xl border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h3>
                <ul className="space-y-3">
                  {[
                    'We review your message within 24 hours',
                    'Schedule a free consultation call',
                    'Discuss your project and requirements',
                    'Provide a detailed proposal'
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
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
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#0EA5E9] to-[#06B6D4] group-hover:w-full transition-all duration-300" />
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

