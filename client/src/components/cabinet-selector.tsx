import { motion } from 'framer-motion';
import { DoorClosed } from 'lucide-react';
import { cabinetStyles } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';

interface CabinetSelectorProps {
  selectedCabinet: string;
  onCabinetSelect: (cabinet: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function CabinetSelector({ 
  selectedCabinet, 
  onCabinetSelect, 
  className,
  searchTerm = ''
}: CabinetSelectorProps) {
  const filteredCabinets = cabinetStyles.filter(cabinet =>
    cabinet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6", className)}>
      <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
        <DoorClosed className="text-primary mr-2 h-4 w-4" />
        Cabinet Style
      </h3>
      
      <div className="space-y-3">
        {filteredCabinets.map((cabinet) => {
          const isSelected = selectedCabinet === cabinet.id;
          
          return (
            <motion.div
              key={cabinet.id}
              onClick={() => onCabinetSelect(isSelected ? '' : cabinet.id)}
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
                  style={{ backgroundColor: cabinet.color }}
                />
                <div>
                  <div className="font-medium text-gray-900">{cabinet.name}</div>
                  <div className="text-xs text-gray-500">{cabinet.description}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
