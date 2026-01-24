import { useConnectionSimulation } from "@/hooks/useConnectionSimulation";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ConnectionStatusBadge } from "@/components/camera/ConnectionStatusBadge";
import { CameraPreview } from "@/components/camera/CameraPreview";
import { LiveDataPanel } from "@/components/camera/LiveDataPanel";
import { TechnicalReport } from "@/components/camera/TechnicalReport";
import { CustomCameraForm } from "@/components/camera/CustomCameraForm";
import { SessionHistory } from "@/components/camera/SessionHistory";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generatePDFReport } from "@/utils/pdfExport";
import { generatePPTReport } from "@/utils/pptExport";
import { CameraProfile } from "@/types/camera";
import {
  Power,
  PowerOff,
  RefreshCw,
  FileText,
  Presentation,
  Save,
  RotateCcw,
  Camera,
} from "lucide-react";

const Index = () => {
  const { status, currentCamera, liveData, connect, disconnect, refreshData } =
    useConnectionSimulation();

  const {
    sessions,
    currentSession,
    saveSession,
    loadSession,
    deleteSession,
    clearCurrentSession,
    updateCameraProfile,
  } = useSessionStorage();

  const isConnected = status === "connected";
  const profile = currentSession?.cameraProfile;

  const handleCustomCamera = (newProfile: CameraProfile) => {
    updateCameraProfile(newProfile);
    if (isConnected) {
      disconnect();
    }
  };

  const handleConnect = () => {
    if (profile) {
      connect(profile);
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Compact Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Unicam Tester</span>
          <Separator orientation="vertical" className="h-4 mx-2" />
          <ConnectionStatusBadge
            status={status}
            cameraName={profile?.identification.sensorName}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <CustomCameraForm onSave={handleCustomCamera} />
          <SessionHistory
            sessions={sessions}
            currentSessionId={currentSession?.id}
            onLoadSession={loadSession}
            onDeleteSession={deleteSession}
          />
        </div>
      </header>

      {/* Main Dashboard - Camera feed focused */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-100px)]">
        {/* Left Panel: Camera Feed (Primary Focus) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Camera Preview - Large and prominent */}
          <div className="flex-1 min-h-0">
            <CameraPreview
              isConnected={isConnected}
              cameraName={profile?.identification.sensorName}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-3">
            {/* Primary Action */}
            <div className="flex items-center gap-2">
              <Button
                onClick={isConnected ? disconnect : handleConnect}
                variant={isConnected ? "destructive" : "default"}
                size="sm"
                className="gap-1.5"
                disabled={status === "connecting"}
              >
                {isConnected ? (
                  <>
                    <PowerOff className="w-3.5 h-3.5" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Power className="w-3.5 h-3.5" />
                    Connect
                  </>
                )}
              </Button>
              {isConnected && (
                <Button
                  onClick={refreshData}
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </Button>
              )}
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-1.5">
              <Button
                onClick={() => profile && generatePDFReport(profile)}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
                disabled={!profile}
              >
                <FileText className="w-3.5 h-3.5" />
                PDF
              </Button>
              <Button
                onClick={() => profile && generatePPTReport(profile)}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
                disabled={!profile}
              >
                <Presentation className="w-3.5 h-3.5" />
                PPT
              </Button>
              <Separator orientation="vertical" className="h-4 mx-1" />
              <Button
                onClick={() => saveSession()}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </Button>
              <Button
                onClick={clearCurrentSession}
                variant="ghost"
                size="sm"
                className="gap-1.5 text-destructive/70 hover:text-destructive"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </Button>
            </div>
          </div>

          {/* Live Data - Compact */}
          <LiveDataPanel liveData={liveData} isConnected={isConnected} />
        </div>

        {/* Right Panel: Technical Report */}
        <div className="h-full overflow-hidden bg-card/30 rounded p-4">
          {profile ? (
            <TechnicalReport profile={profile} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Camera className="w-8 h-8 opacity-30" />
              <span className="text-xs">No camera profile</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
