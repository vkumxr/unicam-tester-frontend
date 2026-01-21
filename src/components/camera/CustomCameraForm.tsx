import { useState } from "react";
import { CameraProfile } from "@/types/camera";
import { EMPTY_CAMERA_TEMPLATE } from "@/data/mockCameraData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";

interface CustomCameraFormProps {
  onSave: (profile: CameraProfile) => void;
}

export function CustomCameraForm({ onSave }: CustomCameraFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    sensorName: "",
    manufacturer: "",
    sensorType: "CMOS Image Sensor",
    aperture: "",
    focalLength: "",
    fieldOfView: "",
    resolution: "",
    resolutionMegapixels: "",
    pixelSize: "",
    colorFilterArray: "Bayer RGB",
    shutterType: "Rolling Shutter",
    dataInterface: "",
    clockingMethod: "",
    powerRequirements: "",
    workingPrinciple: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProfile: CameraProfile = {
      id: `custom-${Date.now()}`,
      identification: {
        sensorName: formData.sensorName,
        manufacturer: formData.manufacturer,
        sensorType: formData.sensorType,
      },
      optical: {
        aperture: formData.aperture,
        focalLength: formData.focalLength,
        fieldOfView: formData.fieldOfView,
      },
      sensor: {
        resolution: formData.resolution,
        resolutionMegapixels: parseFloat(formData.resolutionMegapixels) || 0,
        pixelSize: formData.pixelSize,
        colorFilterArray: formData.colorFilterArray,
        shutterType: formData.shutterType,
      },
      interface: {
        dataInterface: formData.dataInterface,
        clockingMethod: formData.clockingMethod,
        powerRequirements: formData.powerRequirements,
      },
      workingPrinciple: formData.workingPrinciple,
      liveData: {
        sensorResolution: formData.resolution,
        frameRate: "—",
        dataInterface: formData.dataInterface,
        powerStatus: "off",
      },
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    onSave(newProfile);
    setOpen(false);
    // Reset form
    setFormData({
      sensorName: "",
      manufacturer: "",
      sensorType: "CMOS Image Sensor",
      aperture: "",
      focalLength: "",
      fieldOfView: "",
      resolution: "",
      resolutionMegapixels: "",
      pixelSize: "",
      colorFilterArray: "Bayer RGB",
      shutterType: "Rolling Shutter",
      dataInterface: "",
      clockingMethod: "",
      powerRequirements: "",
      workingPrinciple: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Custom Camera
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Custom Camera Module</DialogTitle>
          <DialogDescription>
            Enter camera specifications manually. All parameters will be marked as ⚠ Not verified.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              {/* Identification */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide border-b border-border pb-2">
                  Camera Identification
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sensorName">Sensor Name *</Label>
                    <Input
                      id="sensorName"
                      name="sensorName"
                      value={formData.sensorName}
                      onChange={handleInputChange}
                      placeholder="e.g., IMX219"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      name="manufacturer"
                      value={formData.manufacturer}
                      onChange={handleInputChange}
                      placeholder="e.g., Sony"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="sensorType">Sensor Type</Label>
                    <Input
                      id="sensorType"
                      name="sensorType"
                      value={formData.sensorType}
                      onChange={handleInputChange}
                      placeholder="e.g., CMOS Image Sensor"
                    />
                  </div>
                </div>
              </div>

              {/* Optical */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide border-b border-border pb-2">
                  Optical Parameters
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aperture">Aperture</Label>
                    <Input
                      id="aperture"
                      name="aperture"
                      value={formData.aperture}
                      onChange={handleInputChange}
                      placeholder="e.g., f/2.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="focalLength">Focal Length</Label>
                    <Input
                      id="focalLength"
                      name="focalLength"
                      value={formData.focalLength}
                      onChange={handleInputChange}
                      placeholder="e.g., 3.04mm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfView">Field of View</Label>
                    <Input
                      id="fieldOfView"
                      name="fieldOfView"
                      value={formData.fieldOfView}
                      onChange={handleInputChange}
                      placeholder="e.g., 62°"
                    />
                  </div>
                </div>
              </div>

              {/* Sensor Specs */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide border-b border-border pb-2">
                  Sensor Specifications
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Resolution</Label>
                    <Input
                      id="resolution"
                      name="resolution"
                      value={formData.resolution}
                      onChange={handleInputChange}
                      placeholder="e.g., 3280 × 2464"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resolutionMegapixels">Megapixels</Label>
                    <Input
                      id="resolutionMegapixels"
                      name="resolutionMegapixels"
                      type="number"
                      step="0.1"
                      value={formData.resolutionMegapixels}
                      onChange={handleInputChange}
                      placeholder="e.g., 8.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pixelSize">Pixel Size</Label>
                    <Input
                      id="pixelSize"
                      name="pixelSize"
                      value={formData.pixelSize}
                      onChange={handleInputChange}
                      placeholder="e.g., 1.12μm × 1.12μm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shutterType">Shutter Type</Label>
                    <Input
                      id="shutterType"
                      name="shutterType"
                      value={formData.shutterType}
                      onChange={handleInputChange}
                      placeholder="e.g., Rolling Shutter"
                    />
                  </div>
                </div>
              </div>

              {/* Interface */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide border-b border-border pb-2">
                  Interface & Power
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInterface">Data Interface</Label>
                    <Input
                      id="dataInterface"
                      name="dataInterface"
                      value={formData.dataInterface}
                      onChange={handleInputChange}
                      placeholder="e.g., MIPI CSI-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clockingMethod">Clocking Method</Label>
                    <Input
                      id="clockingMethod"
                      name="clockingMethod"
                      value={formData.clockingMethod}
                      onChange={handleInputChange}
                      placeholder="e.g., 6-27MHz XVCLK"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="powerRequirements">Power Requirements</Label>
                    <Input
                      id="powerRequirements"
                      name="powerRequirements"
                      value={formData.powerRequirements}
                      onChange={handleInputChange}
                      placeholder="e.g., 2.8V AVDD, 1.8V DVDD"
                    />
                  </div>
                </div>
              </div>

              {/* Working Principle */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide border-b border-border pb-2">
                  Working Principle
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="workingPrinciple">Technical Description</Label>
                  <Textarea
                    id="workingPrinciple"
                    name="workingPrinciple"
                    value={formData.workingPrinciple}
                    onChange={handleInputChange}
                    placeholder="Describe how the sensor works..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Camera</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
