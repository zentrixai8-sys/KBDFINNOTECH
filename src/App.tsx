/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { AdminPanel } from './components/AdminPanel';
import { Login } from './components/Login';
import { LoginModal } from './components/LoginModal';
import { ApplicationModal } from './components/ApplicationModal';
import { 
  Briefcase, 
  FileText, 
  Users, 
  GraduationCap, 
  Building2, 
  Monitor, 
  Wallet, 
  TrendingUp, 
  Database,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Search,
  Menu,
  X,
  HelpCircle,
  Calendar,
  Loader2,
  Settings
} from 'lucide-react';
import { LATEST_JOBS, SERVICES, CATEGORIES, TESTIMONIALS, FAQS, Job } from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Jobs', href: '#jobs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/90 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:rotate-12 transition-transform duration-500">
            <Briefcase className="text-primary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            KBD <span className="text-accent">FINNOTECH</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a 
              key={link.name} 
              href={link.href} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-accent font-semibold text-sm uppercase tracking-widest transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsLoginModalOpen(true)}
            className="text-white/80 hover:text-accent font-semibold text-sm uppercase tracking-widest transition-all duration-300"
          >
            Login
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-accent hover:bg-accent-light text-primary px-7 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            Apply Now
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 glass rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-white/90 hover:text-accent text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="text-white/90 hover:text-accent text-lg font-medium text-left"
              >
                Login
              </button>
              <button 
                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent text-primary px-6 py-3 rounded-xl font-bold mt-2"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-premium-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full animate-ping"></span>
              India's Premier Consultancy
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
              Your Career <br />
              <span className="text-gradient">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed font-light">
              Bridging the gap between ambition and opportunity. Experience the most refined recruitment process in Raipur.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-accent hover:bg-accent-light text-primary px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center justify-center gap-3"
              >
                Apply Now <ArrowRight size={22} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-3 group"
              >
                Post a Job <Building2 size={22} className="group-hover:text-accent transition-colors" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Stats Card */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        className="hidden xl:block absolute right-20 bottom-32 glass-dark p-10 rounded-[2.5rem] max-w-sm border-white/10"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] rotate-3">
            <TrendingUp className="text-primary w-8 h-8" />
          </div>
          <div>
            <div className="text-4xl font-black text-white tracking-tighter">95%</div>
            <div className="text-accent font-bold text-xs uppercase tracking-widest">Success Rate</div>
          </div>
        </div>
        <p className="text-white/70 text-lg font-medium leading-relaxed italic">
          "The most professional placement experience in Central India."
        </p>
        <div className="mt-6 flex items-center gap-2">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Team working" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-4xl font-bold text-accent mb-1">10+</div>
              <div className="text-white/80 font-medium">Years of Excellence</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
          >
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">About KBD FINNOTECH</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              Empowering Careers Through Trust & Excellence
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              KBD FINNOTECH is a premier job consultancy based in Raipur, Chhattisgarh. We specialize in bridging the gap between talented professionals and leading organizations. Our mission is to provide personalized career solutions that drive growth and success.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Verified Company Network',
                'Expert Career Counseling',
                'End-to-End Placement Support',
                'Industry-Specific Training'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-accent w-4 h-4" />
                  </div>
                  <span className="font-semibold text-primary">{item}</span>
                </div>
              ))}
            </div>
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg">
              Learn More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-6">Our Expertise</h2>
          <h3 className="text-5xl font-bold text-primary mb-8 tracking-tight">Premium Services for Your Success</h3>
          <p className="text-gray-500 text-xl font-light leading-relaxed">
            We offer a comprehensive range of bespoke services designed to help you navigate the competitive job market with absolute confidence.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-gray-50/50 p-10 rounded-[3rem] border border-gray-100 group hover:bg-primary transition-all duration-500 hover:shadow-[0_30px_60px_rgba(10,31,68,0.1)]"
            >
              <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent transition-all duration-500 group-hover:rotate-6">
                <service.icon className="text-primary group-hover:text-white w-10 h-10 transition-colors duration-500" />
              </div>
              <h4 className="text-2xl font-bold text-primary mb-5 group-hover:text-white transition-colors duration-500">{service.title}</h4>
              <p className="text-gray-500 leading-relaxed group-hover:text-white/70 transition-colors duration-500 text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const JobCategories = () => {
  return (
    <section className="py-32 bg-premium-gradient text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-accent font-black uppercase tracking-[0.3em] text-xs mb-6">Explore Roles</h2>
            <h3 className="text-5xl font-bold mb-6 tracking-tight">Top Job Categories</h3>
            <p className="text-white/50 text-xl font-light leading-relaxed">
              Discover elite opportunities across India's most prestigious sectors.
            </p>
          </div>
          <button className="text-accent font-bold flex items-center gap-3 hover:gap-5 transition-all duration-300 group">
            View All Categories <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "backOut" } }
              }}
              whileHover={{ y: -15, scale: 1.05, transition: { duration: 0.3 } }}
              className="glass p-10 rounded-[3rem] text-center cursor-pointer group transition-all duration-500 hover:bg-white/10"
            >
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-accent transition-all duration-500 shadow-inner">
                <cat.icon className="w-12 h-12 text-accent group-hover:text-primary transition-all duration-500" />
              </div>
              <h4 className="text-2xl font-bold tracking-tight">{cat.name}</h4>
              <p className="text-white/30 mt-3 font-medium uppercase tracking-widest text-[10px]">150+ Openings</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LatestJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<{ id: string, title: string, company: string } | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    if (!isSupabaseConfigured) {
      setJobs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('job_details')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } else if (data) {
      const formattedJobs = data.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company || 'Direct Hiring',
        category: job.category,
        location: job.location,
        locationDetail: job.location,
        salary: job.salary,
        type: job.type,
        skills: job.skills || [],
        date: new Date(job.posted_date || job.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        initial: job.company ? job.company[0].toUpperCase() : 'J'
      }));
      setJobs(formattedJobs);
    }
    setLoading(false);
  };

  const categories = ['All', ...new Set(jobs.map(j => j.category))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="jobs" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
            >
              <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Opportunities</h2>
              <h3 className="text-4xl font-bold text-primary mb-8">Latest Job Openings</h3>
            </motion.div>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm"
            >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by title or location..." 
                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium">Fetching latest opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-[3rem]">
            <Briefcase className="mb-4 opacity-20" size={60} />
            <p className="font-bold text-primary text-xl">No jobs found matching your criteria</p>
            <p className="text-sm mt-2">Check back later for new opportunities!</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <motion.div
                  layout
                  key={job.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="bg-white p-6 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-300 group relative"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-[#2D7A89] rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {job.initial}
                      </div>
                      <span className="px-4 py-1 bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-bold rounded-full">
                        {job.category}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-[#1A202C] mb-2 leading-tight uppercase">
                      {job.title}
                    </h4>
                    <p className="text-[#4A5568] text-sm font-bold mb-6 uppercase tracking-wide">
                      {job.location}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-[#4A5568] text-sm">
                        <MapPin size={18} className="text-[#2D7A89]" />
                        <span>{job.locationDetail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#4A5568] text-sm">
                        <Briefcase size={18} className="text-[#2D7A89]" />
                        <span>{job.category}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#4A5568] text-sm font-bold">
                        <Wallet size={18} className="text-[#2D7A89]" />
                        <span className="uppercase">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-[#F7FAFC] text-[#4A5568] text-[11px] font-medium rounded-full border border-gray-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar size={14} />
                      <span>{job.date}</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedJob({ id: job.id, title: job.title, company: job.company })}
                      className="bg-[#2D7A89] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#23616D] transition-all shadow-md"
                    >
                      Apply Now <ArrowRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <ApplicationModal 
          isOpen={!!selectedJob} 
          onClose={() => setSelectedJob(null)}
          jobId={selectedJob?.id || ''}
          jobTitle={selectedJob?.title || ''}
          company={selectedJob?.company || ''}
        />

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: 'Fast Placement Process', desc: 'Get hired in as little as 7 days with our streamlined recruitment workflow.' },
    { title: 'Verified Companies', desc: 'We only partner with reputable organizations to ensure your career safety.' },
    { title: 'Expert Team Support', desc: 'Our counselors are available 24/7 to guide you through every step.' },
    { title: 'High Success Rate', desc: 'Over 95% of our candidates successfully clear their interviews.' }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
          >
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Why Us?</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              The Preferred Choice for Professionals in Raipur
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-primary">{f.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                alt="Success meeting" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-10 -left-10 glass-dark p-8 rounded-3xl hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  <div className="font-bold">5000+</div>
                  <div className="text-xs text-white/60">Happy Candidates</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-primary">FAQs for Candidate</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 p-4 md:p-8"
        >
          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border-b border-gray-100 last:border-0 transition-all duration-300 ${openIndex === idx ? 'bg-white' : ''}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 px-4 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle className={`transition-colors duration-300 ${openIndex === idx ? 'text-[#2D7A89]' : 'text-gray-400'}`} size={22} />
                    <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === idx ? 'text-[#1A202C]' : 'text-[#2D3748] group-hover:text-[#2D7A89]'}`}>
                      {faq.question}
                    </span>
                  </div>
                  {openIndex === idx ? (
                    <ChevronUp className="text-[#2D7A89]" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 group-hover:text-[#2D7A89]" size={20} />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-14 pb-8 text-gray-600 leading-relaxed text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Success Stories</h2>
          <h3 className="text-4xl font-bold text-primary">What Our Candidates Say</h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex gap-8 overflow-x-auto pb-12 snap-x"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="min-w-[300px] md:min-w-[400px] bg-gray-50 p-10 rounded-3xl border border-gray-100 snap-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={18} className={idx < t.rating ? 'fill-accent text-accent' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-lg text-gray-600 italic mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {t.name[0]}
                </div>
                <div>
                  <h5 className="font-bold text-primary">{t.name}</h5>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Get In Touch</h2>
            <h3 className="text-4xl font-bold mb-8">Let's Discuss Your Future</h3>
            <p className="text-white/60 text-lg mb-12">
              Have questions or ready to start your journey? Reach out to us today. Our team is here to help you every step of the way.
            </p>

            <div className="space-y-10">
              <div>
                <h4 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <Phone className="text-accent" /> Our Career Experts
                </h4>
                <div className="grid gap-4">
                  {[
                    { name: 'Deepak', phone: '+91 70899 35002', tel: '+917089935002' },
                    { name: 'Kamlesh', phone: '+91 78285 44201', tel: '+917828544201' },
                    { name: 'Balaji', phone: '+91 83497 42500', tel: '+918349742500' }
                  ].map((person, i) => (
                    <motion.a
                      key={person.name}
                      href={`tel:${person.tel}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ x: 10 }}
                      className="glass p-5 rounded-2xl flex items-center justify-between group hover:bg-accent/10 transition-all border border-white/5 hover:border-accent/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                          <Users size={20} className="text-accent group-hover:text-primary" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">{person.name}</div>
                          <div className="text-white/50 text-sm">Placement Expert</div>
                        </div>
                      </div>
                      <div className="text-accent font-bold tracking-wider">{person.phone}</div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Our Office</h4>
                    <p className="text-white/60">Telghani Naka, Akansha Parisar, Raipur, Chhattisgarh</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Email Us</h4>
                    <p className="text-white/60">kbdfinnotech@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={smoothTransition}
            className="bg-white p-10 rounded-3xl shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-primary font-bold text-sm">Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-primary font-bold text-sm">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-primary focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div className="space-y-2">
                <label className="text-primary font-bold text-sm">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"></textarea>
              </div>
              <button className="w-full bg-accent text-primary py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-24 h-[400px] rounded-3xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.548238640722!2d81.6293453!3d21.2504246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd9063d70ad3%3A0x45d5129870477962!2sTelghani%20Naka%2C%20Raipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1711428222222!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-premium-gradient text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Briefcase className="text-primary w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">KBD <span className="text-accent">FINNOTECH</span></span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-xs">
              Raipur's most trusted job consultancy. Shaping futures and connecting talent with excellence since 2014.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map(social => (
                <motion.a 
                  key={social} 
                  href="#" 
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 group"
                >
                  <span className="sr-only">{social}</span>
                  <TrendingUp size={18} className="group-hover:scale-110" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              {[
                { name: 'Home', href: '#' },
                { name: 'About Us', href: '#about' },
                { name: 'Our Services', href: '#services' },
                { name: 'Latest Jobs', href: '#jobs' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <motion.a 
                    href={link.href} 
                    whileHover={{ x: 10, color: '#D4AF37' }}
                    className="transition-colors flex items-center gap-2"
                  >
                    <ArrowRight size={14} /> {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Job Categories</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-accent transition-colors">IT & Software</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Banking & Finance</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sales & Marketing</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Back Office</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Contact Us</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-1" />
                <span>Telghani Naka, Akansha Parisar, Raipur, Chhattisgarh</span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent shrink-0" />
                  <span className="font-bold text-white">Call Our Experts:</span>
                </div>
                <div className="pl-7 space-y-2 text-sm">
                  <a href="tel:+917089935002" className="block hover:text-accent transition-colors">Deepak: +91 70899 35002</a>
                  <a href="tel:+917828544201" className="block hover:text-accent transition-colors">Kamlesh: +91 78285 44201</a>
                  <a href="tel:+918349742500" className="block hover:text-accent transition-colors">Balaji: +91 83497 42500</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <a href="mailto:kbdfinnotech@gmail.com" className="hover:text-accent transition-colors">kbdfinnotech@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Newsletter</h4>
            <p className="text-white/60 mb-6">Subscribe to get the latest job updates directly in your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
              <button className="bg-accent text-primary p-3 rounded-xl hover:bg-accent-light transition-all shadow-lg">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© 2026 KBD FINNOTECH. All rights reserved.</p>
            <p className="text-accent/60 font-medium">
              Developed By <a href="https://zentrixs.in" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline decoration-accent/30 underline-offset-4 transition-all">Zentrixs.in</a>
            </p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/917089935002" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-all flex items-center justify-center"
      >
        <MessageCircle size={32} />
      </motion.a>

      {/* Call Now Button (Mobile Only) */}
      <motion.a 
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        href="tel:+917089935002" 
        className="md:hidden fixed bottom-6 left-6 z-40 bg-accent text-primary p-4 rounded-full shadow-2xl transition-all flex items-center justify-center"
      >
        <Phone size={32} />
      </motion.a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-40 bg-primary/80 backdrop-blur-md text-white p-3 rounded-full shadow-xl hover:bg-primary transition-all border border-white/10"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

const JobAlertSubscription = () => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          categories: selectedCategories, 
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k) 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
        setEmail('');
        setSelectedCategories([]);
        setKeywords('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to connect to the server' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-accent/5">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothTransition}
          className="max-w-5xl mx-auto glass-dark p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Never Miss a Chance</h2>
              <h3 className="text-4xl font-bold text-white mb-6">Subscribe to Personalized Job Alerts</h3>
              <p className="text-white/70 text-lg mb-8">
                Get the latest job opportunities that match your skills and interests delivered straight to your inbox.
              </p>
              
              <div className="space-y-4">
                {[
                  'Daily or weekly updates',
                  'Tailored to your preferences',
                  'Unsubscribe anytime'
                ].map((item, i) => (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <CheckCircle2 className="text-accent" size={20} />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com" 
                    className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white font-bold text-sm">Select Categories</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => toggleCategory(cat.name)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedCategories.includes(cat.name) ? 'bg-accent text-primary border-accent' : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-bold text-sm">Keywords (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, Manager, Remote" 
                  className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
                <p className="text-white/40 text-[10px]">Separate keywords with commas</p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-primary py-4 rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Set Job Alert'} <ArrowRight size={20} />
              </button>

              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
      style={{ scaleX }}
    />
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-accent text-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-accent-light transition-all"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const LandingPage = () => {
  return (
    <div className="relative">
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <JobCategories />
      <LatestJobs />
      <JobAlertSubscription />
      <WhyChooseUs />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
      
      {/* Hidden Admin Link */}
      <Link 
        to="/admin" 
        className="fixed bottom-4 left-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white/20 hover:text-white/60 transition-all z-[100]"
        title="Admin Panel"
      >
        <Settings size={18} />
      </Link>
    </div>
  );
};

const smoothTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1]
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={smoothTransition}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ user }: { user: any }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={smoothTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={user ? <AdminPanel /> : <Login />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const isDemo = localStorage.getItem('kbd_demo_session') === 'true';
      if (isDemo && !session) {
        setUser({ email: 'kbdfinnotech@gmail.com', id: 'demo-user' });
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.removeItem('kbd_demo_session');
        setUser(session.user);
      } else {
        const isDemo = localStorage.getItem('kbd_demo_session') === 'true';
        if (isDemo) {
          setUser({ email: 'kbdfinnotech@gmail.com', id: 'demo-user' });
        } else {
          setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="text-accent animate-spin" size={48} />
      </div>
    );
  }

  return (
    <Router>
      <AnimatedRoutes user={user} />
    </Router>
  );
}
