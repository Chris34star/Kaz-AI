import React from 'react';

interface CompanyBadgeProps {
  company: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CompanyBadge: React.FC<CompanyBadgeProps> = ({ company, size = 'md' }) => {
  // Real Kenyan brand colors and short badges
  const getBrandDetails = (name: string) => {
    switch (name) {
      case 'Aga Khan Hospital':
        return { short: 'AK', bg: 'bg-emerald-700 text-white', ring: 'ring-emerald-200' };
      case 'Naivas':
      case 'Naivas Supermarket':
        return { short: 'NV', bg: 'bg-orange-600 text-white', ring: 'ring-orange-200' };
      case 'Equity Bank':
        return { short: 'EQ', bg: 'bg-amber-800 text-white', ring: 'ring-amber-200' };
      case 'Safaricom':
        return { short: 'SF', bg: 'bg-emerald-600 text-white', ring: 'ring-emerald-300' };
      case 'KNH (Kenyatta National Hospital)':
      case 'KNH':
        return { short: 'KNH', bg: 'bg-blue-800 text-white', ring: 'ring-blue-200' };
      case 'Brookside':
      case 'Brookside Dairy':
        return { short: 'BS', bg: 'bg-blue-600 text-white', ring: 'ring-blue-200' };
      case 'Java House':
        return { short: 'JH', bg: 'bg-amber-900 text-white', ring: 'ring-amber-300' };
      case 'G4S':
        return { short: 'G4S', bg: 'bg-red-700 text-white', ring: 'ring-red-200' };
      case 'Bidco':
        return { short: 'BD', bg: 'bg-yellow-600 text-white', ring: 'ring-yellow-200' };
      case 'MP Shah Hospital':
        return { short: 'MP', bg: 'bg-teal-700 text-white', ring: 'ring-teal-200' };
      case 'Bamburi Cement':
        return { short: 'BC', bg: 'bg-slate-800 text-white', ring: 'ring-slate-300' };
      case 'Quickmart':
        return { short: 'QM', bg: 'bg-red-600 text-white', ring: 'ring-red-200' };
      case 'Britam':
        return { short: 'BR', bg: 'bg-cyan-700 text-white', ring: 'ring-cyan-200' };
      case 'Serena Hotels':
        return { short: 'SR', bg: 'bg-stone-800 text-white', ring: 'ring-stone-300' };
      case 'Davis & Shirtliff':
        return { short: 'D&S', bg: 'bg-sky-700 text-white', ring: 'ring-sky-200' };
      default:
        return { short: name.slice(0, 2).toUpperCase(), bg: 'bg-slate-700 text-white', ring: 'ring-slate-200' };
    }
  };

  const { short, bg, ring } = getBrandDetails(company);

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm'
  };

  return (
    <div
      className={`${sizeClasses[size]} ${bg} ${ring} ring-1 font-bold rounded-xl flex items-center justify-center shrink-0 tracking-wider shadow-xs select-none`}
      title={company}
    >
      {short}
    </div>
  );
};
