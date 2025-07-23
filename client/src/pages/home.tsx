import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Share, Settings, Info, Expand, ArrowLeft, Search, Send, Upload, X, Menu, Bell, User, Download, Palette, Home, Layers, Grid3X3, DoorClosed } from 'lucide-react';
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
            <Button
              onClick={togglePreviewMode}
              className={`${isPreviewMode ? 'bg-red-500 hover:bg-red-600' : 'timber-gradient-subtle hover:opacity-90'} text-white shadow-sm transition-all duration-200`}
              size="sm"
            >
              <Expand className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </Button>
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
                            className="category-button"
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
          className="fixed bottom-6 right-6 z-20 flex flex-col space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button
            onClick={handleSaveDesign}
            disabled={isLoading}
            className="floating-action shadow-lg hover:shadow-xl"
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
            className="floating-action shadow-lg hover:shadow-xl"
            size="sm"
          >
            <Share className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
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
