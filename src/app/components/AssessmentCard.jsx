
"use client";

import { useState } from 'react';
import { MainHeadings } from '../common/text';
import { FiSave } from 'react-icons/fi';
import { ActionButton } from '../common/Buttons';
import ReusableTextareaField from '../common/ReusableTextareaField';

export default function AssessmentCard({ title }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="bg-gray-50 border border-gray-300 shadow rounded-lg p-1 flex flex-col gap-2 max-h-25">
      <div className="flex items-center justify-between">
        <MainHeadings title={title} />
        <ActionButton label="Save" />
      </div>
      <ReusableTextareaField
        // id="allergies"
        label=" "
        className="border rounded text-[10px] min-h-[50px] p-1"
        rows={4}
        style={{ minHeight: '28px', padding: '3px 4px' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

    </div>
  );
}
