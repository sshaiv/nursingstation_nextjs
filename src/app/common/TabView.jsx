"use client";
import React, { useState } from "react";

export default function Tabs({ tabs, initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.name);

  return (
    <div className="w-full">
      
      {/* Tab Bar */}
      <ul className="flex w-full text-xs font-semibold text-gray-700 dark:text-gray-800">
        {tabs.map(({ name, label, emoji }) => {
          const isActive = activeTab === name;
          return (
            <li key={name} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveTab(name)}
                className={`w-full flex items-center justify-center gap-1 px-3 py-2 border-b-2 ${
                  isActive
                    ? "border-blue-800 text-blue-800 font-bold"
                    : "border-transparent hover:text-gray-400"
                } transition-colors duration-150`}
              >
                <span className=" hidden sm:inline">{emoji}</span>
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Content */}
      <div className="p-0 mt-4">
        {tabs.map(({ name, content }) =>
          activeTab === name ? (
            <div key={name} className="tab-content">
              {content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
