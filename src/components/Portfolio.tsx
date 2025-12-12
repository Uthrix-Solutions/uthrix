import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle2,
  Code2,
  Smartphone,
  Globe
} from 'lucide-react';

interface CaseStudy {
  title: string;
  client: string;
  image: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: {
    metric: string;
    value: string;
  }[];
  category: string;
  link?: string;
}

interface PortfolioCategory {
  id: string;
  name: string;
  subcategories?: {
    id: string;
    name: string;
    icon: React.ElementType;
  }[];
  projects: CaseStudy[];
}

const portfolioData: PortfolioCategory[] = [
  {
    id: 'development',
    name: 'Development',
    subcategories: [
      { id: 'software', name: 'Software', icon: Code2 },
      { id: 'web', name: 'Web', icon: Globe },
      { id: 'mobile', name: 'Mobile', icon: Smartphone }
    ],
    projects: [
      // Software Projects
      {
        title: 'Enterprise Resource Planning System',
        client: 'Global Manufacturing Corp',
        category: 'software',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        problem: 'Client struggled with disconnected systems across 15 departments, leading to data silos, inefficient workflows, and delayed decision-making.',
        solution: 'Developed a comprehensive ERP system integrating inventory, HR, finance, and operations with real-time analytics dashboard and automated workflows.',
        technologies: ['.NET Core', 'Angular', 'SQL Server', 'Azure', 'Power BI'],
        results: [
          { metric: 'Efficiency Increase', value: '45%' },
          { metric: 'Cost Reduction', value: '$2.3M/year' },
          { metric: 'Processing Time', value: '-60%' }
        ]
      },
      {
        title: 'Healthcare Management Platform',
        client: 'MediCare Solutions',
        category: 'software',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        problem: 'Hospital network needed HIPAA-compliant patient management system to replace outdated paper-based processes and improve patient care coordination.',
        solution: 'Built secure cloud-based platform with patient records, appointment scheduling, telemedicine integration, and automated billing system.',
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'HIPAA Compliance'],
        results: [
          { metric: 'Patient Satisfaction', value: '+38%' },
          { metric: 'Admin Time Saved', value: '25 hrs/week' },
          { metric: 'Appointment No-shows', value: '-42%' }
        ]
      },
      // Web Projects
      {
        title: 'E-Commerce Platform Redesign',
        client: 'FashionHub Retail',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        problem: 'Outdated website with poor mobile experience resulted in 68% cart abandonment rate and declining sales.',
        solution: 'Complete redesign with modern UI/UX, optimized checkout flow, personalized recommendations, and progressive web app capabilities.',
        technologies: ['Next.js', 'Shopify', 'TailwindCSS', 'Stripe', 'Google Analytics'],
        results: [
          { metric: 'Conversion Rate', value: '+127%' },
          { metric: 'Mobile Sales', value: '+215%' },
          { metric: 'Page Load Time', value: '-73%' }
        ]
      },
      {
        title: 'Real Estate Listing Portal',
        client: 'PropertyPro Network',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
        problem: 'Agents needed modern platform to showcase properties with virtual tours, advanced search, and lead management.',
        solution: 'Developed feature-rich portal with 3D virtual tours, AI-powered search, CRM integration, and automated lead nurturing.',
        technologies: ['React', 'WordPress', 'AWS', 'Matterport API', 'HubSpot'],
        results: [
          { metric: 'Property Views', value: '+340%' },
          { metric: 'Lead Quality', value: '+85%' },
          { metric: 'Time on Site', value: '+156%' }
        ]
      },
      // Mobile Projects
      {
        title: 'Fitness Tracking App',
        client: 'FitLife Technologies',
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
        problem: 'Client wanted to enter competitive fitness app market with unique AI-powered personal training features.',
        solution: 'Created cross-platform mobile app with AI workout recommendations, nutrition tracking, social features, and wearable device integration.',
        technologies: ['Flutter', 'Firebase', 'TensorFlow', 'HealthKit', 'Google Fit'],
        results: [
          { metric: 'Downloads (6 months)', value: '250K+' },
          { metric: 'Daily Active Users', value: '45K' },
          { metric: 'App Store Rating', value: '4.8/5' }
        ]
      },
      {
        title: 'Food Delivery Platform',
        client: 'QuickBite Services',
        category: 'mobile',
        image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800',
        problem: 'Local restaurant consortium needed unified delivery platform to compete with major food delivery services.',
        solution: 'Built native iOS/Android apps with real-time tracking, smart routing, in-app payments, and restaurant management dashboard.',
        technologies: ['Swift', 'Kotlin', 'Node.js', 'MongoDB', 'Google Maps API'],
        results: [
          { metric: 'Partner Restaurants', value: '500+' },
          { metric: 'Monthly Orders', value: '125K' },
          { metric: 'Delivery Time', value: '-28%' }
        ]
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    projects: [
      {
        title: 'B2B SaaS Lead Generation Campaign',
        client: 'CloudTech Solutions',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        problem: 'SaaS startup struggled to generate qualified leads with limited budget and brand awareness in competitive market.',
        solution: 'Implemented multi-channel strategy combining SEO, LinkedIn ads, content marketing, and marketing automation with lead scoring.',
        technologies: ['Google Ads', 'LinkedIn Ads', 'HubSpot', 'SEMrush', 'Google Analytics'],
        results: [
          { metric: 'Qualified Leads', value: '+385%' },
          { metric: 'Cost per Lead', value: '-62%' },
          { metric: 'Conversion Rate', value: '+147%' }
        ]
      },
      {
        title: 'E-Commerce Brand Awareness Campaign',
        client: 'EcoHome Products',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
        problem: 'New sustainable products brand needed to build awareness and drive sales in crowded eco-friendly market.',
        solution: 'Created integrated campaign with influencer partnerships, Instagram/Facebook ads, email marketing, and content strategy.',
        technologies: ['Meta Ads', 'Instagram', 'Mailchimp', 'Shopify', 'Canva'],
        results: [
          { metric: 'Brand Awareness', value: '+520%' },
          { metric: 'Social Followers', value: '75K+' },
          { metric: 'Revenue Growth', value: '+290%' }
        ]
      },
      {
        title: 'Local Service Business SEO',
        client: 'Premier Dental Group',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
        problem: 'Dental practice invisible in local search results, losing patients to competitors despite excellent service quality.',
        solution: 'Comprehensive local SEO strategy with Google Business optimization, review management, local citations, and content marketing.',
        technologies: ['Google Ads', 'Google My Business', 'WordPress', 'Yoast SEO', 'BrightLocal'],
        results: [
          { metric: 'Local Rankings', value: 'Top 3' },
          { metric: 'New Patients', value: '+215%' },
          { metric: 'Phone Calls', value: '+340%' }
        ]
      },
      {
        title: 'Product Launch Campaign',
        client: 'TechGear Innovations',
        category: 'marketing',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
        problem: 'Electronics company launching flagship product needed buzz and pre-orders before launch date.',
        solution: 'Multi-phase campaign with teaser content, influencer unboxing, paid social ads, email sequences, and launch event.',
        technologies: ['Meta Ads', 'Google Ads', 'YouTube', 'Mailchimp', 'Analytics'],
        results: [
          { metric: 'Pre-orders', value: '12,500' },
          { metric: 'Social Reach', value: '2.5M' },
          { metric: 'Launch Day Sales', value: '$1.8M' }
        ]
      }
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>('development');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('software');

  const currentCategory = portfolioData.find(cat => cat.id === activeCategory);
  
  // Filter projects based on active category and subcategory
  const filteredProjects = currentCategory?.projects.filter(project => {
    if (activeCategory === 'development') {
      return project.category === activeSubcategory;
    }
    return true;
  }) || [];

  return (
    <section id="portfolio" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gray-100/50 to-transparent dark:from-gray-800/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-gradient-to-tl from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            Portfolio & Case Studies
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl font-bold"
          >
            Proven Results That <span className="text-primary">Speak for Themselves</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600 dark:text-gray-400 text-lg"
          >
            Real projects, real clients, real impact. See how we've helped businesses achieve their goals.
          </motion.p>
        </div>

        {/* Main Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            {portfolioData.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  if (category.id === 'development') {
                    setActiveSubcategory('software');
                  }
                }}
                className={`
                  relative px-8 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300
                  ${activeCategory === category.id 
                    ? 'text-white' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activePortfolioTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Development Subcategory Tabs */}
        {activeCategory === 'development' && currentCategory?.subcategories && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1.5">
              {currentCategory.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`
                    relative px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2
                    ${activeSubcategory === sub.id
                      ? 'bg-white dark:bg-gray-700 text-primary shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <sub.icon className="w-4 h-4" />
                  {sub.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Case Studies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${activeSubcategory}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={item}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.client}</p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  {/* Problem */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      The Challenge
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Our Solution
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Measurable Results
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {project.results.map((result) => (
                        <div key={result.metric} className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* View Case Study Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300 pt-2"
                    >
                      View Full Case Study
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}