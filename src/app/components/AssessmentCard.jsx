"use client";

import { useState } from 'react';
import { MainHeadings } from '../common/text';


export default function AssessmentCard({title}) {
    const [inputValue, setInputValue] = useState('');

    return (
      <div className="bg-gray-50 border-1 border-gray-300 shadow rounded-lg p-2 flex flex-col gap-2">
        <MainHeadings title={title} />
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your data..."
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        
      </div>
    );
}
