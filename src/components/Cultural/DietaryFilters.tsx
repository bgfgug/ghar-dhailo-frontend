
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { DietaryOption } from '@/types/api';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SpiceLevelIndicator from './SpiceLevelIndicator';

interface DietaryFiltersProps {
  onFilterChange: (filters: {
    dietaryOptions: DietaryOption[];
    spiceLevel: number | null;
    religiousTags: string[];
  }) => void;
  className?: string;
}

const DietaryFilters: React.FC<DietaryFiltersProps> = ({
  onFilterChange,
  className
}) => {
  const [dietaryOptions, setDietaryOptions] = useState<DietaryOption[]>([]);
  const [spiceLevel, setSpiceLevel] = useState<number | null>(null);
  const [religiousTags, setReligiousTags] = useState<string[]>([]);

  // Dietary options with translations
  const dietOptions: {value: DietaryOption; label: string; label_np: string}[] = [
    { value: 'newari', label: 'Newari Cuisine', label_np: 'नेवारी खाना' },
    { value: 'madhesi', label: 'Madhesi Cuisine', label_np: 'मधेसी खाना' },
    { value: 'pahadi', label: 'Pahadi Cuisine', label_np: 'पहाडी खाना' },
    { value: 'himalayan', label: 'Himalayan Cuisine', label_np: 'हिमाली खाना' },
    { value: 'thakali', label: 'Thakali Cuisine', label_np: 'थकाली खाना' }
  ];

  // Religious tags with translations
  const religionOptions = [
    { value: 'satvik', label: 'Satvik', label_np: 'सात्विक' },
    { value: 'jain_friendly', label: 'Jain-friendly', label_np: 'जैन-अनुकूल' },
    { value: 'buddhist_fasting', label: 'Buddhist Fasting', label_np: 'बौद्ध उपवास' },
    { value: 'hindu_fasting', label: 'Hindu Fasting', label_np: 'हिन्दू व्रत' },
    { value: 'no_onion_garlic', label: 'No Onion-Garlic', label_np: 'प्याज-लसुन बिना' }
  ];

  const toggleDietaryOption = (option: DietaryOption) => {
    setDietaryOptions(prev => {
      const newOptions = prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option];
      
      // Notify parent of changes
      onFilterChange({
        dietaryOptions: newOptions,
        spiceLevel,
        religiousTags
      });
      
      return newOptions;
    });
  };

  const toggleReligiousTag = (tag: string) => {
    setReligiousTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      
      // Notify parent of changes
      onFilterChange({
        dietaryOptions,
        spiceLevel,
        religiousTags: newTags
      });
      
      return newTags;
    });
  };

  const handleSpiceLevelChange = (level: 1 | 2 | 3 | 4 | 5 | null) => {
    setSpiceLevel(level);
    
    // Notify parent of changes
    onFilterChange({
      dietaryOptions,
      spiceLevel: level,
      religiousTags
    });
  };

  const resetFilters = () => {
    setDietaryOptions([]);
    setSpiceLevel(null);
    setReligiousTags([]);
    
    // Notify parent of changes
    onFilterChange({
      dietaryOptions: [],
      spiceLevel: null,
      religiousTags: []
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Dietary Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Regional Cuisine
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[180px]">
              {dietOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={dietaryOptions.includes(option.value)}
                  onCheckedChange={() => toggleDietaryOption(option.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground font-nepali">
                      {option.label_np}
                    </span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Religious Dietary Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Religious Diet
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[180px]">
              {religionOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={religiousTags.includes(option.value)}
                  onCheckedChange={() => toggleReligiousTag(option.value)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    <span className="text-xs text-muted-foreground font-nepali">
                      {option.label_np}
                    </span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Reset Button - Only show when filters are applied */}
        {(dietaryOptions.length > 0 || spiceLevel !== null || religiousTags.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs"
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Spice Level Selector */}
      <div className="bg-white p-3 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="text-sm font-medium">Spice Level</h4>
            <p className="text-xs text-muted-foreground font-nepali">मसालाको मात्रा</p>
          </div>
          {spiceLevel !== null && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSpiceLevelChange(null)}
              className="h-6 text-xs"
            >
              Clear
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">Mild</span>
          <div className="flex-grow px-4">
            <SpiceLevelIndicator 
              level={spiceLevel as 1 | 2 | 3 | 4 | 5 || 1}
              interactive={true}
              onChange={handleSpiceLevelChange as (level: 1 | 2 | 3 | 4 | 5) => void}
              size="md"
            />
          </div>
          <span className="text-xs text-muted-foreground">Spicy</span>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(dietaryOptions.length > 0 || spiceLevel !== null || religiousTags.length > 0) && (
        <motion.div 
          className="flex flex-wrap gap-1.5 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {dietaryOptions.map(option => {
            const opt = dietOptions.find(o => o.value === option);
            return (
              <div key={option} className="bg-primary/10 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Check size={10} className="text-primary" />
                <span>{opt?.label}</span>
              </div>
            );
          })}
          
          {religiousTags.map(tag => {
            const opt = religionOptions.find(o => o.value === tag);
            return (
              <div key={tag} className="bg-primary/10 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Check size={10} className="text-primary" />
                <span>{opt?.label}</span>
              </div>
            );
          })}
          
          {spiceLevel !== null && (
            <div className="bg-red-100 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <span className="text-red-600">Spice Level: {spiceLevel}</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DietaryFilters;
