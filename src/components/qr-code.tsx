import QRCode from 'qrcode';
// Import the segment type
import { ErrorCorrectionLevel } from 'qrcode';
import { QRCodeSegment } from 'qrcode';

import React, { useEffect, useRef, useState } from 'react';

// Import the correct type for error correction

type QRCodeStyle = 'classic' | 'rounded' | 'thin' | 'smooth' | 'circles';

interface QRCodeData {
  modules: {
    size: number;
    data: boolean[]; // Use boolean[] here
  };
  version: number;
  maskPattern: number;
  errorCorrectionLevel: ErrorCorrectionLevel; // Use the imported enum
  segments: QRCodeSegment[]; // include the segments data
}

const generateQRCodeData = async (
  text: string,
  options: QRCode.QRCodeOptions = {}
): Promise<QRCodeData | null> => {
  try {
    const qrCode = await QRCode.create(text, {
      errorCorrectionLevel: 'H',
      ...options,
    });

    const qrCodeData: QRCodeData = {
      modules: {
        size: qrCode.modules.size,
        data: qrCode.modules.data,
      },
      version: qrCode.version,
      maskPattern: qrCode.maskPattern,
      errorCorrectionLevel: qrCode.errorCorrectionLevel, // Assign directly
      segments: qrCode.segments,
    };

    return qrCodeData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawSmoothBlob(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  const radius = (size / 2) * 1.2;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, radius, 0, 2 * Math.PI);
  ctx.fill();
}

const drawStyledQRCode = (
  canvas: HTMLCanvasElement,
  qrCodeData: QRCodeData,
  style: QRCodeStyle = 'classic',
  fgColor: string = '#000',
  bgColor: string = '#fff'
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = qrCodeData.modules.size;
  const pixelSize = canvas.width / size;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Iterate through the data array and draw the modules.
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (qrCodeData.modules.data[y * size + x]) {
        ctx.fillStyle = fgColor;
        const pixelX = x * pixelSize;
        const pixelY = y * pixelSize;

        switch (style) {
          case 'rounded':
            drawRoundedRect(
              ctx,
              pixelX,
              pixelY,
              pixelSize,
              pixelSize,
              pixelSize / 3
            );
            break;
          case 'thin':
            ctx.fillRect(
              pixelX + pixelSize / 4,
              pixelY + pixelSize / 4,
              pixelSize / 2,
              pixelSize / 2
            );
            break;
          case 'smooth':
            drawSmoothBlob(ctx, pixelX, pixelY, pixelSize);
            break;
          case 'circles':
            drawCircle(
              ctx,
              pixelX + pixelSize / 2,
              pixelY + pixelSize / 2,
              pixelSize / 2
            );
            break;
          default: // 'classic'
            ctx.fillRect(pixelX, pixelY, pixelSize, pixelSize);
        }
      }
    }
  }
};

interface StyledQRCodeProps {
  value: string;
  style: QRCodeStyle;
  fgColor?: string;
  bgColor?: string;
}

const StyledQRCode: React.FC<StyledQRCodeProps> = ({
  value,
  style,
  fgColor = '#000',
  bgColor = '#fff',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);

  useEffect(() => {
    const generateData = async () => {
      const data = await generateQRCodeData(value);
      setQrCodeData(data);
    };
    generateData();
  }, [value]);

  useEffect(() => {
    if (canvasRef.current && qrCodeData) {
      drawStyledQRCode(canvasRef.current, qrCodeData, style, fgColor, bgColor);
    }
  }, [qrCodeData, style, fgColor, bgColor]);

  return <canvas ref={canvasRef} width={256} height={256} />;
};

export default StyledQRCode;
