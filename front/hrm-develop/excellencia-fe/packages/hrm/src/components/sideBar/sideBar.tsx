import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import sidebarData from "../../data/sidebarData";
import { SidebarItem } from "../../types/SidebarItem";

interface SidebarProps {
  isExpanded: boolean;
}

export default function Sidebar({ isExpanded }: SidebarProps) {
  const [activeHoverPath, setActiveHoverPath] = useState<string[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const findItemById = (id: string, items: SidebarItem[]): SidebarItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.subItems) {
        const found = findItemById(id, item.subItems);
        if (found) return found;
      }
    }
    return undefined;
  };

  const getItemPath = (itemId: string, items: SidebarItem[], currentPath: string[] = []): string[] => {
    for (const item of items) {
      const newPath = [...currentPath, item.id];
      if (item.id === itemId) return newPath;
      if (item.subItems) {
        const subPath = getItemPath(itemId, item.subItems, newPath);
        if (subPath.length > newPath.length) return subPath;
      }
    }
    return [];
  };

  const handleMouseEnter = (itemId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    const newPath = getItemPath(itemId, sidebarData);
    setActiveHoverPath(newPath);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveHoverPath([]);
    }, 500); // Augmenté à 500ms pour plus de tolérance lors des retours
  };

  const isItemActive = (itemId: string) => activeHoverPath.includes(itemId);

  const isSubMenuVisible = (itemId: string) => {
    const item = findItemById(itemId, sidebarData);
    return activeHoverPath.includes(itemId) && item?.subItems?.length! > 0;
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.subItems && item.subItems.length > 0;
    const itemIsCurrentlyActive = isItemActive(item.id);
    const showSubMenu = isSubMenuVisible(item.id);
    const sortedSubItems = item.subItems?.sort((a, b) => (a.priority || 3) - (b.priority || 3));

    const paddingLeft = depth === 0 ? "pl-2" : `pl-[${12 + depth * 8}px]`;

    // Ajout d'un chevauchement pour les sous-menus (overlap de 4px vers la gauche)
    const subMenuPosition = depth === 0 
      ? 'left-full top-0' 
      : 'left-[calc(100%-4px)] top-0'; // Chevauchement pour éviter les gaps lors du retour

    return (
      <div
        key={item.id}
        className="relative w-full"
        onMouseEnter={() => handleMouseEnter(item.id)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.href || "#"}
          className={`flex items-center p-2 rounded-lg transition-colors text-sm
            ${depth === 0 ? "mb-1" : ""}
            ${paddingLeft}
            ${itemIsCurrentlyActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 text-gray-200"}
            ${item.priority === 1 ? "font-medium" : ""}
          `}
          onClick={(e) => {
            if (hasChildren && !item.href) {
              e.preventDefault();
            }
            if (item.href) {
              setActiveHoverPath([]);
            }
          }}
        >
          <div className="flex items-center space-x-2 min-w-[20px]">
            {item.icon && (
              <span className={`${item.priority === 1 ? "text-blue-300" : "text-gray-300"}`}>
                {item.icon}
              </span>
            )}
            {isExpanded && (
              <span className={`whitespace-nowrap ${item.priority === 1 ? "text-white" : "text-gray-200"}`}>
                {item.label}
              </span>
            )}
          </div>

          {isExpanded && hasChildren && (
            <span className="ml-auto text-gray-400">
              {showSubMenu ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
            </span>
          )}
        </Link>

        {isExpanded && hasChildren && showSubMenu && (
          <div
            className={`absolute z-20 min-w-[200px] bg-gray-800 rounded-md shadow-xl
              ${subMenuPosition} // Positionnement avec chevauchement
              border border-gray-700 // Gardez la bordure, mais testez sans si besoin
            `}
            onMouseEnter={() => handleMouseEnter(item.id)} // Maintient le parent actif
            onMouseLeave={handleMouseLeave}
          >
            <div className="py-1">
              {sortedSubItems?.map((subItem) => (
                <div key={subItem.id} className="relative">
                  {renderItem(subItem, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sortedSidebarData = sidebarData.sort((a, b) => (a.priority || 3) - (b.priority || 3));

  return (
    <div
      className={`h-full bg-gray-800 text-white flex flex-col border-r border-gray-700
        ${isExpanded ? "w-64" : "w-20"} transition-all duration-300 ease-in-out`}
    >
      <div className="flex-1 p-2">
        {sortedSidebarData.map((item) => renderItem(item))}
      </div>
    </div>
  );
}