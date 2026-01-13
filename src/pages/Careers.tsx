import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Heart, 
  TrendingUp, 
  Coffee, 
  BookOpen, 
  Zap,
  DollarSign,
  MapPin,
  Clock,
  ArrowRight,
  Award,
  Rocket,
  Target,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { FloatingThemeToggle } from '../components/FloatingThemeToggle';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { useEffect, useRef, useState } from 'react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const openPositions: Job[] = [
  {
    id: 'senior-fullstack-dev',
    title: 'Senior Full Stack Developer',
    department: 'Software Development',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    experience: '3+ years',
    description: 'We are looking for a talented Senior Full Stack Developer to join our engineering team and help build cutting-edge web applications.',
    responsibilities: [
      'Design and develop scalable web applications using modern frameworks',
      'Collaborate with cross-functional teams to define and implement new features',
      'Optimize applications for maximum speed and scalability',
      'Mentor junior developers and conduct code reviews',
      'Participate in technical planning and architecture decisions'
    ],
    requirements: [
      '3+ years of experience in full-stack development',
      'Strong proficiency in React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Solid understanding of RESTful APIs and microservices',
      'Excellent problem-solving and communication skills'
    ]
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Salary',
    description: 'Industry-leading compensation packages with performance bonuses and equity options.'
  },
  {
    icon: Coffee,
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours and work-life balance support.'
  },
  {
    icon: BookOpen,
    title: 'Learning & Development',
    description: 'Annual learning budget, conference tickets, and professional development opportunities.'
  },
  {
    icon: Rocket,
    title: 'Career Growth',
    description: 'Clear career progression paths with regular reviews and mentorship programs.'
  },
  {
    icon: Users,
    title: 'Team Events',
    description: 'Regular team building activities, annual retreats, and celebration events.'
  },
  {
    icon: Zap,
    title: 'Latest Tech',
    description: 'Work with cutting-edge technologies and tools to bring your best work.'
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Employee recognition programs, awards, and appreciation initiatives.'
  }
];

const cultureValues = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We embrace creativity and encourage bold ideas that push boundaries.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and diverse perspectives.'
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    description: 'We invest in our people and celebrate learning at every level.'
  },
  {
    icon: Heart,
    title: 'People-Centric',
    description: 'We prioritize well-being and create a supportive work environment.'
  }
];

// Statistics data
const stats = [
  { value: 3, suffix: '+', label: 'HAPPY CLIENTS', duration: 2000 },
  { value: 100, suffix: '%', label: 'SATISFACTION RATE', duration: 2500 },
  { value: 10, suffix: '+', label: 'PROJECTS DELIVERED', duration: 2000 },
  { value: 1, suffix: '+', label: 'INDUSTRY AWARDS', duration: 1500 }
];

// Custom easing function for smooth counter animation
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Counter component with intersection observer
function AnimatedCounter({ value, suffix, label, duration }: { 
  value: number; 
  suffix: string; 
  label: string; 
  duration: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * value);
      
      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={counterRef} className="relative group">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="text-center relative"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <div className="w-full h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
        </div>
        
        {/* Counter */}
        <div className="relative mb-3">
          <motion.span 
            className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent drop-shadow-2xl"
            animate={isVisible ? { 
              textShadow: [
                "0 0 20px rgba(239, 68, 68, 0)",
                "0 0 20px rgba(239, 68, 68, 0.3)",
                "0 0 20px rgba(239, 68, 68, 0)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            {count}{suffix}
          </motion.span>
        </div>
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
            {label}
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-0.5 w-16 mx-auto mt-3 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        />
      </motion.div>
    </div>
  );
}

export function Careers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-black/40 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-100 font-semibold shadow-lg hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300 hover:-translate-x-1 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back</span>
      </motion.button>
      <FloatingThemeToggle />
      <ScrollToTopButton />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-semibold">Join Our Team</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
              Build Your Career at UTHRIX
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Join a team of passionate innovators who are shaping the future of technology. 
              We're looking for talented individuals who want to make a real impact.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)]">
                <Users className="w-5 h-5 text-primary" />
                <span>10+ Team Members</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)]">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Remote First</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)]">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Fast Growing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 80,
                  damping: 12
                }}
              >
                <AnimatedCounter 
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  duration={stat.duration}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Culture & Values</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              We're building more than just great products—we're creating an environment 
              where everyone can thrive and do their best work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--bg-primary)] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-[var(--text-secondary)]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Employee Benefits</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              We believe in taking care of our team with comprehensive benefits and perks 
              that support your professional and personal growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-[var(--bg-secondary)] p-6 rounded-xl hover:bg-primary/5 transition-all duration-300 border-2 border-transparent hover:border-primary/20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore our current openings and find the perfect role to advance your career.
            </p>
          </motion.div>

          <div className="space-y-6">
            {openPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--bg-primary)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-secondary)]">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-secondary)]">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--bg-secondary)]">
                          <TrendingUp className="w-4 h-4" />
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <p className="text-[var(--text-secondary)] mb-6">{job.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-primary mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We're always looking for talented individuals. Send us your resume and we'll 
              keep you in mind for future opportunities that match your skills.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              Send Your Resume
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
