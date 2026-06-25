/**
 * Laksaara TMQ — Virtual Business Card generator
 * Design Philosophy: Luxury Heritage Minimalism (dark theme)
 * - Deep wood-brown gradient background with gold accents
 * - Logo embedded in a gold tone, company name, email, and WhatsApp numbers with icons
 * Draws a high-resolution card on a canvas and triggers a PNG download.
 */
import { useCallback, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

const LOGO_SRC = '/images/laksaara_logo.png';
const COMPANY = 'LAKSAARA TMQ';
const TAGLINE = 'We do not just sell wood, we share good roots';
const EMAIL = 'laksaraatmq@gmail.com';
const WHATSAPP = ['+62 813 8547 6694', '+62 819 615 115', '+62 811 1185 1581'];

// Brand colors
const GOLD = '#C9A84C';
const GOLD_LIGHT = '#E6C868';
const CREAM = '#F5EFE6';
const WHATSAPP_GREEN = '#25D366';

/** Load an image and return it once ready. */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Tint an image to a solid gold tone using an offscreen canvas. */
function tintImageGold(img: HTMLImageElement): HTMLCanvasElement {
  const off = document.createElement('canvas');
  off.width = img.naturalWidth || 512;
  off.height = img.naturalHeight || 512;
  const ictx = off.getContext('2d')!;
  // Draw original (keeps transparency / alpha shape)
  ictx.drawImage(img, 0, 0, off.width, off.height);
  // Apply gold tint only where the logo pixels are (source-in keeps alpha)
  ictx.globalCompositeOperation = 'source-in';
  const grad = ictx.createLinearGradient(0, 0, off.width, off.height);
  grad.addColorStop(0, GOLD_LIGHT);
  grad.addColorStop(1, GOLD);
  ictx.fillStyle = grad;
  ictx.fillRect(0, 0, off.width, off.height);
  ictx.globalCompositeOperation = 'source-over';
  return off;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function buildCardCanvas(): Promise<HTMLCanvasElement> {
  // High-resolution standard business card ratio (3.5 x 2 in) scaled up
  const scale = 3;
  const W = 1050 * scale; // width
  const H = 600 * scale; // height
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Background: deep wood-brown gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1A0F07');
  bg.addColorStop(0.5, '#241409');
  bg.addColorStop(1, '#120A04');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Soft gold radial glow (top-right)
  const glow = ctx.createRadialGradient(W * 0.82, H * 0.2, 0, W * 0.82, H * 0.2, W * 0.5);
  glow.addColorStop(0, 'rgba(201,168,76,0.20)');
  glow.addColorStop(1, 'rgba(201,168,76,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Subtle gold border frame
  ctx.strokeStyle = 'rgba(201,168,76,0.45)';
  ctx.lineWidth = 2 * scale;
  roundRect(ctx, 18 * scale, 18 * scale, W - 36 * scale, H - 36 * scale, 18 * scale);
  ctx.stroke();

  // Vertical gold divider between logo area and details
  const dividerX = W * 0.42;
  const dGrad = ctx.createLinearGradient(0, H * 0.18, 0, H * 0.82);
  dGrad.addColorStop(0, 'rgba(201,168,76,0)');
  dGrad.addColorStop(0.5, 'rgba(201,168,76,0.55)');
  dGrad.addColorStop(1, 'rgba(201,168,76,0)');
  ctx.fillStyle = dGrad;
  ctx.fillRect(dividerX, H * 0.18, 1.5 * scale, H * 0.64);

  // Logo (gold-tinted) on the left panel
  try {
    const logo = await loadImage(LOGO_SRC);
    const tinted = tintImageGold(logo);
    const maxLogoW = W * 0.28;
    const ratio = tinted.height / tinted.width;
    const logoW = maxLogoW;
    const logoH = logoW * ratio;
    const logoX = W * 0.21 - logoW / 2;
    const logoY = H * 0.5 - logoH / 2 - 10 * scale;
    ctx.save();
    ctx.shadowColor = 'rgba(201,168,76,0.4)';
    ctx.shadowBlur = 30 * scale;
    ctx.drawImage(tinted, logoX, logoY, logoW, logoH);
    ctx.restore();
  } catch (err) {
    console.error('Logo load error:', err);
    // If logo fails, draw a gold monogram fallback
    ctx.fillStyle = GOLD;
    ctx.font = `bold ${90 * scale}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.fillText('L', W * 0.21, H * 0.55);
  }

  // Right panel text
  const tx = dividerX + 50 * scale;
  let ty = H * 0.27;

  // Company name
  ctx.textAlign = 'left';
  ctx.fillStyle = CREAM;
  ctx.font = `bold ${52 * scale}px Georgia, 'Playfair Display', serif`;
  ctx.fillText(COMPANY, tx, ty);

  // Tagline
  ty += 42 * scale;
  ctx.fillStyle = GOLD;
  ctx.font = `italic ${20 * scale}px Georgia, serif`;
  ctx.fillText(TAGLINE, tx, ty);

  // Premium label
  ty += 30 * scale;
  ctx.fillStyle = 'rgba(245,239,230,0.55)';
  ctx.font = `${15 * scale}px Arial, sans-serif`;
  ctx.fillText('PREMIUM WOOD FURNITURE EXPORT', tx, ty);

  // Email
  ty += 56 * scale;
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `bold ${15 * scale}px Arial, sans-serif`;
  ctx.fillText('EMAIL', tx, ty);
  ty += 30 * scale;
  ctx.fillStyle = CREAM;
  ctx.font = `${22 * scale}px Arial, sans-serif`;
  ctx.fillText(EMAIL, tx, ty);

  // WhatsApp numbers with icons
  ty += 50 * scale;
  ctx.fillStyle = GOLD_LIGHT;
  ctx.font = `bold ${15 * scale}px Arial, sans-serif`;
  ctx.fillText('WHATSAPP', tx, ty);
  ty += 30 * scale;
  ctx.fillStyle = CREAM;
  ctx.font = `${20 * scale}px Arial, sans-serif`;
  for (const num of WHATSAPP) {
    // Draw WhatsApp icon (green circle with W)
    const iconX = tx - 35 * scale;
    const iconY = ty - 15 * scale;
    const iconR = 12 * scale;
    ctx.fillStyle = WHATSAPP_GREEN;
    ctx.beginPath();
    ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = CREAM;
    ctx.font = `bold ${16 * scale}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('W', iconX, iconY + 6 * scale);
    ctx.textAlign = 'left';
    // Draw number
    ctx.fillStyle = CREAM;
    ctx.font = `${20 * scale}px Arial, sans-serif`;
    ctx.fillText(num, tx, ty);
    ty += 30 * scale;
  }

  return canvas;
}

/** Build a vCard (.vcf) string for direct contact import. */
function buildVCard(): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:;Laksaara TMQ;;;',
    'FN:Laksaara TMQ',
    'ORG:Laksaara TMQ — Premium Wood Furniture Export',
    'TITLE:Premium Wood Furniture Export',
    `EMAIL;TYPE=WORK,INTERNET:${EMAIL}`,
    'TEL;TYPE=CELL,VOICE:+62813854766',
    'TEL;TYPE=CELL,VOICE:+62819615115',
    'TEL;TYPE=CELL,VOICE:+6281111851581',
    'NOTE:We do not just sell wood, we share good roots.',
    'END:VCARD',
  ];
  return lines.join('\r\n');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function BusinessCard() {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Generate and download the visual card (PNG)
      const canvas = await buildCardCanvas();
      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) downloadBlob(blob, 'Laksaara-TMQ-Business-Card.png');
          resolve();
        }, 'image/png');
      });

      // 2. Also download a vCard for contact import
      const vcardBlob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' });
      downloadBlob(vcardBlob, 'Laksaara-TMQ.vcf');
    } catch (e) {
      console.error('Failed to generate business card', e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="group inline-flex items-center justify-center gap-3 bg-transparent border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown dark:hover:text-brand-brown py-3 px-8 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Download className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
      )}
      {loading ? 'Preparing card…' : 'Download Business Card'}
    </button>
  );
}
