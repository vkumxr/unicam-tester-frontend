import { AnalysisSession } from "@/types/camera";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { History, Trash2, Clock } from "lucide-react";
import { useState } from "react";

interface SessionHistoryProps {
  sessions: AnalysisSession[];
  currentSessionId?: string;
  onLoadSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function SessionHistory({
  sessions,
  currentSessionId,
  onLoadSession,
  onDeleteSession,
}: SessionHistoryProps) {
  const [open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="w-4 h-4" />
          History
          {sessions.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded-full">
              {sessions.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Session History</DialogTitle>
          <DialogDescription>
            Load or delete previous analysis sessions.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm">No saved sessions</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                    session.id === currentSessionId ? "border-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex-1"
                        onClick={() => {
                          onLoadSession(session.id);
                          setOpen(false);
                        }}
                      >
                        <h4 className="text-sm font-medium text-foreground">
                          {session.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Camera: {session.cameraProfile.identification.sensorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(session.updatedAt)}
                        </p>
                        {session.id === currentSessionId && (
                          <span className="inline-block mt-2 text-xs text-primary">
                            Current session
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSession(session.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
