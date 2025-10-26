import React from 'react';

interface FocusPlantProps {
  level: number;
}

const PlantStage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={`w-full h-full animate-sway ${className}`}>
        {children}
        <path d="M20 90 Q50 85 80 90" stroke="#5C4033" fill="transparent" strokeWidth="4" />
    </svg>
);

const Seed = () => <PlantStage><circle cx="50" cy="85" r="5" fill="#8B4513" /></PlantStage>;
const Sprout = () => <PlantStage><path d="M50 85 C 55 75, 45 65, 50 55" stroke="#4CAF50" fill="transparent" strokeWidth="3" strokeLinecap="round" /></PlantStage>;
const Sapling = () => <PlantStage><path d="M50 85 C 55 70, 45 60, 50 45 M50 65 C 40 60, 45 50, 40 48 M50 65 C 60 60, 55 50, 60 48" stroke="#388E3C" fill="transparent" strokeWidth="4" strokeLinecap="round" /></PlantStage>;
const YoungPlant = () => <PlantStage><path d="M50 90 C 58 70, 42 60, 50 40 M50 70 C 35 65, 40 50, 30 45 M50 70 C 65 65, 60 50, 70 45 M50 55 C 40 50, 45 40, 40 38 M50 55 C 60 50, 55 40, 60 38" stroke="#2E7D32" fill="transparent" strokeWidth="5" strokeLinecap="round" /></PlantStage>;
const MaturePlant = () => <PlantStage><path d="M50 90 C 60 70, 40 60, 50 30 M50 80 C 30 75, 35 55, 20 50 M50 80 C 70 75, 65 55, 80 50 M50 60 C 35 55, 40 40, 30 35 M50 60 C 65 55, 60 40, 70 35" stroke="#1B5E20" fill="transparent" strokeWidth="6" strokeLinecap="round" /></PlantStage>;
const FloweringPlant = () => (
    <PlantStage>
        <path d="M50 90 C 60 70, 40 60, 50 30 M50 80 C 30 75, 35 55, 20 50 M50 80 C 70 75, 65 55, 80 50 M50 60 C 35 55, 40 40, 30 35 M50 60 C 65 55, 60 40, 70 35" stroke="#1B5E20" fill="transparent" strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="28" r="5" fill="#f6e05e" />
        <circle cx="20" cy="48" r="4" fill="#4299e1" />
        <circle cx="80" cy="48" r="4" fill="#4299e1" />
        <circle cx="30" cy="33" r="3" fill="#E53E3E" />
        <circle cx="70" cy="33" r="3" fill="#E53E3E" />
    </PlantStage>
);


export const FocusPlant: React.FC<FocusPlantProps> = ({ level }) => {
    const getPlantStage = () => {
        if (level < 2) return <Seed />;
        if (level < 5) return <Sprout />;
        if (level < 10) return <Sapling />;
        if (level < 15) return <YoungPlant />;
        if (level < 20) return <MaturePlant />;
        return <FloweringPlant />;
    };

    return (
        <div className="w-full h-48 md:h-64 flex items-center justify-center">
            {getPlantStage()}
        </div>
    );
};
