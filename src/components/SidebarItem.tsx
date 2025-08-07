// src/components/SidebarItem.tsx

import React from 'react';

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex flex-col items-center justify-center p-3 my-1 
        transition-colors duration-200
        ${
          active
            ? 'bg-primary text-white' // Style actif
            : 'text-gray-600 hover:bg-primary/10' // Style inactif + hover
        }
      `}
    >
      <Icon className="h-7 w-7" />
      <span className="text-xs font-bold mt-1.5">{text}</span>
    </button>
  );
};

export default SidebarItem; 