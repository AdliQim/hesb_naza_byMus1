import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Sun, Moon } from 'lucide-react';
import Header from '@/components/Header';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('account');
  const [userProfile, setUserProfile] = useState({
    name: 'Ahmad Razali',
    email: 'ahmad.razali@example.com',
    phone: '+60 12-345-6789',
    role: 'Plantation Administrator'
  });
  const [tempProfile, setTempProfile] = useState({ ...userProfile });
  const [layoutDensity, setLayoutDensity] = useState('comfortable');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    password: ''
  });
  
  const handleSaveChanges = () => {
    setUserProfile({ ...tempProfile });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };
  
  const handleApplySettings = () => {
    toast({
      title: "Settings Applied",
      description: "Your appearance settings have been applied",
    });
  };

  const handleCreateAccount = () => {
    if (!newAccount.username || !newAccount.email || !newAccount.password || !newAccount.phone || !newAccount.role) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Account Created",
      description: "New account has been created successfully",
    });
    setShowCreateAccount(false);
    setNewAccount({ username: '', email: '', phone: '', role: '', password: '' });
  };
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <Header 
        title="Settings" 
        subtitle="Configure your plantation monitoring system" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border overflow-hidden sticky top-6">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Settings Menu</h2>
            </div>
            
            <div className="divide-y divide-border">
              <SettingsMenuItem 
                icon={User} 
                label="Account Settings" 
                isActive={activeSection === 'account'}
                onClick={() => setActiveSection('account')}
              />
              <SettingsMenuItem 
                icon={SettingsIcon} 
                label="Appearance" 
                isActive={activeSection === 'appearance'}
                onClick={() => setActiveSection('appearance')}
              />
              <SettingsMenuItem 
                icon={SettingsIcon} 
                label="Database" 
                isActive={activeSection === 'database'}
                onClick={() => setActiveSection('database')}
              />
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          {activeSection === 'account' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Account Settings</h2>
              </div>
              
              <div className="p-4 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User size={32} className="text-muted-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{userProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile.role}</p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <input 
                            type="text" 
                            value={tempProfile.name} 
                            onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} 
                            className="w-full p-2 border rounded-md" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <input 
                            type="email" 
                            value={tempProfile.email} 
                            onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})} 
                            className="w-full p-2 border rounded-md" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <input 
                            type="tel" 
                            value={tempProfile.phone} 
                            onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})} 
                            className="w-full p-2 border rounded-md" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Role</label>
                          <input 
                            type="text" 
                            value={tempProfile.role} 
                            onChange={(e) => setTempProfile({...tempProfile, role: e.target.value})} 
                            className="w-full p-2 border rounded-md" 
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button onClick={() => {
                            setUserProfile({...tempProfile});
                            toast({
                              title: "Profile Updated",
                              description: "Your profile has been updated successfully"
                            });
                          }}>Save Changes</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={userProfile.email} 
                      className="w-full p-2.5 rounded-md border border-border bg-background"
                      onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={userProfile.phone} 
                      className="w-full p-2.5 rounded-md border border-border bg-background"
                      onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input 
                      type="text" 
                      value={userProfile.role} 
                      className="w-full p-2.5 rounded-md border border-border bg-background"
                      onChange={(e) => setTempProfile({...tempProfile, role: e.target.value})}
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCreateAccount(true)}
                  >
                    Create New Account
                  </Button>
                  <Button 
                    className="bg-palm-green text-white hover:bg-palm-green/90"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'appearance' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Appearance</h2>
              </div>
              
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Theme Mode</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className={`border ${
                        theme === 'light' 
                          ? 'border-palm-green' 
                          : 'border-border'
                      } rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors`}
                      onClick={() => theme !== 'light' && toggleTheme()}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <Sun size={24} className="text-orange-400" />
                        <div className={`w-4 h-4 rounded-full ${
                          theme === 'light' 
                            ? 'bg-palm-green' 
                            : 'bg-muted'
                        }`}></div>
                      </div>
                      <h4 className="font-medium">Light Mode</h4>
                      <p className="text-xs text-muted-foreground mt-1">Clean, bright interface</p>
                    </div>
                    
                    <div 
                      className={`border ${
                        theme === 'dark' 
                          ? 'border-palm-neon' 
                          : 'border-border'
                      } rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors`}
                      onClick={() => theme !== 'dark' && toggleTheme()}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <Moon size={24} className="text-indigo-400" />
                        <div className={`w-4 h-4 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-palm-neon' 
                            : 'bg-muted'
                        }`}></div>
                      </div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-xs text-muted-foreground mt-1">Reduced eye strain</p>
                    </div>
                  </div>
                </div>
                
                {/* <div className="space-y-4">
                  <h3 className="font-medium">Layout Density</h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="layout-density"
                        checked={layoutDensity === 'comfortable'}
                        onChange={() => setLayoutDensity('comfortable')}
                        className="w-4 h-4 text-palm-green"
                      />
                      <span>Comfortable</span>
                    </label>
                    
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="layout-density"
                        checked={layoutDensity === 'compact'} 
                        onChange={() => setLayoutDensity('compact')}
                        className="w-4 h-4 text-palm-green"
                      />
                      <span>Compact</span>
                    </label>
                  </div>
                </div> */}
                 
                <div className="border-t border-border pt-4 flex justify-end">
                  <Button 
                    className="bg-palm-green text-white hover:bg-palm-green/90"
                    onClick={handleApplySettings}
                  >
                    Apply Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">Database Management</h2>
              </div>
              
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Oil Palm Database</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Tree Records</span>
                        <span className="text-palm-green">40 entries</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Health records and growth metrics for all palm trees</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Database Accessed",
                          description: "Tree records database opened"
                        })}
                      >
                        Access Database
                      </Button>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Machinery Records</span>
                        <span className="text-palm-green">12 entries</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Maintenance and operational data for plantation machinery</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Database Accessed",
                          description: "Machinery records database opened"
                        })}
                      >
                        Access Database
                      </Button>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Plantation Metrics</span>
                        <span className="text-palm-green">326 entries</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Historical plantation performance data and analytics</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast({
                          title: "Database Accessed",
                          description: "Plantation metrics database opened"
                        })}
                      >
                        Access Database
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Database Backup</h4>
                      <p className="text-sm text-muted-foreground">Last backup: Today, 08:45 AM</p>
                    </div>
                    <Button 
                      className="bg-palm-green text-white hover:bg-palm-green/90"
                      onClick={() => toast({
                        title: "Backup Initiated",
                        description: "Database backup process started"
                      })}
                    >
                      Backup Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCreateAccount} onOpenChange={setShowCreateAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <input 
                type="text" 
                value={newAccount.username}
                onChange={(e) => setNewAccount({...newAccount, username: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                value={newAccount.email}
                onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                value={newAccount.phone}
                onChange={(e) => setNewAccount({...newAccount, phone: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <input 
                type="text" 
                value={newAccount.role}
                onChange={(e) => setNewAccount({...newAccount, role: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Enter role (e.g. Plantation Manager)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input 
                type="password" 
                value={newAccount.password}
                onChange={(e) => setNewAccount({...newAccount, password: e.target.value})}
                className="w-full p-2 border rounded-md"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreateAccount}>Create Account</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SettingsMenuItem = ({ icon: Icon, label, isActive = false, onClick }) => (
  <button 
    className={`w-full p-3 flex items-center gap-3 ${
      isActive 
        ? 'bg-muted/70 font-medium' 
        : 'hover:bg-muted/30'
    } transition-colors`}
    onClick={onClick}
  >
    <Icon size={18} className={isActive ? 'text-palm-green' : 'text-muted-foreground'} />
    <span>{label}</span>
  </button>
);

export default Settings;