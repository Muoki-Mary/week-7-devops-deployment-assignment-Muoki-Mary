import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Server,
  Database,
  Globe,
  Zap,
  Eye,
  Bell
} from "lucide-react";

const systemMetrics = [
  { name: "CPU Usage", value: 32, max: 100, status: "good", icon: Server },
  { name: "Memory", value: 67, max: 100, status: "warning", icon: Database },
  { name: "Disk Space", value: 45, max: 100, status: "good", icon: Database },
  { name: "Network I/O", value: 23, max: 100, status: "good", icon: Globe }
];

const applicationMetrics = [
  { name: "Response Time", current: "245ms", change: -12, trend: "down" },
  { name: "Requests/min", current: "1,234", change: 23, trend: "up" },
  { name: "Error Rate", current: "0.2%", change: -0.1, trend: "down" },
  { name: "Active Users", current: "156", change: 45, trend: "up" }
];

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "High memory usage detected on production server",
    time: "2 minutes ago",
    service: "Backend API"
  },
  {
    id: 2,
    type: "info", 
    message: "Deployment completed successfully",
    time: "15 minutes ago",
    service: "Frontend"
  },
  {
    id: 3,
    type: "error",
    message: "Database connection timeout in staging",
    time: "1 hour ago",
    service: "Database"
  }
];

const uptime = [
  { service: "Frontend", uptime: "99.9%", status: "operational" },
  { service: "Backend API", uptime: "99.8%", status: "operational" },
  { service: "Database", uptime: "99.9%", status: "operational" },
  { service: "CDN", uptime: "100%", status: "operational" }
];

export function MonitoringPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time application and infrastructure monitoring
          </p>
        </div>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" />
          Alerts
        </Button>
      </div>

      {/* System Resources */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            System Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant={metric.status === 'good' ? 'default' : 'secondary'}>
                    {metric.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm">{metric.name}</h3>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{metric.value}%</span>
                    <span className="text-muted-foreground">of {metric.max}%</span>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className={`h-2 ${metric.status === 'warning' ? '[&>div]:bg-warning' : ''}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Metrics */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Application Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {applicationMetrics.map((metric) => (
              <div key={metric.name} className="p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{metric.name}</h3>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">{metric.current}</p>
                  <p className={`text-sm ${metric.change > 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}% from last hour
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Uptime */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Service Uptime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uptime.map((service) => (
              <div key={service.service} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-success animate-glow" />
                  <span className="font-medium">{service.service}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{service.uptime}</span>
                  <Badge variant="default">
                    {service.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-destructive' :
                  alert.type === 'warning' ? 'bg-warning' :
                  'bg-info'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>{alert.service}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
                <Badge variant={
                  alert.type === 'error' ? 'destructive' :
                  alert.type === 'warning' ? 'secondary' :
                  'default'
                }>
                  {alert.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Error Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Set up Sentry for real-time error monitoring and crash reporting
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Performance</h3>
            <p className="text-sm text-muted-foreground">
              Monitor application performance with detailed analytics
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Alerts & Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Configure custom alerts for critical system events
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}