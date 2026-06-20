'use client';

import React from 'react';
import DashboardHome from './DashboardHome';
import MediaWorld from '../_components/MediaWorld';

export default function HomePage() {
  return (
    <div>
      {/* 🗺️ SECTION 1: World Map Adventure (Gaming Hub) */}
      <DashboardHome />

      {/* 🎵📺 SECTION 2: Rhyme Radio + Magic Cinema (Entertainment Hub) */}
      <div className="w-full bg-white relative z-20">
        <MediaWorld />
      </div>
    </div>
  );
}
