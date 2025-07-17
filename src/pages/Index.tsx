import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { CiCdConfig } from "@/components/CiCdConfig";
import { MonitoringPanel } from "@/components/MonitoringPanel";
import { DeploymentGuide } from "@/components/DeploymentGuide";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "cicd":
        return <CiCdConfig />;
      case "monitoring":
        return <MonitoringPanel />;
      case "guide":
        return <DeploymentGuide />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="p-6 animate-fade-in">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
