import { motion } from 'framer-motion';
import { Award, TrendingUp, Code, Users, Rocket, Target } from 'lucide-react';

const stats = [{
  label: 'Digital Campaigns',
  value: '50+',
  icon: Target,
  color: 'from-red-500 to-pink-500'
}, {
  label: 'Years Combined Expertise',
  value: '15+',
  icon: Award,
  color: 'from-blue-500 to-cyan-500'
}, {
  label: 'Software Products',
  value: '30+',
  icon: Code,
  color: 'from-purple-500 to-indigo-500'
}, {
  label: 'ROI Increase Average',
  value: '300%',
  icon: TrendingUp,
  color: 'from-green-500 to-emerald-500'
}, {
  label: 'Happy Clients',
  value: '100+',
  icon: Users,
  color: 'from-orange-500 to-yellow-500'
}, {
  label: 'Markets Reached',
  value: '12+',
  icon: Rocket,
  color: 'from-red-500 to-rose-500'
}];

export function About() {
  return <section id="about" className="py-20 lg:py-24 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wider uppercase text-sm mb-6">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Digital Marketing{" "}
              <span className="text-primary">+</span>{" "}
              Software Engineering
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mb-8" />

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              At UTHRIX, we're not just another agency. We're a hybrid powerhouse that combines the strategic thinking of top-tier marketers with the technical prowess of elite software engineers.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              This unique fusion allows us to build and promote digital products that don't just exist—they dominate. From scalable web applications to viral marketing campaigns, we engineer growth at every touchpoint.
            </p>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Data-Driven Strategy</h3>
                  <p className="text-gray-600 dark:text-gray-400">Every decision backed by analytics and market intelligence</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Cutting-Edge Technology</h3>
                  <p className="text-gray-600 dark:text-gray-400">Modern frameworks and tools for maximum performance</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start space-x-3"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">End-to-End Solutions</h3>
                  <p className="text-gray-600 dark:text-gray-400">From concept to launch to scaling—we handle it all</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                alt="Team collaboration" 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              initial={{ scale: 0, rotate: -5 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-[#141414] p-6 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 max-w-xs"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">300%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Growth Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white dark:bg-[#141414] p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative">
                <div className="p-2 bg-primary/10 rounded-lg text-primary w-fit mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold mb-1 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>;
}