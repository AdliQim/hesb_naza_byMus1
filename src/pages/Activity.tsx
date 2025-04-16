import { useState } from "react";
import { 
  CheckCircle,
  Clock,
  Filter,
  Leaf,
  Search,
  SortDesc,
  Tractor,
  User
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  action: string;
  subject: string;
  timestamp: string;
  type: "system" | "machinery" | "tree" | "user";
  status?: "completed" | "pending" | "failed";
}

const activityData: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: "System AI",
      avatar: "",
      initials: "AI",
    },
    action: "Detected low moisture",
    subject: "Tree #14",
    timestamp: "10 minutes ago",
    type: "system",
    status: "pending",
  },
  {
    id: 2,
    user: {
      name: "Kamal Mustapha",
      avatar: "",
      initials: "KM",
    },
    action: "Initiated irrigation",
    subject: "Zone B",
    timestamp: "45 minutes ago",
    type: "user",
    status: "completed",
  },
  {
    id: 3,
    user: {
      name: "Harvester X1",
      avatar: "",
      initials: "HX",
    },
    action: "Completed harvest",
    subject: "Zone A, Row 3",
    timestamp: "1 hour ago",
    type: "machinery",
    status: "completed",
  },
  {
    id: 4,
    user: {
      name: "System AI",
      avatar: "",
      initials: "AI",
    },
    action: "Detected pest activity",
    subject: "Tree #23",
    timestamp: "3 hours ago",
    type: "system",
    status: "pending",
  },
  {
    id: 5,
    user: {
      name: "Lisa Wong",
      avatar: "",
      initials: "LW",
    },
    action: "Updated health status",
    subject: "Trees #30-35",
    timestamp: "5 hours ago",
    type: "user",
    status: "completed",
  },
  {
    id: 6,
    user: {
      name: "UAV Drone",
      avatar: "",
      initials: "UV",
    },
    action: "Completed scan",
    subject: "Full Plantation",
    timestamp: "Yesterday",
    type: "machinery",
    status: "completed",
  },
  {
    id: 7,
    user: {
      name: "System AI",
      avatar: "",
      initials: "AI",
    },
    action: "Generated health report",
    subject: "April 2025",
    timestamp: "Yesterday",
    type: "system",
    status: "completed",
  },
  {
    id: 8,
    user: {
      name: "Kamal Mustapha",
      avatar: "",
      initials: "KM",
    },
    action: "Scheduled maintenance",
    subject: "Harvester X1",
    timestamp: "2 days ago",
    type: "user",
    status: "pending",
  },
  {
    id: 9,
    user: {
      name: "Collector T2",
      avatar: "",
      initials: "CT",
    },
    action: "Low fuel alert",
    subject: "Zone C",
    timestamp: "2 days ago",
    type: "machinery",
    status: "pending",
  },
  {
    id: 10,
    user: {
      name: "System AI",
      avatar: "",
      initials: "AI",
    },
    action: "Detected nutrient deficiency",
    subject: "Tree #07",
    timestamp: "3 days ago",
    type: "system",
    status: "failed",
  },
];

export default function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredActivity, setFilteredActivity] = useState(activityData);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredActivity(activityData);
    } else {
      const filtered = activityData.filter(
        (item) =>
          item.action.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.subject.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredActivity(filtered);
    }
  };
  
  const filterByType = (type: string) => {
    if (type === "all") {
      setFilteredActivity(activityData);
    } else {
      const filtered = activityData.filter((item) => item.type === type);
      setFilteredActivity(filtered);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold">Activity Log</h1>
        <p className="text-muted-foreground">Track all plantation activities and events</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle>Plantation Activity</CardTitle>
              <CardDescription>
                View and filter recent plantation activities
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => filterByType("all")}>
                      All activities
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByType("system")}>
                      System events
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByType("machinery")}>
                      Machinery activities
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByType("user")}>
                      User actions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => filterByType("tree")}>
                      Tree events
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SortDesc className="h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Newest first</DropdownMenuItem>
                    <DropdownMenuItem>Oldest first</DropdownMenuItem>
                    <DropdownMenuItem>User name</DropdownMenuItem>
                    <DropdownMenuItem>Activity type</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredActivity.length === 0 ? (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No activities found</p>
                </div>
              ) : (
                filteredActivity.map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="alerts" className="space-y-4">
              {filteredActivity
                .filter((item) => item.type === "system")
                .map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filteredActivity
                .filter((item) => item.status === "completed")
                .map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              {filteredActivity
                .filter((item) => item.status === "pending")
                .map((item) => (
                  <ActivityItem key={item.id} item={item} />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface ActivityItemProps {
  item: ActivityItem;
}

function ActivityItem({ item }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "system":
        return <Leaf className="h-4 w-4 text-primary" />;
      case "machinery":
        return <Tractor className="h-4 w-4 text-blue-500" />;
      case "user":
        return <User className="h-4 w-4 text-purple-500" />;
      case "tree":
        return <Leaf className="h-4 w-4 text-green-500" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-orange-500 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarFallback className={`
          ${item.type === "system" ? "bg-primary/10 text-primary" : 
           item.type === "machinery" ? "bg-blue-100 dark:bg-blue-950/50 text-blue-500" :
           item.type === "user" ? "bg-purple-100 dark:bg-purple-950/50 text-purple-500" : 
           "bg-green-100 dark:bg-green-950/50 text-green-500"}
        `}>
          {item.user.initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{item.user.name}</span>
            <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
              {getActivityIcon(item.type)}
              <span className="ml-1 hidden md:inline-block">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(item.status)}
            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.timestamp}</span>
          </div>
        </div>
        
        <p className="text-sm mt-1">
          {item.action} • <span className="text-muted-foreground">{item.subject}</span>
        </p>
      </div>
    </div>
  );
}
