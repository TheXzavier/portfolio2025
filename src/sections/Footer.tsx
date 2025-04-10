import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";

const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/shivam-zanjurne/",
  },
  {
    title: "Twitter",
    href: "https://x.com/ZanShivam",
  },
  {
    title: "GitHub",
    href: "https://github.com/TheXzavier",
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-x-clip"> {/* Removed -z-10 */}
      {/* Gradient Background */}
      <div
        className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 z-[-1]" // Lower z-index
        style={{
          maskImage:
            "radial-gradient(50% 50% at bottom center, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(50% 50% at bottom center, black, transparent)",
          pointerEvents: "none", // Prevent blocking interactions
        }}
      ></div>

      {/* Footer Content */}
      <div className="container relative z-10"> {/* Ensure content is above */}
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          {/* Copyright Text */}
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>

          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row items-center gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};