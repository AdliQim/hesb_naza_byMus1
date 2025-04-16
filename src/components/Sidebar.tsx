import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Settings, 
  AlertTriangle, 
  Map, 
  Tractor, 
  ClipboardList,
  UserCircle,
  LogOut,
  ChevronDown,
  Plus
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showSwitchAccount, setShowSwitchAccount] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Ahmad Razali',
    role: 'Plantation Admin',
    email: 'ahmad.razali@example.com',
    phone: '+60 12-345-6789'
  });
  const [tempProfile, setTempProfile] = useState({ ...userProfile });
  const [newAccount, setNewAccount] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    password: ''
  });

  const [availableAccounts] = useState([
    { id: 1, name: 'Ahmad Razali', role: 'Plantation Admin' },
    { id: 2, name: 'Sarah Chen', role: 'Field Manager' },
    { id: 3, name: 'David Wong', role: 'Technical Support' },
  ]);
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: Tractor, label: 'Machinery', path: '/machinery' },
    { icon: Map, label: 'Oil Palm Map', path: '/map' },
    { icon: ClipboardList, label: 'Activity Log', path: '/activity' },
    { icon: AlertTriangle, label: 'Alerts', path: '/alerts' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    toast({
      title: "Account Options",
      description: "Choose an option to continue",
    });
    setShowSwitchAccount(true);
    setShowDropdown(false);
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...tempProfile });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
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
    setShowSwitchAccount(false);
  };

  const handleSwitchAccount = (account) => {
    setUserProfile({
      ...userProfile,
      name: account.name,
      role: account.role
    });
    toast({
      title: "Account Switched",
      description: `You're now logged in as ${account.name}`,
    });
    setShowSwitchAccount(false);
  };

  return (
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-xl font-orbitron font-bold text-palm-green dark:text-palm-neon">
          Sawit-Sense
        </h1>
        <p className="text-xs font-roboto-mono text-muted-foreground mt-1">
          HESB & NAZA Oil Palm Monitoring
        </p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/30'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="relative">
          <button 
            className="flex items-center gap-3 p-3 rounded-lg bg-muted w-full hover:bg-muted/80 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <UserCircle size={24} className="text-palm-green dark:text-palm-neon" />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{userProfile.name}</p>
              <p className="text-xs text-muted-foreground">{userProfile.role}</p>
            </div>
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-card rounded-lg border border-border shadow-lg overflow-hidden z-10">
              <div className="divide-y divide-border">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full flex items-center gap-2 p-3 text-sm text-left hover:bg-muted/50 transition-colors">
                      <UserCircle size={16} />
                      <span>Edit Profile</span>
                    </button>
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
                    </div>
                    <div className="flex justify-end space-x-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={handleSaveProfile}>Save Changes</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <button 
                  className="w-full flex items-center gap-2 p-3 text-sm text-left text-red-500 hover:bg-muted/50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
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
            <Button onClick={handleCreateAccount}>Create New Account</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSwitchAccount} onOpenChange={setShowSwitchAccount}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Options</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Switch to Existing Account</h4>
              <div className="space-y-2">
                {availableAccounts.map(account => (
                  <button 
                    key={account.id}
                    className="w-full flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors text-left"
                    onClick={() => handleSwitchAccount(account)}
                  >
                    <UserCircle size={20} className="text-palm-green" />
                    <div>
                      <p className="font-medium text-sm">{account.name}</p>
                      <p className="text-xs text-muted-foreground">{account.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-medium mb-2">Create New Account</h4>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  setShowCreateAccount(true);
                }}
              >
                <Plus size={16} />
                <span>Create New Account</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default Sidebar;