import { motion } from 'framer-motion';
import { Award, Clock, Code, Users } from 'lucide-react';
const stats = [{
  label: 'Projects Completed',
  value: '500+',
  icon: Award
}, {
  label: 'Years Experience',
  value: '15+',
  icon: Clock
}, {
  label: 'Coding Hours',
  value: '1M+',
  icon: Code
}, {
  label: 'Happy Clients',
  value: '200+',
  icon: Users
}];
export function About() {
  return <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team working" className="w-full h-auto" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

            <motion.div initial={{
            scale: 0
          }} whileInView={{
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: 0.3,
            type: 'spring'
          }} className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-xs hidden md:block">
              <p className="text-sm font-medium italic text-gray-600 dark:text-gray-300">
                "Innovation distinguishes between a leader and a follower."
              </p>
            </motion.div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              About UTHRIX
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-6">
              Transforming Ideas Into <br />
              <span className="text-primary">Digital Reality</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              We are a team of passionate developers and designers dedicated to
              transforming businesses through innovative technology solutions.
              With years of experience across industries, we deliver software
              that scales with your growth.
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
              Our approach combines technical expertise with creative
              problem-solving to build products that not only function perfectly
              but also delight users.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}