import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { presetColors } from '@/lib/kitchen-data';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onColorChange: (color: string) => void;
  className?: string;
  searchTerm?: string;
}

export default function ColorPicker({ color, onColorChange, className, searchTerm = '' }: ColorPickerProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const filteredColors = presetColors.filter(presetColor =>
    presetColor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn("bg-white rounded-xl shadow-lg p-6", className)}>
      <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
        <Palette className="text-primary mr-2 h-4 w-4" />
        Wall Color
      </h3>
      
      <div className="mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              onFocus={() => setIsColorPickerOpen(true)}
              onBlur={() => setIsColorPickerOpen(false)}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Custom Color</div>
            <div className="text-xs text-gray-500">{color}</div>
          </div>
        </div>
        
        {/* Preset Colors */}
        <div className="grid grid-cols-5 gap-2">
          {filteredColors.map((presetColor) => (
            <motion.button
              key={presetColor}
              onClick={() => onColorChange(presetColor)}
              className={cn(
                "w-8 h-8 rounded-lg border-2 transition-transform",
                color === presetColor ? "border-primary scale-110" : "border-gray-300"
              )}
              style={{ backgroundColor: presetColor }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
