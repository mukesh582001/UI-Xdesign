import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Share, Settings, Info, Expand, ArrowLeft, Search, Send, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ColorPicker from '@/components/color-picker';
import CabinetSelector from '@/components/cabinet-selector';
import BacksplashSelector from '@/components/backsplash-selector';
import FlooringSelector from '@/components/flooring-selector';
import { useKitchenCustomization } from '@/hooks/use-kitchen-customization';
import { useToast } from '@/hooks/use-toast';
import { TIMBER_CRAFT_LOGO, BIOREV_LOGO } from '@/lib/kitchen-data';

export default function Home() {
  const {
    customization,
    updateWallColor,
    updateCabinet,
    updateBacksplash,
    updateFlooring,
    getKitchenImage,
    exportDesign
  } = useKitchenCustomization();

  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDesignInfo, setShowDesignInfo] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInquiryDialog, setShowInquiryDialog] = useState(false);

  const categories = [
    { id: 'wall-colors', name: 'Wall Colors', icon: '🎨' },
    { id: 'cabinets', name: 'Cabinet Styles', icon: '🚪' },
    { id: 'backsplash', name: 'Backsplash', icon: '⬜' },
    { id: 'flooring', name: 'Flooring', icon: '🏠' },
  ];

  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your kitchen design has been saved successfully!",
    });
  };

  const handleShareDesign = () => {
    toast({
      title: "Share Design", 
      description: "Share functionality coming soon!",
    });
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
    if (!isPreviewMode) {
      setShowSidebar(false);
      setShowDesignInfo(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setCurrentCategory(categoryId);
    setSearchTerm('');
  };

  const handleBackToCategories = () => {
    setCurrentCategory(null);
    setSearchTerm('');
  };

  const handleInquirySubmit = () => {
    toast({
      title: "Inquiry Sent",
      description: "Your inquiry has been sent successfully!",
    });
    setShowInquiryDialog(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Fixed Logos */}
      {!isPreviewMode && (
        <>
          <div className="fixed top-4 left-4 z-30">
            <img src={TIMBER_CRAFT_LOGO} alt="Timber Craft" className="h-10 w-auto" />
          </div>
          <div className="fixed top-4 right-4 z-30">
            <img src={BIOREV_LOGO} alt="Biorev Technology" className="h-8 w-auto" />
          </div>
        </>
      )}

      {/* Kitchen Image - Main Content */}
      <div className={`flex-1 relative overflow-hidden ${showSidebar && !isPreviewMode ? 'mr-96' : ''}`}>
        <motion.img
          src={getKitchenImage()}
          alt="Kitchen Design Preview"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Wall color overlay */}
        <motion.div
          className="wall-color-overlay"
          style={{ backgroundColor: customization.wallColor }}
          animate={{ opacity: customization.wallColor === '#ffffff' ? 0 : 0.25 }}
          transition={{ duration: 0.3 }}
        />

        {/* Control Buttons */}
        {!isPreviewMode && (
          <div className="absolute top-20 left-4 z-20 flex flex-col space-y-2">
            <Button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg ${showSidebar ? 'ring-2 ring-primary' : ''}`}
              variant="ghost"
            >
              <Settings className="h-4 w-4" />
              <span className="ml-2">Customize</span>
            </Button>
            <Button
              onClick={() => setShowDesignInfo(!showDesignInfo)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              variant="ghost"
            >
              <Info className="h-4 w-4" />
              <span className="ml-2">Design Info</span>
            </Button>
          </div>
        )}

        {/* Preview Button */}
        <div className="absolute top-20 right-4 z-20">
          <Button
            onClick={togglePreviewMode}
            className={`${isPreviewMode ? 'bg-red-500 hover:bg-red-600' : 'timber-gradient hover:opacity-90'} text-white shadow-lg transition-all`}
          >
            <Expand className="h-4 w-4" />
            <span className="ml-2">{isPreviewMode ? 'Exit Preview' : 'Preview'}</span>
          </Button>
        </div>

        {/* Design Info Card */}
        <AnimatePresence>
          {showDesignInfo && !isPreviewMode && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-32 left-4 z-10"
            >
              <Card className="w-72 bg-white/95 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Timber Craft Design</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDesignInfo(false)}
                      className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: customization.wallColor }}></div>
                      <span>Wall Color</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: '#D4B896' }}></div>
                      <span>Natural Wood Cabinets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: '#FFFFFF' }}></div>
                      <span>White Subway Backsplash</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundColor: '#DEB887' }}></div>
                      <span>Light Oak Flooring</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Sidebar for Customization */}
      <AnimatePresence>
        {showSidebar && !isPreviewMode && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-20 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentCategory ? (
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToCategories}
                        className="mr-2 p-1"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      {categories.find(c => c.id === currentCategory)?.name}
                    </div>
                  ) : (
                    'Customize Kitchen'
                  )}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Search Bar (when in category) */}
              {currentCategory && (
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {/* Category List or Selected Category Content */}
              {!currentCategory ? (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      variant="outline"
                      className="w-full justify-start text-left p-4 h-auto"
                    >
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <span className="text-base font-medium">{category.name}</span>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentCategory === 'wall-colors' && (
                    <ColorPicker
                      color={customization.wallColor}
                      onColorChange={updateWallColor}
                      className="shadow-none bg-transparent p-0"
                      searchTerm={searchTerm}
                    />
                  )}
                  {currentCategory === 'cabinets' && (
                    <CabinetSelector
                      selectedCabinet={customization.cabinet}
                      onCabinetSelect={updateCabinet}
                      className="shadow-none bg-transparent p-0"
                      searchTerm={searchTerm}
                    />
                  )}
                  {currentCategory === 'backsplash' && (
                    <BacksplashSelector
                      selectedBacksplash={customization.backsplash}
                      onBacksplashSelect={updateBacksplash}
                      className="shadow-none bg-transparent p-0"
                      searchTerm={searchTerm}
                    />
                  )}
                  {currentCategory === 'flooring' && (
                    <FlooringSelector
                      selectedFlooring={customization.flooring}
                      onFlooringSelect={updateFlooring}
                      className="shadow-none bg-transparent p-0"
                      searchTerm={searchTerm}
                    />
                  )}
                </div>
              )}

              {/* Export and Inquiry Buttons */}
              <div className="mt-8 space-y-3 border-t pt-6">
                <Button
                  onClick={exportDesign}
                  className="w-full timber-gradient text-white hover:opacity-90 transition-opacity"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Download Design
                </Button>

                <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                      <Send className="mr-2 h-4 w-4" />
                      Send Inquiry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Design Inquiry</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell us about your project..." rows={3} />
                      </div>
                      <div>
                        <Label htmlFor="file">Attach Files (optional)</Label>
                        <div className="mt-2">
                          <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setShowInquiryDialog(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleInquirySubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                        Send Inquiry
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Save/Share Buttons - Bottom Right */}
      {!isPreviewMode && (
        <div className="fixed bottom-4 right-4 z-20 flex space-x-2">
          <Button
            variant="ghost"
            onClick={handleSaveDesign}
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
          >
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button
            onClick={handleShareDesign}
            className="timber-gradient text-white hover:opacity-90 shadow-lg"
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      )}
    </div>
  );
}
