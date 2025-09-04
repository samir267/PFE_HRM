// // components/TopNav.tsx
// import { FiChevronDown, FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";
// import { useState } from "react";
// import OrganizationCard from "../organizationCard";

// interface TopNavProps {
//   mobileMenuOpen: boolean;
//   setMobileMenuOpen: (open: boolean) => void;
//   onToggleView: (item:boolean)=>void
// }

// export default function TopNav({ mobileMenuOpen, setMobileMenuOpen , onToggleView}: TopNavProps) {
//   const [language, setLanguage] = useState("United Kingdom");
//   const [showCard, setShowCard] = useState<boolean>(false)

//   const showCarditem = ()=>{
//     onToggleView(showCard)
//     setShowCard(!showCard)
//   }

  
//   return (
//     <div className="flex items-center space-x-4">
//       {/* Language Selector */}
//       <div className="relative group hidden md:block">
//         <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors">
//           <span className="text-sm">{language}</span>
//           <FiChevronDown size={14} />
//         </button>
//         <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded shadow-lg hidden group-hover:block z-50 border border-gray-700">
//           <ul>
//             {["United Kingdom", "France", "Germany", "Spain"].map((lang) => (
//               <li 
//                 key={lang} 
//                 className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
//                 onClick={() => setLanguage(lang)}
//               >
//                 {lang}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <button className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors"
//       onClick={showCarditem}>
//         <span>Spi Efe</span>
//       </button>

      
//       <button className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
//         <span>Explore Excellencia</span>
//       </button>
      
//       <button className="text-gray-300 hover:text-white transition-colors">
//         <FiUser size={20} />
//       </button>
      
//       <button className="text-gray-300 hover:text-white transition-colors">
//         <FiSearch size={20} />
//       </button>
      
//       {/* Mobile Menu Button */}
//       <button 
//         className="md:hidden text-gray-300 hover:text-white transition-colors"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       >
//         {mobileMenuOpen ? <FiX size={20}  /> : <FiMenu size={24} />}
//       </button>
//     </div>
//   );
// }

// components/TopNav.tsx
import { FiChevronDown, FiMenu, FiX, FiSearch, FiUser, FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react"; // Import useEffect
import OrganizationCard from "../organizationCard"; // Assuming this component exists

interface TopNavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onToggleView: (item: boolean) => void;
}

export default function TopNav({ mobileMenuOpen, setMobileMenuOpen, onToggleView }: TopNavProps) {
  const [language, setLanguage] = useState("United Kingdom");
  const [showCard, setShowCard] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Initialize theme from local storage or default to 'light'
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return storedTheme === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply theme to the document element whenever the theme state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (theme === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [theme]);

  const showCarditem = () => {
    onToggleView(showCard);
    setShowCard(!showCard);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Language Selector */}
      <div className="relative group hidden md:block">
        <button className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors">
          <span className="text-sm">{language}</span>
          <FiChevronDown size={14} />
        </button>
        <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded shadow-lg hidden group-hover:block z-50 border border-gray-700">
          <ul>
            {["United Kingdom", "France", "Germany", "Spain"].map((lang) => (
              <li
                key={lang}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors"
        onClick={showCarditem}>
        <span>Spi Efe</span>
      </button>


      <button className="hidden md:block text-gray-300 hover:text-white text-sm transition-colors">
        <span>Explore Excellencia</span>
      </button>

      {/* Dark/Light Mode Switcher */}
      {/* <button
        className="text-gray-300 hover:text-white transition-colors"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
      </button> */}

      <button className="text-gray-300 hover:text-white transition-colors">
        <FiUser size={20} />
      </button>

      <button className="text-gray-300 hover:text-white transition-colors">
        <FiSearch size={20} />
      </button>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300 hover:text-white transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={24} />}
      </button>
    </div>
  );
}