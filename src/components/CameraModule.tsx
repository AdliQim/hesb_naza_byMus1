
import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface CameraModuleProps {
  title: string;
}

const CameraModule: React.FC<CameraModuleProps> = ({ title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const setupCamera = async () => {
      if (cameraActive) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          
          setError(null);
        } catch (err) {
          console.error('Error accessing camera:', err);
          setError('Could not access camera. Please check permissions.');
          setCameraActive(false);
        }
      } else if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera size={18} />
          <h2 className="font-medium">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {cameraActive && <StatusBadge status="active" />}
        </div>
      </div>
      
      <div className="aspect-video relative bg-muted">
        {cameraActive ? (
          <video 
            ref={videoRef} 
            className="w-full h-full object-cover" 
            autoPlay 
            playsInline
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <CameraOff size={48} className="mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Camera is currently disabled</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center">
            <div className="bg-card p-4 rounded-lg max-w-xs">
              <p className="text-destructive font-medium mb-2">Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex justify-end">
        <button 
          className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${
            cameraActive 
              ? 'bg-destructive text-destructive-foreground' 
              : 'bg-palm-green text-white'
          }`}
          onClick={() => setCameraActive(!cameraActive)}
        >
          {cameraActive ? <CameraOff size={14} /> : <Camera size={14} />}
          <span>{cameraActive ? 'Disable Camera' : 'Enable Camera'}</span>
        </button>
      </div>
    </div>
  );
};

export default CameraModule;
