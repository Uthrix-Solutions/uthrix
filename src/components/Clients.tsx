import { motion } from "framer-motion";

// Client logos data
interface Client {
  name: string;
  logo: string;
}

const clients: Client[] = [
  { name: "vcare", logo: "/clients/vcare/white.png" }
];

export function Clients() {
  return (
    <section className="py-24 bg-[#0a0a0a] dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Sophisticated Background with Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
      
      {/* Decorative Background Elements - More Subtle */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#D1001F]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D1001F]/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D1001F]/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Clients<span className="text-[#D1001F]">.</span>
          </h2>
        </motion.div>

        {/* Clients Grid with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card Background with Glass Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[#D1001F]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative flex items-center justify-center p-8 rounded-2xl border border-white/5 group-hover:border-white/10 transition-all duration-500">
                <div className="w-full h-32 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain filter brightness-75 grayscale opacity-50 group-hover:brightness-100 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-500 group-hover:text-white text-lg font-semibold transition-colors duration-500">${client.name}</span>`;
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Text with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-gray-500 text-lg font-light tracking-wide">
            Trusted by leading brands across industries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
