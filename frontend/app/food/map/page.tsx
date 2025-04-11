'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import dynamic from 'next/dynamic';
import { divIcon } from 'leaflet';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const useMap = dynamic(
  () => import('react-leaflet').then((mod) => mod.useMap),
  { ssr: false }
);

// Component to handle user's current location
function LocationButton() {
  const map = useMap();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 15);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check your browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="absolute top-4 left-4 z-[999] bg-white dark:bg-neutral-dark p-2 rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        <button 
          className="p-2 bg-primary text-white rounded-full"
          onClick={handleGetLocation}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-sm">Use my location</span>
      </div>
    </div>
  );
}

// Separate Store Marker component to ensure proper mounting/unmounting
const StoreMarkerWithPopup = ({ store, selectedStore, onSelect }: any) => {
  // Create a memoized divIcon for the marker to prevent recreating on every render
  const customIcon = useMemo(() => {
    return divIcon({
      className: 'custom-icon',
      html: `
        <div class="store-marker ${selectedStore === store.id ? 'active' : ''}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });
  }, [store.id, selectedStore]);

  return (
    <Marker 
      key={`marker-${store.id}`}
      position={[store.lat, store.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onSelect(store.id),
      }}
    >
      <Popup className="store-popup">
        <div className="popup-content">
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p><span className="items-available">{store.itemsAvailable}</span> items available</p>
          <Link href={`/food/store/${store.id}`} className="view-store">
            View store details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

function MapContent() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId');
  const [selectedStore, setSelectedStore] = useState<number | null>(storeId ? parseInt(storeId) : null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  const stores = [
    {
      id: 1,
      name: 'Green Grocery',
      address: '123 Main Street, City',
      lat: 37.7749,
      lng: -122.4194,
      distance: '0.8 km',
      itemsAvailable: 12,
    },
    {
      id: 2,
      name: 'Organic Market',
      address: '456 Oak Avenue, City',
      lat: 37.7739,
      lng: -122.4212,
      distance: '1.2 km',
      itemsAvailable: 8,
    },
    {
      id: 3,
      name: 'Fresh Farms',
      address: '789 Pine Street, City',
      lat: 37.7729,
      lng: -122.4174,
      distance: '2.5 km',
      itemsAvailable: 15,
    },
  ];

  // Memoize the center coordinates to avoid recalculation on every render
  const mapCenter = useMemo(() => [
    stores.reduce((sum, store) => sum + store.lat, 0) / stores.length,
    stores.reduce((sum, store) => sum + store.lng, 0) / stores.length
  ] as [number, number], [stores]);

  useEffect(() => {
    // Simulate loading map
    const timer = setTimeout(() => {
      setIsMapLoading(false);
      // Give a small delay to ensure map components are loaded
      setTimeout(() => setMapReady(true), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleStoreSelect = (id: number) => {
    setSelectedStore(id);
    
    // If the map is ready, find the store and center the map on it
    if (mapReady) {
      const store = stores.find((s) => s.id === id);
      if (store) {
        // We need to scroll the list item into view here
        const storeElement = document.getElementById(`store-${id}`);
        if (storeElement) {
          storeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
  };

  // Create Map component separately and only when loading is complete
  const MapComponent = useMemo(() => {
    if (isMapLoading) return null;
    
    return (
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        key="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Add markers for each store */}
        {stores.map((store) => (
          <StoreMarkerWithPopup 
            key={`store-marker-${store.id}`}
            store={store}
            selectedStore={selectedStore}
            onSelect={handleStoreSelect}
          />
        ))}
        
        {/* Location button */}
        <LocationButton />
      </MapContainer>
    );
  }, [isMapLoading, stores, selectedStore, mapCenter]);

  return (
    <>
      <Link href="/food" className="flex items-center mb-6 text-primary hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Food Stores
      </Link>

      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Nearby Food Stores
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2 bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden h-[500px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isMapLoading ? (
            <div className="flex justify-center items-center h-full">
              <motion.div 
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : MapComponent}
        </motion.div>

        <div>
          <motion.div
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-4 mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-semibold mb-3">Filter Stores</h2>
            <div className="space-y-3">
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Show all stores</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Expiring today</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Verified items only</span>
                </label>
              </div>
              <div>
                <label className="block mb-1 text-sm">Max distance</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="5" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 km</span>
                  <span>5 km</span>
                  <span>10 km</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-semibold">Nearby Stores</h2>
            
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                id={`store-${store.id}`}
                className={`p-4 rounded-lg ${selectedStore === store.id ? 'bg-primary/10 border border-primary' : 'bg-white dark:bg-neutral-dark'} shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                onClick={() => handleStoreSelect(store.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{store.name}</h3>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {store.distance}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{store.address}</p>
                <p className="text-sm">
                  <span className="font-semibold text-primary">{store.itemsAvailable}</span> items available
                </p>
                <div className="mt-3">
                  <Link
                    href={`/food/store/${store.id}`}
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    View details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function MapPage() {
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Suspense fallback={<div>Loading map...</div>}>
          <MapContent />
        </Suspense>
      </div>
    </MainLayout>
  );
} 