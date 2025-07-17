import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GitBranch, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  Download,
  Settings
} from "lucide-react";

const workflows = [
  {
    name: "Frontend Deploy",
    file: ".github/workflows/frontend.yml",
    status: "success",
    lastRun: "2 minutes ago",
    duration: "3m 24s",
    branch: "main"
  },
  {
    name: "Backend Tests",
    file: ".github/workflows/backend-test.yml", 
    status: "running",
    lastRun: "Running now",
    duration: "1m 45s",
    branch: "develop"
  },
  {
    name: "Database Migration",
    file: ".github/workflows/db-migrate.yml",
    status: "failed",
    lastRun: "1 hour ago",
    duration: "45s",
    branch: "main"
  }
];

const frontendWorkflow = `name: Frontend Deployment

on:
  push:
    branches: [ main ]
    paths: [ 'frontend/**' ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      env:
        VITE_API_URL: \${{ secrets.VITE_API_URL }}
        
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.ORG_ID }}
        vercel-project-id: \${{ secrets.PROJECT_ID }}`;

const backendWorkflow = `name: Backend Deployment

on:
  push:
    branches: [ main ]
    paths: [ 'backend/**' ]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
          
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      working-directory: ./backend
      
    - name: Run tests
      run: npm test
      working-directory: ./backend
      env:
        MONGODB_URI: mongodb://localhost:27017/test
        
    - name: Deploy to Render
      run: |
        curl -X POST \\
          -H "Authorization: Bearer \${{ secrets.RENDER_API_KEY }}" \\
          -H "Content-Type: application/json" \\
          https://api.render.com/v1/services/\${{ secrets.SERVICE_ID }}/deploys`;

export function CiCdConfig() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CI/CD Pipeline</h2>
          <p className="text-muted-foreground">
            Continuous Integration and Deployment workflows
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Configure
        </Button>
      </div>

      {/* Workflow Status */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Active Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.name} className="flex items-center justify-between p-4 rounded-lg bg-secondary/20">
                <div className="flex items-center gap-3">
                  {workflow.status === 'success' && (
                    <CheckCircle className="h-5 w-5 text-success" />
                  )}
                  {workflow.status === 'running' && (
                    <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                  {workflow.status === 'failed' && (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">{workflow.name}</p>
                    <p className="text-sm text-muted-foreground">{workflow.file}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={
                      workflow.status === 'success' ? 'default' :
                      workflow.status === 'running' ? 'secondary' :
                      'destructive'
                    }>
                      {workflow.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground mt-1">
                      <span>{workflow.lastRun}</span> • <span>{workflow.duration}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Templates */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Workflow Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="frontend">Frontend Deploy</TabsTrigger>
              <TabsTrigger value="backend">Backend Deploy</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Frontend Deployment Workflow</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{frontendWorkflow}</code>
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="backend" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Backend Deployment Workflow</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <div className="bg-secondary/20 rounded-lg p-4">
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{backendWorkflow}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary/20">
              <h4 className="font-semibold mb-2">Development</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NODE_ENV</span>
                  <span className="text-muted-foreground">development</span>
                </div>
                <div className="flex justify-between">
                  <span>API_URL</span>
                  <span className="text-muted-foreground">http://localhost:5000</span>
                </div>
                <div className="flex justify-between">
                  <span>DB_URI</span>
                  <span className="text-muted-foreground">mongodb://localhost:27017</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/20">
              <h4 className="font-semibold mb-2">Staging</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NODE_ENV</span>
                  <span className="text-muted-foreground">staging</span>
                </div>
                <div className="flex justify-between">
                  <span>API_URL</span>
                  <span className="text-muted-foreground">https://api-staging.app.com</span>
                </div>
                <div className="flex justify-between">
                  <span>DB_URI</span>
                  <span className="text-muted-foreground">mongodb+srv://staging...</span>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/20">
              <h4 className="font-semibold mb-2">Production</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>NODE_ENV</span>
                  <span className="text-muted-foreground">production</span>
                </div>
                <div className="flex justify-between">
                  <span>API_URL</span>
                  <span className="text-muted-foreground">https://api.myapp.com</span>
                </div>
                <div className="flex justify-between">
                  <span>DB_URI</span>
                  <span className="text-muted-foreground">mongodb+srv://prod...</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}