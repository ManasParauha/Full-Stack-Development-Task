'use client';

import Cropper from 'react-easy-crop';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { getCroppedImg } from '@/lib/cropImageUtils';

type Props = {
  file: File;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
};

const ImageCropper = ({ file, onCropComplete, onCancel }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleCrop = useCallback(async () => {
    if (!croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(URL.createObjectURL(file), croppedAreaPixels);
    if (croppedImage) {
      onCropComplete(croppedImage);
    }
  }, [croppedAreaPixels]);

  const onZoomChange = (v: number[]) => setZoom(v[0]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg space-y-4">
        <div className="relative w-full h-[300px] bg-gray-200 rounded">
          <Cropper
            image={URL.createObjectURL(file)}
            crop={crop}
            zoom={zoom}
            aspect={450 / 350}
            cropShape="rect"
            showGrid={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
            style={{
              containerStyle: {
                borderRadius: '8px',
              },
              cropAreaStyle: {
                border: '2px solid #fff',
                borderRadius: '4px',
              },
            }}
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
          <Button onClick={handleCrop}>Crop & Upload</Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
