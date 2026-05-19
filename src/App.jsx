import React, { useState, useEffect } from 'react';
import { 
  Home, User, Mail, Github, Instagram, Download, ExternalLink,
  Code, Briefcase, ArrowLeft, Sword, Cpu, Palette, Shield, Sparkles
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Profile' },
    { id: 'projects', icon: Briefcase, label: 'Projects' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 sm:p-8 font-sans text-slate-200 relative overflow-hidden">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/40 blur-[150px] animate-float-slow mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-fuchsia-900/30 blur-[130px] animate-float-reverse mix-blend-screen" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-900/20 blur-[100px] animate-pulse-glow mix-blend-screen" />
      </div>
      
      {/* Main Container */}
      <div className={`max-w-5xl w-full flex flex-col sm:flex-row gap-6 sm:h-[700px] z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Sidebar Navigation */}
        <nav className="sm:w-24 glass-card rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex sm:flex-col items-center justify-between sm:justify-start py-4 sm:py-8 px-6 sm:px-4 shrink-0 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Logo */}
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg sm:mb-12 nav-ripple cursor-pointer animate-fade-scale">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full animate-spin-slow opacity-80" />
            <div className="absolute inset-1 bg-[#050510] rounded-full" />
            <span className="relative z-10 gradient-text">AA</span>
          </div>

          {/* Nav Icons */}
          <div className="flex sm:flex-col gap-4 sm:gap-8 z-10">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative p-3 rounded-2xl transition-all duration-500 group nav-ripple
                    ${isActive 
                      ? 'bg-indigo-500/20 text-indigo-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] scale-110' 
                      : 'text-slate-400 hover:bg-white/10 hover:text-slate-200 hover:scale-105'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  title={item.label}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-bounce-subtle' : ''} />
                  
                  {/* Indicator Dot */}
                  {isActive && (
                    <span className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400 hidden sm:block shadow-[0_0_12px_rgba(129,140,248,1)] animate-pulse-glow" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 glass-card rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/5 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="h-full overflow-y-auto custom-scrollbar p-6 sm:p-12 relative z-10 scroll-smooth">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'contact' && <ContactView />}
          </div>
        </main>

      </div>
    </div>
  );
}

// --- VIEWS ---

function HomeView() {
  const skills = [
    { name: 'Python', level: 88, color: 'from-blue-500 to-indigo-500' },
    { name: 'HTML, CSS & JavaScript', level: 82, color: 'from-amber-400 to-orange-500' },
    { name: 'Data Visualization', level: 80, color: 'from-emerald-400 to-teal-500' },
    { name: 'NumPy & Pandas', level: 78, color: 'from-indigo-400 to-purple-500' },
    { name: 'Machine Learning', level: 70, color: 'from-fuchsia-500 to-pink-500' },
    { name: 'UI/UX Design', level: 72, color: 'from-rose-400 to-red-500' },
  ];

  return (
    <div className="animate-slide-up">
      {/* Top Profile Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mb-12 relative">
        
        {/* Profile Image with Animated Orbit */}
        <div className="relative group shrink-0 animate-fade-scale">
          <div className="absolute inset-[-10px] rounded-full border border-indigo-500/30 border-dashed animate-spin-slow opacity-50" />
          <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-blue-500 shadow-[0_0_40px_rgba(129,140,248,0.3)] group-hover:shadow-[0_0_60px_rgba(192,132,252,0.5)] transition-shadow duration-700">
            <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-[#050510] relative">
              <img 
                src="/profile/me.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                <Sparkles size={20} className="text-white animate-bounce-subtle" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center sm:text-left pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4 animate-slide-left delay-100">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Available for work
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight animate-slide-left delay-200">
            Hi, I'm <span className="gradient-text cursor-blink">Avinesh</span>
          </h1>
          <p className="text-lg text-slate-300 mb-4 max-w-xl leading-relaxed animate-slide-left delay-300">
            A passionate developer architecting elegant solutions. I bridge the gap between <strong className="text-white">Data Science</strong> and <strong className="text-white">Full-Stack Development</strong> to build experiences that matter.
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

      {/* Skills Section */}
      <div className="animate-slide-up delay-400">
        <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2">
          <Code size={18} /> Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="group" style={{ animationDelay: `${400 + index * 100}ms` }}>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-200 group-hover:text-white transition-colors">{skill.name}</span>
                <span className="text-slate-400 font-mono text-xs group-hover:text-white transition-colors">{skill.level}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} animate-skill-fill relative overflow-hidden`}
                  style={{ width: `${skill.level}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- PROJECT DATA ---

const projectsData = [
  {
    id: 'dungeons-and-dragons',
    title: 'Dungeons-and-Dragons',
    tagline: 'High-Octane Action Platformer • Gameathon 2026',
    tech: 'Godot 4 • GDScript',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Avineshwaran-A/Dungens-and-dragons-.git',
    summary: 'A high-octane action platformer featuring responsive controls, AI enemies, and a multi-phase boss fight. Created for Gameathon 2026, demonstrating advanced game design patterns.',
    theme: 'indigo',
    sections: [
      {
        icon: 'palette', label: 'Aesthetic & Polish', color: 'indigo',
        items: [
          { title: 'Gradient UI', desc: 'Dynamic health bars with HSL color schemes' },
          { title: 'Animations', desc: 'Smooth tweens and fade transitions' },
        ]
      },
      {
        icon: 'sword', label: 'Combat & Mechanics', color: 'rose',
        items: [
          { title: 'Velocity Movement', desc: 'Physics-based jumping and tight controls' },
          { title: 'Skeletal Sentinel', desc: 'FSM AI with proximity detection' },
        ]
      }
    ]
  },
  {
    id: 'smart-resource-framework',
    title: 'Smart Resource Allocation',
    tagline: 'Intelligent Resource Management System',
    tech: 'Python • Scikit-Learn • SQLite',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/Avineshwaran-A/Smart-Resource-Framework-Allocation.git',
    summary: 'A Python application that integrates machine learning to predict CPU burst times, paired with Shortest Job First scheduling for optimal resource management.',
    theme: 'emerald',
    sections: [
      {
        icon: 'cpu', label: 'Core Functionality', color: 'indigo',
        items: [
          { title: 'Predictive Analytics', desc: 'Linear Regression for CPU burst prediction' },
          { title: 'SJF Scheduling', desc: 'Optimized task execution order' },
        ]
      },
      {
        icon: 'palette', label: 'Technical Stack', color: 'emerald',
        items: [
          { title: 'Tkinter UI', desc: 'Modern desktop interface' },
          { title: 'Matplotlib', desc: 'Real-time data visualization' },
        ]
      }
    ]
  }
];

function ProjectsView() {
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return <ProjectDetailView project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div className="animate-slide-up">
      <section className="mb-14">
        <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight animate-slide-left">About Myself</h2>
        <div className="prose prose-slate max-w-3xl text-slate-300 leading-relaxed space-y-4 mb-8 animate-slide-left delay-100">
          <p>
            I enjoy solving problems, creating useful applications, and continuously improving my technical skills through hands-on practice. I have worked on projects related to data analysis, machine learning, chatbot development, and web applications.
          </p>
        </div>
        
        <button 
          className="neon-btn flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium text-sm animate-slide-left delay-200"
        >
          <span><Download size={18} /></span>
          <span>Download Resume</span>
        </button>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

      <section>
        <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight animate-slide-left delay-300">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="card-3d group flex flex-col rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer shimmer-border animate-slide-up"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-full h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/50 to-transparent z-10" />
                
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold px-2.5 py-1 bg-white/10 backdrop-blur-md text-white rounded-lg border border-white/20">
                      {project.tech}
                    </span>
                    <span className="text-4xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col bg-[#050510]/50">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{project.summary}</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    View Case Study <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectDetailView({ project, onBack }) {
  return (
    <div className="animate-slide-left">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
        Back to Gallery
      </button>

      <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl group">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">{project.title}</h2>
          <p className="text-indigo-300 font-medium text-lg">{project.tagline}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-400" /> Overview
            </h3>
            <p className="text-slate-300 leading-relaxed">{project.summary}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.sections.map((section, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <h4 className="text-indigo-400 font-bold mb-3 uppercase tracking-wider text-xs">{section.label}</h4>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm">
                      <strong className="text-white block mb-0.5">{item.title}</strong>
                      <span className="text-slate-400">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:w-64 shrink-0 space-y-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn w-full flex items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl"
          >
            <span><Github size={18} /></span>
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="animate-slide-up h-full flex flex-col justify-center max-w-2xl mx-auto py-10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Let's Build <span className="gradient-text">Together</span></h2>
        <p className="text-slate-400 text-lg">
          My inbox is always open for new opportunities, collaborations, or just a friendly chat.
        </p>
      </div>

      <div className="space-y-4 relative z-10">
        {[
          { icon: Mail, label: 'Email', value: 'avineshwaran1910@gmail.com', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=avineshwaran1910@gmail.com', color: 'indigo' },
          { icon: Github, label: 'GitHub', value: 'github.com/Avineshwaran-A', link: 'https://github.com/Avineshwaran-A', color: 'slate' },
          { icon: Instagram, label: 'Instagram', value: '@avinesh.jpeg', link: 'https://www.instagram.com/avinesh.jpeg/', color: 'pink' }
        ].map((contact, i) => {
          const Icon = contact.icon;
          return (
            <a 
              key={i}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-3d group flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 shimmer-border animate-slide-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-inner border border-white/5">
                <Icon size={28} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{contact.label}</div>
                <div className="text-xl font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {contact.value}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
