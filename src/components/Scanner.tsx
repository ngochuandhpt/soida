import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ArrowLeft, Home, RefreshCw, X, Check } from 'lucide-react';

interface ScannerProps {
  onScanComplete: (imageUrl: string) => void;
  onCancel: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScanComplete, onCancel }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      setImage(null);
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      if (err.name === 'NotAllowedError') {
        setCameraError("Quyền truy cập camera bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.");
      } else if (err.name === 'NotFoundError') {
        setCameraError("Không tìm thấy camera trên thiết bị của bạn.");
      } else {
        setCameraError("Lỗi camera: " + (err.message || "Không thể khởi động camera."));
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    if (isCameraActive && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      
      const playVideo = async () => {
        try {
          await video.play();
        } catch (e) {
          if (isMounted) {
            console.error("Auto-play failed:", e);
            // Some browsers require a user gesture to play video, 
            // but since this is triggered by a click, it should be fine.
          }
        }
      };
      
      playVideo();
    }
    
    return () => {
      isMounted = false;
    };
  }, [isCameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas size to match video aspect ratio (square crop)
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        
        const startX = (video.videoWidth - size) / 2;
        const startY = (video.videoHeight - size) / 2;
        
        context.drawImage(video, startX, startY, size, size, 0, 0, size, size);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setImage(imageData);
        stopCamera();
      }
    }
  };

  const startScan = () => {
    if (!image) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanComplete(image);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="bg-black h-14 flex items-center justify-between px-4 text-white">
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium">Camera</h1>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Home className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {isCameraActive ? (
          <div className="absolute inset-0 flex flex-col">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="w-full h-full object-cover scale-x-[-1]" 
            />
            
            {/* Face Guide Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[80%] h-[65%] border-2 border-white/30 rounded-[100%] shadow-[0_0_0_1000px_rgba(0,0,0,0.4)]" />
              <div className="absolute top-12 text-center w-full">
                <p className="text-white/90 text-sm font-medium bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full inline-block">
                  Căn chỉnh khuôn mặt vào khung hình
                </p>
              </div>
            </div>

            {/* Shutter Area */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-black/80 backdrop-blur-md flex items-center justify-center px-10">
              <button 
                onClick={stopCamera}
                className="absolute left-10 text-white font-medium hover:text-emerald-400 transition-colors"
              >
                Hủy
              </button>
              
              <button 
                onClick={capturePhoto}
                className="w-20 h-20 rounded-full border-4 border-white p-1 flex items-center justify-center active:scale-90 transition-transform"
              >
                <div className="w-full h-full bg-white rounded-full" />
              </button>
            </div>
          </div>
        ) : image ? (
          <div className="absolute inset-0 flex flex-col bg-black">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
            
            <AnimatePresence>
              {isScanning && (
                <>
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-30">
                    <div className="bg-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 flex flex-col items-center gap-4">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                      <span className="font-bold text-white tracking-wide">ĐANG PHÂN TÍCH AI...</span>
                    </div>
                  </div>
                </>
              )}
            </AnimatePresence>

            {/* Preview Controls - iPhone Style */}
            {!isScanning && (
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-black/80 backdrop-blur-md flex items-center justify-between px-12">
                <button 
                  onClick={startCamera}
                  className="text-white text-lg font-medium hover:text-emerald-400 transition-colors"
                >
                  Chụp lại
                </button>
                
                <button 
                  onClick={startScan}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  Sử dụng ảnh
                  <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
              <Camera className="w-16 h-16 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Phân tích da AI</h3>
            <p className="text-slate-400 mb-10 max-w-xs">
              Vui lòng chụp ảnh khuôn mặt của bạn ở nơi có ánh sáng tốt để có kết quả chính xác nhất.
            </p>
            <button 
              onClick={startCamera}
              className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
            >
              Bắt đầu chụp ảnh
            </button>
            {cameraError && (
              <p className="mt-6 text-rose-400 text-sm bg-rose-400/10 px-4 py-2 rounded-xl border border-rose-400/20">
                {cameraError}
              </p>
            )}
          </div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
