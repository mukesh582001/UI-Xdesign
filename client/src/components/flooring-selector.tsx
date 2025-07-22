import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { flooringOptions } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';

interface FlooringSelectorProps {
  selectedFlooring: string;
  onFlooringSelect: (flooring: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function FlooringSelector({ 
  selectedFlooring, 
  onFlooringSelect, 
  className,
  searchTerm = ''
}: FlooringSelectorProps) {
  const filteredFlooring = flooringOptions.filter(flooring =>
    flooring.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6", className)}>
      <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
        <Layers className="text-primary mr-2 h-4 w-4" />
        Flooring
      </h3>
      
      <div className="space-y-3">
        {filteredFlooring.map((flooring) => {
          const isSelected = selectedFlooring === flooring.id;
          
          return (
            <motion.div
              key={flooring.id}
              onClick={() => onFlooringSelect(isSelected ? '' : flooring.id)}
              className={cn(
                "customization-option p-3",
                isSelected ? "selected" : ""
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-16 h-10 rounded border border-gray-300"
                  style={{ backgroundColor: flooring.color }}
                />
                <div>
                  <div className="font-medium text-gray-900">{flooring.name}</div>
                  <div className="text-xs text-gray-500">{flooring.description}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
