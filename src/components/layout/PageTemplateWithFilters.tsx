// src/components/layout/PageTemplateWithFilters.tsx
import { Disclosure } from "@headlessui/react";
import { ReactNode } from "react";

interface PageTemplateWithFiltersProps {
  title: string;
  children: ReactNode; // table or page content
  filters: ReactNode; // JSX form (React Hook Form) rendu dans le panneau
}

const PageTemplateWithFilters: React.FC<PageTemplateWithFiltersProps> = ({ title, children, filters }) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-8 px-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

      {/* Zone filtres collapsible */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="bg-white rounded-lg border border-gray-300 mb-8">
            <Disclosure.Button className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 focus:outline-none">
              <span>Filtres de recherche</span>
              <svg
                className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Disclosure.Button>
            <Disclosure.Panel className="px-6 pb-6 pt-2 border-t border-gray-200">
              {filters}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* Contenu principal */}
      {children}
    </div>
  );
};

export default PageTemplateWithFilters; 