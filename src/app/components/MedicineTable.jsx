"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleAlt, faClipboardList, faVial, faExclamationCircle, faSyringe } from '@fortawesome/free-solid-svg-icons';
import CurrentMedicines from './CurrentMedicines';
import PrescribedMedicine from './PrescribedMedicine';

const MedicineTable = () => {
  const [activeTab, setActiveTab] = useState('prescribed');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabData = [
    { name: 'prescribed', label: 'Prescribed Medicines', icon: faPrescriptionBottleAlt },
    { name: 'current', label: 'Current Medicines', icon: faClipboardList },
    { name: 'iv', label: 'IV Fluids', icon: faVial },
    { name: 'sos', label: 'SOS/State Medicines', icon: faExclamationCircle },
    { name: 'invasive', label: 'Invasive Lines/Tubes', icon: faSyringe },
  ];

  return (
    <div className="max-w-full mx-auto">
      <div className="flex border-b border-gray-300">
        {tabData.map(({ name, label, icon }) => (
          <div
            key={name}
            className={`flex-1 text-center py-3 cursor-pointer transition-colors duration-300 
              ${activeTab === name ? 'bg-white border-b-2 border-blue-500 font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => handleTabClick(name)}
          >
            <FontAwesomeIcon icon={icon} className="h-5 w-5 inline-block mr-1" />
            {label}
          </div>
        ))}
      </div>

      <div className="p-4 border border-gray-300 bg-white">
        {activeTab === 'prescribed' && (
         <PrescribedMedicine/>
        )}
        {activeTab === 'current' && (
        < CurrentMedicines/>
        )}
        {activeTab === 'iv' && (
         <PrescribedMedicine/>
        )}
        {activeTab === 'sos' && (
         <PrescribedMedicine/>
        )}
        {activeTab === 'invasive' && (
        <PrescribedMedicine/>
        )}
      </div>
    </div>
  );
};

export default MedicineTable;
