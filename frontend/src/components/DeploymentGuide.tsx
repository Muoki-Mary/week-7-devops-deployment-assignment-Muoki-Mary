import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen,
  Code,
  Server,
  Database,
  Cloud,
  Shield,
  CheckCircle,
  ExternalLink,
  Copy,
  Download
} from "lucide-react";

const platforms = [
  { name: "Vercel", type: "Frontend", logo: "⚡", status: "Recommended" },
  { name: "Netlify", type: "Frontend", logo: "🌍", status: "Popular" },
  { name: "Render", type: "Backend", logo: "🚀", status: "Recommended" },
  { name: "Railway", type: "Backend", logo: "🚂", status: "Modern" },
  { name: "MongoDB Atlas", type: "Database", logo: "🍃", status: "Cloud" }
];

const frontendSteps = [
  "Install dependencies and build the project",
  "Configure environment variables",
  "Connect GitHub repository", 
  "Set up automatic deployments",
  "Configure custom domain (optional)"
];

const backendSteps = [
  "Prepare Express.js app for production",
  "Set up MongoDB Atlas cluster",
  "Configure environment variables",
  "Deploy to cloud platform",
  "Set up monitoring and logging"
];

const envTemplate = `# Frontend Environment Variables (.env)
VITE_API_URL=https://your-api.com
VITE_APP_NAME=My MERN App
VITE_VERSION=1.0.0

# Backend Environment Variables
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://your-frontend.com

# Optional Services
SENDGRID_API_KEY=your-sendgrid-key
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
STRIPE_SECRET_KEY=sk_live_...`;

const dockerFile = `FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]`;

export function DeploymentGuide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Deployment Guide</h2>
          <p className="text-muted-foreground">
            Step-by-step instructions for deploying your MERN stack application
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Guide
        </Button>
      </div>

      {/* Platform Overview */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            Deployment Platforms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              <Card key={platform.name} className="bg-secondary/20 border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{platform.logo}</span>
                      <h3 className="font-semibold">{platform.name}</h3>
                    </div>
                    <Badge variant="secondary">{platform.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{platform.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Deployment Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
            
            <TabsContent value="frontend" className="space-y-4">
              <h3 className="text-lg font-semibold">Deploy React Frontend to Vercel</h3>
              <div className="space-y-3">
                {frontendSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="backend" className="space-y-4">
              <h3 className="text-lg font-semibold">Deploy Express Backend to Render</h3>
              <div className="space-y-3">
                {backendSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Configuration Examples */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Configuration Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="env-vars">
              <AccordionTrigger>Environment Variables Template</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Copy this template and update with your values
                    </p>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <pre className="text-sm text-muted-foreground overflow-x-auto">
                      <code>{envTemplate}</code>
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="dockerfile">
              <AccordionTrigger>Dockerfile for Backend</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Docker configuration for containerized deployment
                    </p>
                    <Button variant="outline" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <pre className="text-sm text-muted-foreground overflow-x-auto">
                      <code>{dockerFile}</code>
                    </pre>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="package-scripts">
              <AccordionTrigger>Package.json Scripts</AccordionTrigger>
              <AccordionContent>
                <div className="bg-secondary/20 rounded-lg p-4">
                  <pre className="text-sm text-muted-foreground overflow-x-auto">
                    <code>{`{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "node server/index.js",
    "server": "nodemon server/index.js",
    "client": "npm run dev",
    "both": "concurrently \\"npm run server\\" \\"npm run client\\""
  }
}`}</code>
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Security Checklist */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Backend Security</h4>
              {[
                "Enable CORS with specific origins",
                "Use HTTPS in production",
                "Implement rate limiting",
                "Validate all user inputs",
                "Use secure JWT secrets"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend Security</h4>
              {[
                "Configure CSP headers",
                "Use environment variables",
                "Enable HTTPS redirects",
                "Implement proper error handling",
                "Sanitize user-generated content"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Useful Links */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Useful Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Vercel Documentation", url: "https://vercel.com/docs" },
              { name: "Render Deployment Guide", url: "https://render.com/docs" },
              { name: "MongoDB Atlas Setup", url: "https://docs.atlas.mongodb.com" },
              { name: "GitHub Actions", url: "https://docs.github.com/actions" }
            ].map((link) => (
              <Button key={link.name} variant="outline" className="justify-between">
                {link.name}
                <ExternalLink className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}