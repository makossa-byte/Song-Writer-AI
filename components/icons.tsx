
import React from 'react';

const iconProps = {
  className: "w-5 h-5 inline-block mr-2",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const DownloadIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const MusicIcon: React.FC = () => (
    <svg {...iconProps} className="w-5 h-5 inline-block mr-2 -mt-1">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
    </svg>
);

export const PlayIcon: React.FC = () => (
  <svg {...iconProps}>
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export const StopIcon: React.FC = () => (
  <svg {...iconProps}>
    <rect x="6" y="6" width="12" height="12"></rect>
  </svg>
);

export const WandIcon: React.FC = () => (
    <svg {...iconProps} className="w-6 h-6 inline-block mr-2">
        <path d="M15 4V2a2 2 0 0 0-4 0v2"></path>
        <path d="M15 14h-4"></path>
        <path d="M21 10h-2"></path><path d="M11 10H9"></path>
        <path d="M21 14h-2"></path><path d="M11 14H9"></path>
        <path d="M15 18v2a2 2 0 0 1-4 0v-2"></path>
        <path d="M5 14H3"></path><path d="M5 10H3"></path>
        <path d="M12 22a2 2 0 0 0 2-2v-2a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2Z"></path>
        <path d="M12 8a2 2 0 0 0 2-2V4a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2Z"></path>
    </svg>
);

export const SaveIcon: React.FC = () => (
  <svg {...iconProps}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className || "w-5 h-5"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);
