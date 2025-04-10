
export const Header = () => {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#home" className="nav-item cursor-pointer">Home</a>
        <a href="#projects" className="nav-item cursor-pointer">Projects</a>
        <a href="#about" className="nav-item cursor-pointer">About</a>
        <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900 cursor-pointer">
          Contact
        </a>
      </nav>
    </div>
  );
};
