
import React from 'react';
import { cn } from '@/lib/utils';
import { DietaryTag } from '@/types/api';

interface DietaryTagsProps {
  tags: DietaryTag[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'card';
}

const DietaryTags: React.FC<DietaryTagsProps> = ({
  tags,
  className,
  size = 'md',
  variant = 'default'
}) => {
  // Tag info mapping with English and Nepali labels
  const tagInfo: Record<DietaryTag, {label: string, label_np: string, color: string}> = {
    'satvik': {
      label: 'Satvik',
      label_np: 'सात्विक',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    'jain_friendly': {
      label: 'Jain',
      label_np: 'जैन',
      color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    'buddhist_fasting': {
      label: 'Buddhist',
      label_np: 'बौद्ध',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    'hindu_fasting': {
      label: 'Hindu Fast',
      label_np: 'हिन्दू व्रत',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    'no_onion_garlic': {
      label: 'No Onion-Garlic',
      label_np: 'प्याज-लसुन बिना',
      color: 'bg-red-100 text-red-800 border-red-200'
    },
    'no_tomato': {
      label: 'No Tomato',
      label_np: 'गोलभेडा बिना',
      color: 'bg-pink-100 text-pink-800 border-pink-200'
    },
    'high_protein': {
      label: 'High Protein',
      label_np: 'हाई प्रोटीन',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    'gluten_free': {
      label: 'Gluten-Free',
      label_np: 'ग्लुटेन-फ्री',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1'
  };

  // Variant classes
  const variantClasses = {
    default: 'border rounded-full',
    minimal: 'rounded',
    card: 'border rounded-md shadow-sm'
  };

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tags.map(tag => (
        <div
          key={tag}
          className={cn(
            tagInfo[tag].color,
            sizeClasses[size],
            variantClasses[variant],
            'flex items-center gap-1'
          )}
        >
          <span>{tagInfo[tag].label}</span>
          {variant !== 'minimal' && (
            <span className="font-nepali text-[0.65em]">
              ({tagInfo[tag].label_np})
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default DietaryTags;
