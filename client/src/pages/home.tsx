import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Share, Settings, Info, Expand, ArrowLeft, Search, Send, Upload, X, Menu, Bell, User, Download, Palette, Home as HomeIcon, Layers, Grid3X3, DoorClosed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'wall-colors', name: 'Wall Colors', icon: Palette, description: 'Choose your perfect wall color' },
    { id: 'cabinets', name: 'Cabinet Styles', icon: DoorClosed, description: 'Select cabinet finishes' },
    { id: 'backsplash', name: 'Backsplash', icon: Grid3X3, description: 'Pick backsplash patterns' },
    { id: 'flooring', name: 'Flooring', icon: Layers, description: 'Choose flooring materials' },
  ];

  const handleSaveDesign = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Design Saved Successfully",
        description: "Your kitchen design has been saved to your account.",
      });
    }, 1000);
  };

  const handleExportDesign = async () => {
    setIsLoading(true);
    try {
      await exportDesign();
      toast({
        title: "Design Downloaded",
        description: "Your kitchen design has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error downloading your design. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareDesign = () => {
    toast({
      title: "Share Link Copied",
      description: "Design share link has been copied to your clipboard.",
    });
  };

  const handleInquirySubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inquiry Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      setShowInquiryDialog(false);
    }, 1000);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDesignInfo = () => {
    setShowDesignInfo(!showDesignInfo);
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

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modern Header */}
      {!isPreviewMode && (
        <motion.header 
          className="app-header h-16 flex items-center justify-between px-6 z-30 relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Left section - Logo and Title */}
          <div className="flex items-center space-x-4">
            <img src={TIMBER_CRAFT_LOGO} alt="Timber Craft" className="h-8 w-auto" />
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Kitchen Designer</h1>
              <p className="text-xs text-gray-500">Professional Kitchen Customization</p>
            </div>
          </div>

          {/* Center section - Quick actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              onClick={toggleSidebar}
              variant="ghost"
              size="sm"
              className={`transition-all duration-200 ${showSidebar ? 'bg-blue-100 text-blue-700' : ''}`}
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button
              onClick={toggleDesignInfo}
              variant="ghost"
              size="sm"
              className={`transition-all duration-200 ${showDesignInfo ? 'bg-blue-100 text-blue-700' : ''}`}
            >
              <Info className="h-4 w-4 mr-2" />
              Info
            </Button>
          </div>

          {/* Right section - Actions and branding */}
          <div className="flex items-center space-x-3">
            {/* Preview Mode Exit Button */}
            {isPreviewMode && (
              <Button
                onClick={togglePreviewMode}
                className="bg-red-500 hover:bg-red-600 text-white shadow-sm transition-all duration-200"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Exit Preview
              </Button>
            )}
            
            {/* Regular Preview Button */}
            {!isPreviewMode && (
              <Button
                onClick={togglePreviewMode}
                className="timber-gradient-subtle hover:opacity-90 text-white shadow-sm transition-all duration-200"
                size="sm"
              >
                <Expand className="h-4 w-4 mr-2" />
                Preview
              </Button>
            )}
            <Separator orientation="vertical" className="h-6" />
            <img src={BIOREV_LOGO} alt="Biorev Technology" className="h-6 w-auto opacity-70" />
          </div>
        </motion.header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Kitchen Preview - Main Content */}
        <div className={`flex-1 relative overflow-hidden transition-all duration-300 ${showSidebar && !isPreviewMode ? 'mr-96' : ''}`}>
          <motion.div
            className="kitchen-preview-container w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={getKitchenImage()}
              alt="Kitchen Design Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Enhanced wall color overlay */}
            <motion.div
              className="wall-color-overlay"
              style={{ backgroundColor: customization.wallColor }}
              animate={{ 
                opacity: customization.wallColor === '#ffffff' ? 0 : 0.25,
                mixBlendMode: customization.wallColor === '#ffffff' ? 'normal' : 'multiply'
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Mobile Control Button */}
          {!isPreviewMode && (
            <div className="md:hidden absolute top-4 left-4 z-20">
              <Button
                onClick={toggleSidebar}
                className="floating-action"
                size="sm"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Enhanced Design Info Card */}
          <AnimatePresence>
            {showDesignInfo && !isPreviewMode && (
              <motion.div
                initial={{ y: -20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="absolute top-4 left-4 z-10"
              >
                <Card className="w-80 modern-card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Current Design</h3>
                        <p className="text-sm text-gray-500">Timber Craft Kitchen</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleDesignInfo}
                        className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                            style={{ backgroundColor: customization.wallColor }}
                          />
                          <span className="text-sm font-medium text-gray-700">Wall Color</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Custom</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded border-2 border-white shadow-sm bg-amber-200" />
                          <span className="text-sm font-medium text-gray-700">Natural Wood Cabinets</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded border-2 border-white shadow-sm bg-white" />
                          <span className="text-sm font-medium text-gray-700">Subway Backsplash</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Classic</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded border-2 border-white shadow-sm bg-amber-100" />
                          <span className="text-sm font-medium text-gray-700">Light Oak Flooring</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">Natural</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Right Sidebar */}
        <AnimatePresence>
          {showSidebar && !isPreviewMode && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-16 bottom-0 w-96 sidebar-panel z-20 overflow-hidden flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentCategory ? (
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBackToCategories}
                          className="mr-2 p-1 hover:bg-gray-100"
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
                    className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {currentCategory && (
                  <p className="text-sm text-gray-500">
                    {categories.find(c => c.id === currentCategory)?.description}
                  </p>
                )}
              </div>

              {/* Search Bar */}
              {currentCategory && (
                <div className="p-6 border-b border-gray-200/50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search options..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input pl-10"
                    />
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                {!currentCategory ? (
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <motion.div
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            onClick={() => handleCategorySelect(category.id)}
                            className="category-button group"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                                <IconComponent className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {category.description}
                                </p>
                              </div>
                              <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180 group-hover:text-blue-600 transition-colors duration-200" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
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
                  </motion.div>
                )}
              </div>

              {/* Sidebar Footer - Actions */}
              <div className="p-6 border-t border-gray-200/50 bg-gray-50/50">
                <div className="space-y-3">
                  <Button
                    onClick={handleExportDesign}
                    disabled={isLoading}
                    className="w-full timber-gradient-subtle text-white hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Download Design
                      </>
                    )}
                  </Button>

                  <Dialog open={showInquiryDialog} onOpenChange={setShowInquiryDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md">
                        <Send className="mr-2 h-4 w-4" />
                        Send Inquiry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="modal-content sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Send Design Inquiry</DialogTitle>
                        <p className="text-sm text-gray-500 mt-2">Get a quote for your custom kitchen design</p>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
                          <Input id="name" placeholder="Enter your full name" className="focus-ring" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                          <Input id="email" type="email" placeholder="your.email@example.com" className="focus-ring" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="focus-ring" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-medium">Project Details</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Tell us about your kitchen project, timeline, and any specific requirements..." 
                            rows={4} 
                            className="focus-ring resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="file" className="text-sm font-medium">Attach Files (Optional)</Label>
                          <div className="mt-2">
                            <Button variant="outline" className="w-full hover:bg-gray-50 transition-colors duration-200">
                              <Upload className="mr-2 h-4 w-4" />
                              Choose Files
                            </Button>
                            <p className="text-xs text-gray-500 mt-1">Upload floor plans, inspiration images, or other relevant files</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowInquiryDialog(false)} 
                          className="flex-1 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleInquirySubmit} 
                          disabled={isLoading}
                          className="flex-1 bg-green-600 hover:bg-green-700 transition-colors duration-200"
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Sending...
                            </div>
                          ) : (
                            'Send Inquiry'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Floating Action Buttons */}
      {!isPreviewMode && (
        <motion.div
          className={`fixed bottom-6 z-20 flex flex-col space-y-3 transition-all duration-300 ${
            showSidebar ? 'right-[25rem]' : 'right-6'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            onClick={handleSaveDesign}
            disabled={isLoading}
            className="floating-action shadow-lg hover:shadow-xl w-12 h-12"
            size="sm"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            onClick={handleShareDesign}
            className="floating-action shadow-lg hover:shadow-xl w-12 h-12"
            size="sm"
          >
            <Share className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
