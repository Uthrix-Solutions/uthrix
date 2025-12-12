import { motion } from "framer-motion";

// Import technology icons
import DotNetIcon from "../assets/Icons/DotNet.svg";
import AngularIcon from "../assets/Icons/Angular-Dark.svg";
import ReactIcon from "../assets/Icons/React-Dark.svg";
import NodeIcon from "../assets/Icons/NodeJS-Dark.svg";
import SpringIcon from "../assets/Icons/Spring-Dark.svg";
import AWSIcon from "../assets/Icons/AWS-Dark.svg";
import AzureIcon from "../assets/Icons/Azure-Dark.svg";
import FlutterIcon from "../assets/Icons/Flutter-Dark.svg";
import SwiftIcon from "../assets/Icons/Swift.svg";
import KotlinIcon from "../assets/Icons/Kotlin-Dark.svg";
import WordPressIcon from "../assets/Icons/Wordpress.svg";
import WebflowIcon from "../assets/Icons/Webflow.svg";

// Technology Stack
interface Technology {
  name: string;
  icon: string;
}

const technologies: Technology[] = [
  // Development Stack
  { name: ".NET", icon: DotNetIcon },
  { name: "Angular", icon: AngularIcon },
  { name: "React", icon: ReactIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Spring", icon: SpringIcon },
  
  // Cloud Platforms
  { name: "AWS", icon: AWSIcon },
  { name: "Azure", icon: AzureIcon },
  
  // Mobile Development
  { name: "Flutter", icon: FlutterIcon },
  { name: "Swift", icon: SwiftIcon },
  { name: "Kotlin", icon: KotlinIcon },
  
  // CMS & E-commerce
  { name: "WordPress", icon: WordPressIcon },
  { name: "Shopify", icon: WebflowIcon },
];

const marketingTools = [
  { name: "Google Ads", icon: "🎯" },
  { name: "Meta Ads", icon: "📱" },
  { name: "LinkedIn Ads", icon: "💼" },
  { name: "Analytics", icon: "�" },
];

export function Technologies() {
  return (
    <section
      id="technologies"
      className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            Our Technology Stack
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-4">
            Built with <span className="text-primary">Industry-Leading</span> Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We leverage cutting-edge technologies to deliver robust, scalable solutions
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-12"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                  {tech.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marketing Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-center mb-6">
            Marketing & Analytics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {marketingTools.map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tool.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}