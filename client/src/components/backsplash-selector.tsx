import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';
import { backsplashOptions } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';

interface BacksplashSelectorProps {
  selectedBacksplash: string;
  onBacksplashSelect: (backsplash: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function BacksplashSelector({ 
  selectedBacksplash, 
  onBacksplashSelect, 
  className,
  searchTerm = ''
}: BacksplashSelectorProps) {
  const filteredBacksplash = backsplashOptions.filter(backsplash =>
    backsplash.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6", className)}>
      <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
        <Grid3X3 className="text-primary mr-2 h-4 w-4" />
        Backsplash
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {filteredBacksplash.map((backsplash) => {
          const isSelected = selectedBacksplash === backsplash.id;
          
          return (
            <motion.div
              key={backsplash.id}
              onClick={() => onBacksplashSelect(isSelected ? '' : backsplash.id)}
              className={cn(
                "customization-option overflow-hidden",
                isSelected ? "selected" : ""
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className="w-full h-20 border-b border-gray-200"
                style={{ backgroundColor: backsplash.color }}
              />
              <div className="p-2">
                <div className="text-sm font-medium text-gray-900">
                  {backsplash.name}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
