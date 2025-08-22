import React, { useState } from 'react';
import { X, Download, Copy, Share2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QRCode from 'react-qr-code';
import { useLanguage } from '@/contexts/LanguageContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  routeUrl: string;
  routeTitle: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, routeUrl, routeTitle }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(routeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.querySelector('#qr-code svg') as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `route-qr-${routeTitle.replace(/\s+/g, '-').toLowerCase()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Route: ${routeTitle}`,
          text: `Check out this route: ${routeTitle}`,
          url: routeUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-rural-green" />
            Share Route via QR Code
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Route Info */}
          <div className="text-center">
            <h3 className="font-semibold text-lg text-foreground mb-2">{routeTitle}</h3>
            <p className="text-sm text-muted-foreground">Scan this QR code to view the route</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div 
              id="qr-code"
              className="p-4 bg-white rounded-lg shadow-md"
            >
              <QRCode
                value={routeUrl}
                size={200}
                level="M"
                fgColor="#2E7D32"
                bgColor="#FFFFFF"
              />
            </div>
          </div>

          {/* URL Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Route URL:</label>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <input
                type="text"
                value={routeUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-muted-foreground outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="text-rural-green hover:text-rural-green hover:bg-rural-green/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-rural-green">Link copied to clipboard!</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadQR}
              className="flex-1 bg-rural-green hover:bg-rural-green/90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-rural-sky text-rural-sky hover:bg-rural-sky hover:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              📱 Scan this QR code with your phone's camera or QR code app to open the route directly
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
