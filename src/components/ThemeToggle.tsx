import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
export function ThemeToggle() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="relative p-2 rounded-full bg-gray-100 dark:bg-white/5 text-primary hover:bg-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Toggle theme">
      <div className="relative w-6 h-6">
        <motion.div initial={false} animate={{
        scale: theme === 'light' ? 1 : 0,
        opacity: theme === 'light' ? 1 : 0,
        rotate: theme === 'light' ? 0 : 90
      }} transition={{
        duration: 0.2
      }} className="absolute inset-0 flex items-center justify-center">
          <Sun className="w-5 h-5" />
        </motion.div>

        <motion.div initial={false} animate={{
        scale: theme === 'dark' ? 1 : 0,
        opacity: theme === 'dark' ? 1 : 0,
        rotate: theme === 'dark' ? 0 : -90
      }} transition={{
        duration: 0.2
      }} className="absolute inset-0 flex items-center justify-center">
          <Moon className="w-5 h-5" />
        </motion.div>
      </div>
    </button>;
}