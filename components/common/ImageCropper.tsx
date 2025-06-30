'use client';

import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from '@/lib/cropImageUtils';
import Image from 'next/image';

type Props = {
  file: File;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
};

const ImageCropper = ({ file, onCropComplete, onCancel }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropDone = useCallback(async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(URL.createObjectURL(file), croppedAreaPixels);
    if (croppedImage) {
      onCropComplete(croppedImage);
    }
  }, [croppedAreaPixels]);

  const onCropChange = (crop: any) => setCrop(crop);
  const onZoomChange = (z: number[]) => setZoom(z[0]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg space-y-4">
        <div className="relative w-full h-[300px] bg-gray-100 rounded overflow-hidden">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            aspect={450 / 350}
            onCropChange={onCropChange}
            onZoomChange={(v) => setZoom(v)}
            onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
          />
        </div>

        <Slider
          min={1}
          max={3}
          step={0.1}
          value={[zoom]}
          onValueChange={onZoomChange}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={onCropDone}>Crop & Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
