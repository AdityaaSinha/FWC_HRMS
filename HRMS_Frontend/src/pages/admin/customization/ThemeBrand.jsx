import React, { useState } from 'react';
import { Save, Upload, Download, Eye, Settings, Palette, Image, Type, Layout, Monitor, Smartphone, Tablet, RefreshCw, Copy, Check, X, Plus, Edit, Trash2, Sun, Moon, Contrast, Zap } from 'lucide-react';

const ThemeBrand = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [showPreview, setShowPreview] = useState(false);
  const [customColors, setCustomColors] = useState({
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    background: '#11131a',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#9ca3af'
  });
  const [logoSettings, setLogoSettings] = useState({
    mainLogo: null,
    favicon: null,
    loginLogo: null,
    emailLogo: null
  });
  const [typography, setTypography] = useState({
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    lineHeight: 'normal'
  });

  // Mock theme presets
  const themePresets = [
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Modern dark theme with blue accents',
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#11131a',
        surface: '#1f2937',
        text: '#ffffff',
        textSecondary: '#9ca3af'
      },
      preview: 'bg-gray-900'
    },
    {
      id: 'light',
      name: 'Light Theme',
      description: 'Clean light theme with professional colors',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#10b981',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280'
      },
      preview: 'bg-white'
    },
    {
      id: 'corporate',
      name: 'Corporate Blue',
      description: 'Professional corporate theme',
      colors: {
        primary: '#1e40af',
        secondary: '#3730a3',
        accent: '#059669',
        background: '#f8fafc',
        surface: '#ffffff',
        text: '#1f2937',
        textSecondary: '#4b5563'
      },
      preview: 'bg-blue-50'
    },
    {
      id: 'modern',
      name: 'Modern Purple',
      description: 'Contemporary purple-themed design',
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#ec4899',
        background: '#0f0f23',
        surface: '#1e1b4b',
        text: '#ffffff',
        textSecondary: '#a5b4fc'
      },
      preview: 'bg-purple-900'
    }
  ];

  // Mock font options
  const fontOptions = [
    { value: 'Inter', label: 'Inter', category: 'Sans Serif' },
    { value: 'Roboto', label: 'Roboto', category: 'Sans Serif' },
    { value: 'Open Sans', label: 'Open Sans', category: 'Sans Serif' },
    { value: 'Lato', label: 'Lato', category: 'Sans Serif' },
    { value: 'Poppins', label: 'Poppins', category: 'Sans Serif' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Sans Serif' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans Serif' },
    { value: 'Nunito', label: 'Nunito', category: 'Sans Serif' }
  ];

  // Mock statistics
  const stats = [
    { title: 'Active Theme', value: 'Dark', icon: Palette, color: 'blue' },
    { title: 'Custom Colors', value: '7', icon: Contrast, color: 'purple' },
    { title: 'Logo Assets', value: '4', icon: Image, color: 'green' },
    { title: 'Font Family', value: 'Inter', icon: Type, color: 'orange' }
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  const ColorPicker = ({ label, value, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex items-center space-x-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-600 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {/* Color picker logic */}}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="p-2 text-gray-400 hover:text-white">
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const LogoUpload = ({ label, description, currentLogo, onUpload }) => (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6">
      <h4 className="text-white font-medium mb-2">{label}</h4>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      
      {currentLogo ? (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-white text-sm">logo.png</p>
              <p className="text-gray-400 text-xs">256x256 • 45KB</p>
            </div>
          </div>
          <button className="text-red-400 hover:text-red-300">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-4">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Drop your logo here or click to browse</p>
        </div>
      )}
      
      <button
        onClick={onUpload}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        <Upload className="h-4 w-4" />
        <span>Upload Logo</span>
      </button>
    </div>
  );

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme.id);
    setCustomColors(theme.colors);
  };

  const handleSaveTheme = () => {
    // Save theme logic here
    console.log('Saving theme settings...');
  };

  return (
    <div className="p-6 bg-[#11131A] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Theme & Branding</h1>
        <p className="text-gray-400">Customize the visual appearance and branding of your HRMS platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Main Panel */}
        <div className="flex-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg">
            {/* Tabs */}
            <div className="border-b border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'colors', label: 'Colors & Themes', icon: Palette },
                  { id: 'logos', label: 'Logos & Assets', icon: Image },
                  { id: 'typography', label: 'Typography', icon: Type },
                  { id: 'layout', label: 'Layout', icon: Layout },
                  { id: 'preview', label: 'Preview', icon: Eye }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Colors & Themes Tab */}
            {activeTab === 'colors' && (
              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Theme Presets</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {themePresets.map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => handleThemeSelect(theme)}
                        className={`cursor-pointer rounded-lg border-2 transition ${
                          selectedTheme === theme.id
                            ? 'border-indigo-500 bg-indigo-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className={`h-24 rounded-t-lg ${theme.preview}`} />
                        <div className="p-4">
                          <h4 className="text-white font-medium mb-1">{theme.name}</h4>
                          <p className="text-gray-400 text-sm">{theme.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Custom Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ColorPicker
                      label="Primary Color"
                      value={customColors.primary}
                      onChange={(value) => setCustomColors({...customColors, primary: value})}
                    />
                    <ColorPicker
                      label="Secondary Color"
                      value={customColors.secondary}
                      onChange={(value) => setCustomColors({...customColors, secondary: value})}
                    />
                    <ColorPicker
                      label="Accent Color"
                      value={customColors.accent}
                      onChange={(value) => setCustomColors({...customColors, accent: value})}
                    />
                    <ColorPicker
                      label="Background Color"
                      value={customColors.background}
                      onChange={(value) => setCustomColors({...customColors, background: value})}
                    />
                    <ColorPicker
                      label="Surface Color"
                      value={customColors.surface}
                      onChange={(value) => setCustomColors({...customColors, surface: value})}
                    />
                    <ColorPicker
                      label="Text Color"
                      value={customColors.text}
                      onChange={(value) => setCustomColors({...customColors, text: value})}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSaveTheme}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Theme</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    <RefreshCw className="h-4 w-4" />
                    <span>Reset to Default</span>
                  </button>
                </div>
              </div>
            )}

            {/* Logos & Assets Tab */}
            {activeTab === 'logos' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LogoUpload
                    label="Main Logo"
                    description="Primary logo displayed in the header (Recommended: 200x60px)"
                    currentLogo={logoSettings.mainLogo}
                    onUpload={() => {/* Upload logic */}}
                  />
                  <LogoUpload
                    label="Favicon"
                    description="Small icon displayed in browser tabs (Recommended: 32x32px)"
                    currentLogo={logoSettings.favicon}
                    onUpload={() => {/* Upload logic */}}
                  />
                  <LogoUpload
                    label="Login Logo"
                    description="Logo displayed on login and authentication pages"
                    currentLogo={logoSettings.loginLogo}
                    onUpload={() => {/* Upload logic */}}
                  />
                  <LogoUpload
                    label="Email Logo"
                    description="Logo used in email templates and notifications"
                    currentLogo={logoSettings.emailLogo}
                    onUpload={() => {/* Upload logic */}}
                  />
                </div>
              </div>
            )}

            {/* Typography Tab */}
            {activeTab === 'typography' && (
              <div className="p-6">
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Font Family
                      </label>
                      <select
                        value={typography.fontFamily}
                        onChange={(e) => setTypography({...typography, fontFamily: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {fontOptions.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.label} ({font.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Base Font Size
                      </label>
                      <select
                        value={typography.fontSize}
                        onChange={(e) => setTypography({...typography, fontSize: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="small">Small (14px)</option>
                        <option value="medium">Medium (16px)</option>
                        <option value="large">Large (18px)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Font Weight
                      </label>
                      <select
                        value={typography.fontWeight}
                        onChange={(e) => setTypography({...typography, fontWeight: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="light">Light (300)</option>
                        <option value="normal">Normal (400)</option>
                        <option value="medium">Medium (500)</option>
                        <option value="semibold">Semi Bold (600)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Line Height
                      </label>
                      <select
                        value={typography.lineHeight}
                        onChange={(e) => setTypography({...typography, lineHeight: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="tight">Tight (1.25)</option>
                        <option value="normal">Normal (1.5)</option>
                        <option value="relaxed">Relaxed (1.75)</option>
                      </select>
                    </div>
                  </div>

                  {/* Typography Preview */}
                  <div className="mt-8 p-6 bg-gray-700 border border-gray-600 rounded-lg">
                    <h4 className="text-white font-medium mb-4">Typography Preview</h4>
                    <div style={{ fontFamily: typography.fontFamily }}>
                      <h1 className="text-2xl font-bold text-white mb-2">Heading 1</h1>
                      <h2 className="text-xl font-semibold text-white mb-2">Heading 2</h2>
                      <h3 className="text-lg font-medium text-white mb-2">Heading 3</h3>
                      <p className="text-gray-300 mb-2">
                        This is a paragraph of body text that demonstrates how the selected typography settings will appear in the application.
                      </p>
                      <p className="text-gray-400 text-sm">
                        This is smaller text that might be used for captions or secondary information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Layout Settings</h3>
                  <p className="text-gray-400 mb-6">Configure layout preferences and responsive behavior</p>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Configure Layout
                  </button>
                </div>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Theme Preview</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
                      <Monitor className="h-4 w-4" />
                      <span>Desktop</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
                      <Tablet className="h-4 w-4" />
                      <span>Tablet</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
                      <Smartphone className="h-4 w-4" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <div className="bg-gray-900 rounded-lg p-6 min-h-96">
                    <div className="text-center py-12">
                      <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-white mb-2">Live Preview</h3>
                      <p className="text-gray-400">Preview your theme changes in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Save className="h-4 w-4" />
                <span>Save Current Theme</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Download className="h-4 w-4" />
                <span>Export Theme</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded">
                <Upload className="h-4 w-4" />
                <span>Import Theme</span>
              </button>
            </div>
          </div>

          {/* Theme Info */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Current Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Theme</span>
                <span className="text-white text-sm capitalize">{selectedTheme}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Font</span>
                <span className="text-white text-sm">{typography.fontFamily}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Primary Color</span>
                <div
                  className="w-6 h-6 rounded border border-gray-600"
                  style={{ backgroundColor: customColors.primary }}
                />
              </div>
            </div>
          </div>

          {/* Recent Changes */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-medium mb-4">Recent Changes</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-300">Primary color updated</p>
                <p className="text-gray-500 text-xs">5 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Logo uploaded</p>
                <p className="text-gray-500 text-xs">1 hour ago</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-300">Font family changed</p>
                <p className="text-gray-500 text-xs">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeBrand;
