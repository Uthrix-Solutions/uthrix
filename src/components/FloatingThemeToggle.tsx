import { ThemeToggle } from './ThemeToggle';

export function FloatingThemeToggle() {
  return (
    <div className="fixed top-4 right-6 z-50">
      <ThemeToggle />
    </div>
  );
}