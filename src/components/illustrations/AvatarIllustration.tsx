import React from 'react';

interface AvatarProps {
  seed: string;
  className?: string;
}

export const AvatarIllustration: React.FC<AvatarProps> = ({ seed, className = 'w-20 h-20' }) => {
  // Select color & hairstyle variations based on seed
  const getStyle = (s: string) => {
    switch (s.toLowerCase()) {
      case 'sumadh':
        return { shirt: '#EA580C', skin: '#FED7AA', hair: 'short-curl', glasses: false, tie: false, collar: true };
      case 'gautam':
        return { shirt: '#0D9488', skin: '#FDBA74', hair: 'parted', glasses: true, tie: false, collar: true };
      case 'satvik':
        return { shirt: '#2563EB', skin: '#FED7AA', hair: 'slick', glasses: false, tie: false, collar: true };
      case 'vikram':
        return { shirt: '#7C3AED', skin: '#FDBA74', hair: 'short-spike', glasses: true, tie: false, collar: true };
      case 'akshay':
        return { shirt: '#E11D48', skin: '#FED7AA', hair: 'modern', glasses: false, tie: false, collar: true };
      case 'prathviraj':
        return { shirt: '#1E1B4B', skin: '#FDBA74', hair: 'wavy', glasses: false, tie: true, collar: true };
      case 'ramachandra':
        return { shirt: '#059669', skin: '#FED7AA', hair: 'receding', glasses: true, tie: true, collar: true };
      case 'nivedita':
        return { shirt: '#F59E0B', skin: '#FED7AA', hair: 'long-female', glasses: false, tie: false, collar: false };
      default:
        return { shirt: '#6366F1', skin: '#FED7AA', hair: 'modern', glasses: false, tie: false, collar: true };
    }
  };

  const style = getStyle(seed);

  return (
    <div className={`relative rounded-full overflow-hidden sketch-border bg-paper-light ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Background ring */}
        <circle cx="50" cy="50" r="48" fill="#FFF9EE" />

        {/* Shoulders & Shirt */}
        <path
          d="M 12 95 C 12 70 30 62 50 62 C 70 62 88 70 88 95 Z"
          fill={style.shirt}
          stroke="#1E1B4B"
          strokeWidth="2.5"
        />

        {/* Collar / Tie */}
        {style.collar && (
          <polygon points="50,62 42,75 58,75" fill="#FFFFFF" stroke="#1E1B4B" strokeWidth="1.5" />
        )}
        {style.tie && (
          <polygon points="50,75 46,92 54,92" fill="#E11D48" stroke="#1E1B4B" strokeWidth="1.5" />
        )}

        {/* Neck */}
        <rect x="42" y="50" width="16" height="15" fill={style.skin} stroke="#1E1B4B" strokeWidth="2" />

        {/* Head */}
        <ellipse cx="50" cy="40" rx="18" ry="20" fill={style.skin} stroke="#1E1B4B" strokeWidth="2" />

        {/* Hair Variations */}
        {style.hair === 'long-female' ? (
          <path
            d="M 30 40 C 26 20 74 20 70 40 C 76 55 75 75 70 80 C 65 65 65 45 62 38 C 55 34 45 34 38 38 C 35 45 35 65 30 80 C 25 75 24 55 30 40 Z"
            fill="#1E1B4B"
          />
        ) : style.hair === 'parted' ? (
          <path
            d="M 32 36 C 30 18 50 16 68 18 C 70 26 68 36 68 36 C 60 28 42 28 32 36 Z"
            fill="#1E1B4B"
          />
        ) : (
          <path
            d="M 32 36 C 30 18 70 18 68 36 C 62 30 38 30 32 36 Z"
            fill="#1E1B4B"
          />
        )}

        {/* Facial Features */}
        <circle cx="44" cy="38" r="2" fill="#1E1B4B" />
        <circle cx="56" cy="38" r="2" fill="#1E1B4B" />
        <path d="M 46 47 Q 50 51 54 47" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Glasses */}
        {style.glasses && (
          <g stroke="#1E1B4B" strokeWidth="1.5">
            <rect x="38" y="34" width="11" height="8" rx="2" fill="none" />
            <rect x="51" y="34" width="11" height="8" rx="2" fill="none" />
            <line x1="49" y1="38" x2="51" y2="38" />
          </g>
        )}
      </svg>
    </div>
  );
};
