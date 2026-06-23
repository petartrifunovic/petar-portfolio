'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const lng = 20.4573;
    const lat = 44.8176;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lng, lat],
      zoom: 11,
      interactive: false,
      attributionControl: false,
      config: {
        basemap: {
          theme: 'monochrome',
          lightPreset: 'night',
          show3dObjects: false,
        },
      },
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    const markerEl = document.createElement('div');
    markerEl.className = 'custom-marker';
    markerEl.style.width = '42px';
    markerEl.style.height = '42px';
    markerEl.style.backgroundImage = 'url(/map_pin.svg)';
    markerEl.style.backgroundSize = 'contain';
    markerEl.style.backgroundRepeat = 'no-repeat';
    markerEl.style.backgroundPosition = 'center';
    markerEl.style.cursor = 'default';

    new mapboxgl.Marker({
      element: markerEl,
      anchor: 'bottom',
    })
      .setLngLat([lng, lat])
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className='relative'>
      <div className='absolute z-20 left-0 bottom-0 bg-black/30 backdrop-blur py-2 px-2 rounded text-sm text-primary-50 shadow w-full flex justify-between border-t border-border/20 dark:border-border'>
        <span>Address</span> <span>Belgrade, Serbia</span>
      </div>
      <div ref={mapContainerRef} className='h-[420px] w-full overflow-hidden' />
    </div>
  );
}
