import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  GitBranch, 
  Monitor, 
  Shield, 
  Cloud, 
  Database,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Server,
  Globe,
  Settings
} from "lucide-react";

const deploymentSteps = [
  { name: "Frontend Build", status: "complete", progress: 100 },
  { name: "Backend Deploy", status: "complete", progress: 100 },
  { name: "Database Setup", status: "complete", progress: 100 },
  { name: "CI/CD Pipeline", status: "active", progress: 75 },
  { name: "Monitoring Setup", status: "pending", progress: 0 }
];

const environments = [
  { name: "Production", url: "https://myapp.com", status: "healthy", uptime: "99.9%" },
  { name: "Staging", url: "https://staging.myapp.com", status: "healthy", uptime: "99.8%" },
  { name: "Development", url: "https://dev.myapp.com", status: "warning", uptime: "98.5%" }
];

const metrics = [
  { name: "Response Time", value: "245ms", trend: "down", color: "success" },
  { name: "CPU Usage", value: "32%", trend: "stable", color: "info" },
  { name: "Memory Usage", value: "67%", trend: "up", color: "warning" },
  { name: "Error Rate", value: "0.2%", trend: "down", color: "success" }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            DevOps Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your MERN stack deployment pipeline
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Rocket className="mr-2 h-4 w-4" />
          Deploy Now
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.name} className="bg-gradient-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <TrendingUp 
                  className={`h-6 w-6 ${
                    metric.color === 'success' ? 'text-success' :
                    metric.color === 'warning' ? 'text-warning' :
                    'text-info'
                  }`} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deployment Pipeline */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Deployment Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deploymentSteps.map((step, index) => (
            <div key={step.name} className="flex items-center gap-4">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {step.status === 'complete' && (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                )}
                {step.status === 'active' && (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
                {step.status === 'pending' && (
                  <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                )}
                <span className="font-medium">{step.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Progress value={step.progress} className="w-24" />
                <span className="text-sm text-muted-foreground min-w-fit">
                  {step.progress}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Environments */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Environment Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {environments.map((env) => (
              <div key={env.name} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${
                    env.status === 'healthy' ? 'bg-success animate-glow' :
                    env.status === 'warning' ? 'bg-warning' :
                    'bg-destructive'
                  }`} />
                  <div>
                    <p className="font-medium">{env.name}</p>
                    <p className="text-sm text-muted-foreground">{env.url}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={env.status === 'healthy' ? 'default' : 'secondary'}>
                    {env.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">
                    {env.uptime} uptime
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Monitor className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Monitoring Setup</h3>
            <p className="text-sm text-muted-foreground">
              Configure application and infrastructure monitoring
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Security Config</h3>
            <p className="text-sm text-muted-foreground">
              Set up SSL, security headers, and authentication
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Database Backup</h3>
            <p className="text-sm text-muted-foreground">
              Schedule automated backups and recovery plans
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}