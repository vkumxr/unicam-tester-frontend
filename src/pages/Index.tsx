import { useConnectionSimulation } from "@/hooks/useConnectionSimulation";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ConnectionStatusBadge } from "@/components/camera/ConnectionStatusBadge";
import { CameraPreview } from "@/components/camera/CameraPreview";
import { LiveDataPanel } from "@/components/camera/LiveDataPanel";
import { TechnicalReport } from "@/components/camera/TechnicalReport";
import { CustomCameraForm } from "@/components/camera/CustomCameraForm";
import { SessionHistory } from "@/components/camera/SessionHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const { status, currentCamera, liveData, connect, disconnect, toggleConnection, refreshData } =
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
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Camera Analysis Lab</h1>
              <p className="text-xs text-muted-foreground">Innovation Lab Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CustomCameraForm onSave={handleCustomCamera} />
            <SessionHistory
              sessions={sessions}
              currentSessionId={currentSession?.id}
              onLoadSession={loadSession}
              onDeleteSession={deleteSession}
            />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel: Live Analysis */}
        <div className="flex flex-col gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ConnectionStatusBadge
                status={status}
                cameraName={profile?.identification.sensorName}
              />
              <div className="flex gap-2">
                <Button
                  onClick={isConnected ? disconnect : handleConnect}
                  variant={isConnected ? "destructive" : "default"}
                  className="flex-1 gap-2"
                  disabled={status === "connecting"}
                >
                  {isConnected ? (
                    <>
                      <PowerOff className="w-4 h-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <Power className="w-4 h-4" />
                      Simulate Connect
                    </>
                  )}
                </Button>
                <Button
                  onClick={refreshData}
                  variant="outline"
                  size="icon"
                  disabled={!isConnected}
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <CameraPreview
            isConnected={isConnected}
            cameraName={profile?.identification.sensorName}
          />

          <LiveDataPanel liveData={liveData} isConnected={isConnected} />

          {/* Actions */}
          <Card className="bg-card/50 border-border/50 mt-auto">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => profile && generatePDFReport(profile)}
                  variant="outline"
                  className="gap-2"
                  disabled={!profile}
                >
                  <FileText className="w-4 h-4" />
                  Export PDF
                </Button>
                <Button
                  onClick={() => profile && generatePPTReport(profile)}
                  variant="outline"
                  className="gap-2"
                  disabled={!profile}
                >
                  <Presentation className="w-4 h-4" />
                  Export PPT
                </Button>
                <Button
                  onClick={() => saveSession()}
                  variant="secondary"
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Session
                </Button>
                <Button
                  onClick={clearCurrentSession}
                  variant="ghost"
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Technical Report */}
        <div className="h-full">
          {profile ? (
            <TechnicalReport profile={profile} />
          ) : (
            <Card className="h-full flex items-center justify-center bg-card/50 border-border/50">
              <p className="text-muted-foreground">No camera profile loaded</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
