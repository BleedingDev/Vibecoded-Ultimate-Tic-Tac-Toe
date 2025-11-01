import React from 'react';

// Kid-friendly Cat Icon
export const CatIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="50" cy="50" r="40" fill="#FDBA74"/>
        {/* Ears */}
        <path d="M20 35 Q25 10 40 20 L30 38 Z" fill="#FDBA74"/>
        <path d="M80 35 Q75 10 60 20 L70 38 Z" fill="#FDBA74"/>
        <path d="M25 33 Q28 18 37 25 L31 36 Z" fill="#F9A8D4"/>
        <path d="M75 33 Q72 18 63 25 L69 36 Z" fill="#F9A8D4"/>
        {/* Eyes */}
        <circle cx="35" cy="45" r="7" fill="#1F2937"/>
        <circle cx="33" cy="43" r="2" fill="white"/>
        <circle cx="65" cy="45" r="7" fill="#1F2937"/>
        <circle cx="63" cy="43" r="2" fill="white"/>
        {/* Nose */}
        <path d="M47 60 L53 60 C 55 60 55 56 50 56 C 45 56 45 60 47 60 Z" fill="#F9A8D4"/>
        {/* Mouth */}
        <path d="M42 65 Q50 72 58 65" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Whiskers */}
        <path d="M20 55 Q35 58 40 55" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M22 62 Q35 64 40 60" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M80 55 Q65 58 60 55" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M78 62 Q65 64 60 60" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
);

// Kid-friendly Dog Icon
export const DogIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <path d="M15 50 C15 25 85 25 85 50 Q85 85 50 85 Q15 85 15 50 Z" fill="#D2B48C"/>
        {/* Ears */}
        <path d="M10 55 C0 30 25 20 30 40 L20 60 Z" fill="#A0522D"/>
        <path d="M90 55 C100 30 75 20 70 40 L80 60 Z" fill="#A0522D"/>
        {/* Snout */}
        <path d="M35 75 C25 90 75 90 65 75 C65 60 35 60 35 75 Z" fill="#F5DEB3"/>
        {/* Eyes */}
        <circle cx="38" cy="50" r="7" fill="#1F2937"/>
        <circle cx="36" cy="48" r="2" fill="white"/>
        <circle cx="62" cy="50" r="7" fill="#1F2937"/>
        <circle cx="60" cy="48" r="2" fill="white"/>
        {/* Nose */}
        <ellipse cx="50" cy="65" rx="8" ry="6" fill="#1F2937"/>
        {/* Mouth */}
        <path d="M40 78 Q50 85 60 78" stroke="#4B5563" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Tongue */}
        <path d="M50 82 Q55 90 56 82 L44 82 Q45 90 50 82 Z" fill="#F472B6"/>
    </svg>
);
