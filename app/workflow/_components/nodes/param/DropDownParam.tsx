"use client";

import { ParamProps } from '@/types/appNode';
import React, { useState } from 'react';

function DropDownParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  // Define the options for the dropdown
  const options = ["Reading", "Exercise", "Meditation", "Writing", "Coding"];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    updateNodeParamValue(newValue);
  };

  return (
    <div className='space-y-1 p-1 w-full'>
      <label htmlFor={param.name} className='text-xs flex'>
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </label>
      <select
        id={param.name}
        disabled={disabled}
        className='text-xs w-full p-1 border rounded'
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

export default DropDownParam;