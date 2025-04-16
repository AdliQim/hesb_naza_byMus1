
import { useState } from "react";
import { 
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronRight,
  CircleX,
  Droplets,
  Filter,
  Info,
  Search,
  ThermometerSun,
  Tractor
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: number;
  title: string;
  description: string;
  source: string;
  severity: "critical" | "warning" | "info";
  status: "new" | "acknowledged" | "resolved";
  timestamp: string;
  category: "machinery" | "environment" | "tree";
}

const alertsData: Alert[] = [
  {
    id: 1,
    title: "Critical soil moisture levels",
    description: "Tree #14 has critically low soil moisture readings below threshold.",
    source: "IoT Sensor TS-14",
    severity: "critical",
    status: "new",
    timestamp: "10 minutes ago",
    category: "environment",
  },
  {
    id: 2,
    title: "Harvester maintenance required",
    description: "Scheduled maintenance for Harvester X1 is due in 2 days.",
    source: "Maintenance System",
    severity: "warning",
    status: "acknowledged",
    timestamp: "2 hours ago",
    category: "machinery",
  },
  {
    id: 3,
    title: "High temperature alert",
    description: "Zone B experiencing temperatures above 35°C for past 3 hours.",
    source: "Weather Station",
    severity: "warning",
    status: "new",
    timestamp: "3 hours ago",
    category: "environment",
  },
  {
    id: 4,
    title: "Pest detection on Tree #23",
    description: "AI system detected signs of red palm weevil infestation.",
    source: "Vision AI System",
    severity: "critical",
    status: "new",
    timestamp: "6 hours ago",
    category: "tree",
  },
  {
    id: 5,
    title: "Low battery on UAV Drone",
    description: "UAV Drone battery level at 20%. Charge required before next mission.",
    source: "UAV Drone",
    severity: "warning",
    status: "acknowledged",
    timestamp: "Yesterday",
    category: "machinery",
  },
  {
    id: 6,
    title: "Nutrient deficiency detected",
    description: "Trees #30-35 showing signs of potassium deficiency.",
    source: "Leaf Scanner",
    severity: "warning",
    status: "resolved",
    timestamp: "2 days ago",
    category: "tree",
  },
  {
    id: 7,
    title: "Weekly health scan complete",
    description: "Plantation-wide health scan completed with 2 anomalies detected.",
    source: "System",
    severity: "info",
    status: "acknowledged",
    timestamp: "3 days ago",
    category: "environment",
  },
  {
    id: 8,
    title: "Collector fuel level low",
    description: "Collector T2 fuel level below 30%. Refuel required.",
    source: "Collector T2",
    severity: "warning",
    status: "resolved",
    timestamp: "4 days ago",
    category: "machinery",
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(alertsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const { toast } = useToast();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredAlerts = alerts.filter((alert) => {
    // Apply search filter
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    const matchesCategory = categoryFilter === "all" || alert.category === categoryFilter;
    
    // Apply severity filter
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });
  
  const handleUpdateStatus = (id: number, newStatus: "acknowledged" | "resolved") => {
    const updatedAlerts = alerts.map((alert) =>
      alert.id === id ? { ...alert, status: newStatus } : alert
    );
    setAlerts(updatedAlerts);
    
    const alertTitle = alerts.find((a) => a.id === id)?.title;
    toast({
      title: `Alert ${newStatus === "acknowledged" ? "acknowledged" : "resolved"}`,
      description: `${alertTitle} has been ${newStatus}.`,
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage plantation alerts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {alerts.filter((a) => a.severity === "critical" && a.status !== "resolved").length}
            </p>
            <p className="text-sm text-muted-foreground">Unresolved critical alerts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-4 w-4 text-yellow-500" />
              Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {alerts.filter((a) => a.severity === "warning" && a.status !== "resolved").length}
            </p>
            <p className="text-sm text-muted-foreground">Unresolved warnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {alerts.filter((a) => a.status === "resolved").length}
            </p>
            <p className="text-sm text-muted-foreground">Alerts resolved this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Alert Management</CardTitle>
              <CardDescription>
                View and respond to plantation alerts
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] flex gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by category</SelectLabel>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="machinery">Machinery</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="tree">Trees</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by severity</SelectLabel>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="acknowledged">Acknowledged</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredAlerts.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No alerts found</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="new" className="space-y-4">
              {filteredAlerts
                .filter((alert) => alert.status === "new")
                .map((alert) => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="acknowledged" className="space-y-4">
              {filteredAlerts
                .filter((alert) => alert.status === "acknowledged")
                .map((alert) => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
            </TabsContent>
            
            <TabsContent value="resolved" className="space-y-4">
              {filteredAlerts
                .filter((alert) => alert.status === "resolved")
                .map((alert) => (
                  <AlertItem 
                    key={alert.id} 
                    alert={alert} 
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface AlertItemProps {
  alert: Alert;
  onUpdateStatus: (id: number, status: "acknowledged" | "resolved") => void;
}

function AlertItem({ alert, onUpdateStatus }: AlertItemProps) {
  const getAlertIcon = (category: string) => {
    switch (category) {
      case "machinery":
        return <Tractor className="h-5 w-5 text-blue-500" />;
      case "environment":
        return <ThermometerSun className="h-5 w-5 text-orange-500" />;
      case "tree":
        return <Droplets className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Critical
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Warning
          </Badge>
        );
      case "info":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            Info
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            New
          </Badge>
        );
      case "acknowledged":
        return (
          <Badge variant="outline" className="bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800">
            Acknowledged
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className={`border-l-4 ${
      alert.severity === "critical" 
        ? "border-l-red-500" 
        : alert.severity === "warning" 
          ? "border-l-yellow-500" 
          : "border-l-blue-500"
    }`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-muted rounded-lg p-3 self-start">
            {getAlertIcon(alert.category)}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
              <h3 className="font-medium">{alert.title}</h3>
              <div className="flex items-center gap-2">
                {getSeverityBadge(alert.severity)}
                {getStatusBadge(alert.status)}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span>Source: {alert.source}</span>
              <span>•</span>
              <span>{alert.timestamp}</span>
            </div>
            
            <div className="flex justify-end gap-2">
              {alert.status === "new" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onUpdateStatus(alert.id, "acknowledged")}
                >
                  Acknowledge
                </Button>
              )}
              
              {(alert.status === "new" || alert.status === "acknowledged") && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => onUpdateStatus(alert.id, "resolved")}
                >
                  Mark as Resolved
                </Button>
              )}
              
              {alert.status === "resolved" && (
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
