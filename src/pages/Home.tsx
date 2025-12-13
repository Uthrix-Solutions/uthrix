import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Technologies } from '../components/Technologies';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { FloatingThemeToggle } from '../components/FloatingThemeToggle';
import { ScrollToTopButton } from '../components/ScrollToTopButton';

export function Home() {
  return <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navigation />
      <FloatingThemeToggle />
      <ScrollToTopButton />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Portfolio />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>;
}