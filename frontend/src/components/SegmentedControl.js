import React from 'react';

const SegmentedControl = ({ selected, onSelect }) => {
  return (
    <div className="border rounded-lg overflow-hidden space-x-1">
      <button
        className={`py-2 px-4 text-center ${
          selected === 'Edit' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        }`}
        onClick={() => onSelect('Edit')}
      >
        Edit
      </button>
      <button
        className={`py-2 px-4 text-center ${
          selected === 'Preview' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        }`}
        onClick={() => onSelect('Preview')}
      >
        Preview
      </button>
    </div>
  );
};

export default SegmentedControl;