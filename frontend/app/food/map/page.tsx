'use client';

import { useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import dynamic from 'next/dynamic';

// Import Leaflet types but not the actual implementation
import type { Map as LeafletMap } from 'leaflet';

// Dynamically import Leaflet components with ssr: false to avoid SSR issues
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

// Define types for UseMapComponent props
interface UseMapComponentProps {
  children: (map: LeafletMap) => React.ReactNode;
}

// Import useMap as a component wrapper to fix TypeScript error
const UseMapComponent = dynamic(
  () => import('react-leaflet').then((mod) => {
    return function UseMapWrapper(props: UseMapComponentProps) {
      return props.children(mod.useMap());
    };
  }),
  { ssr: false }
);

// Component to handle user's current location
const LocationButton = dynamic(() => Promise.resolve(() => {
  return (
    <UseMapComponent>
      {(map: LeafletMap) => {
        const handleGetLocation = () => {
          if (typeof window !== 'undefined' && window.navigator && window.navigator.geolocation) {
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
          <button 
            className="absolute top-4 right-4 z-[999] bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={handleGetLocation}
            aria-label="Use my location"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </button>
        );
      }}
    </UseMapComponent>
  );
}), { ssr: false });

// Define an interface for Store
interface Store {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: string;
  itemsAvailable: number;
}

// Define props interface for the StoreMarkerWithPopup component
interface StoreMarkerProps {
  store: Store;
  selectedStore: number | null;
  onSelect: (id: number) => void;
}

// Separate Store Marker component to ensure proper mounting/unmounting
const StoreMarkerWithPopup = dynamic(() => Promise.resolve(({ store, selectedStore, onSelect }: StoreMarkerProps) => {
  // Create divIcon on the client side
  const [customIcon, setCustomIcon] = useState<ReturnType<typeof import('leaflet')['divIcon']> | null>(null);

  // Set up the icon when the component mounts on the client
  useEffect(() => {
    // We need to import leaflet dynamically to get divIcon function
    import('leaflet').then(L => {
      const isSelected = selectedStore === store.id;
      const icon = L.divIcon({
        className: 'custom-icon',
        html: `
          <div class="${isSelected ? 'bg-primary text-white' : 'bg-white text-primary'} flex items-center justify-center rounded-full shadow-lg border-2 ${isSelected ? 'border-primary' : 'border-gray-200'} w-10 h-10 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });
      setCustomIcon(icon);
    });
  }, [store.id, selectedStore]);

  // Don't render until the icon is ready
  if (!customIcon) return null;

  return (
    <Marker 
      key={`marker-${store.id}`}
      position={[store.lat, store.lng]}
      icon={customIcon}
      eventHandlers={{
        click: () => onSelect(store.id),
      }}
    >
      <Popup className="leaflet-popup">
        <div className="p-2">
          <h3 className="font-bold text-lg mb-1">{store.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{store.address}</p>
          <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-1.5 rounded text-sm mb-3 inline-block">
            <span className="font-bold">{store.itemsAvailable}</span> items available
          </div>
          <Link 
            href={`/food/store/${store.id}`} 
            className="block w-full bg-primary hover:bg-primary/90 text-white py-2 px-3 rounded text-center text-sm transition-colors"
          >
            View store details
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}), { ssr: false });

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

// Store list item component
interface StoreListItemProps {
  store: Store;
  isSelected: boolean;
  onSelect: (id: number) => void;
  index: number;
}

const StoreListItem = ({ store, isSelected, onSelect, index }: StoreListItemProps) => (
  <motion.div
    key={store.id}
    id={`store-${store.id}`}
    className={`p-4 rounded-lg shadow-md transition-all ${
      isSelected ? 'bg-primary/10 border border-primary' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 + index * 0.05 }}
    whileHover={{ y: -2 }}
    onClick={() => onSelect(store.id)}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-semibold">{store.name}</h3>
      <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium">
        {store.distance}
      </span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{store.address}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm">
        <span className="font-semibold text-green-600 dark:text-green-400">{store.itemsAvailable}</span> items
      </span>
      <Link
        href={`/food/store/${store.id}`}
        className="text-sm text-primary hover:underline inline-flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        Details
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  </motion.div>
);

function MapContent() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId');
  const [selectedStore, setSelectedStore] = useState<number | null>(storeId ? parseInt(storeId) : null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [filterDistance, setFilterDistance] = useState(5);
  const [filters, setFilters] = useState({
    showAll: true,
    expiringToday: true,
    verifiedOnly: true
  });

  // Memoize the stores array to prevent recreating on every render
  const stores = useMemo(() => [
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
  ], []);

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
      setTimeout(() => setMapReady(true), 300);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStoreSelect = useCallback((id: number) => {
    setSelectedStore(id);
    
    // If the map is ready, find the store and center the map on it
    if (mapReady) {
      const storeElement = document.getElementById(`store-${id}`);
      if (storeElement) {
        storeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [mapReady]);

  // Handle filter changes
  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Create Map component separately and only when loading is complete
  const MapComponent = useMemo(() => {
    if (isMapLoading) return <LoadingSpinner />;
    
    return (
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem', overflow: 'hidden' }}
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
  }, [isMapLoading, stores, selectedStore, mapCenter, handleStoreSelect]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Link href="/food" className="flex items-center mb-3 text-primary hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Food Stores
          </Link>
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Find Nearby Food Stores
          </motion.h1>
        </div>
        
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">Showing {stores.length} stores in your area</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[500px] md:h-[600px] relative order-2 lg:order-1"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {MapComponent}
        </motion.div>

        <div className="order-1 lg:order-2">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold text-lg mb-4">Filter Stores</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary h-4 w-4" 
                    checked={filters.showAll}
                    onChange={() => handleFilterChange('showAll')} 
                  />
                  <span>Show all stores</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                    checked={filters.expiringToday}
                    onChange={() => handleFilterChange('expiringToday')}
                  />
                  <span>Expiring today</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded text-primary focus:ring-primary h-4 w-4"
                    checked={filters.verifiedOnly}
                    onChange={() => handleFilterChange('verifiedOnly')}
                  />
                  <span>Verified items only</span>
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Max distance: {filterDistance} km</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={filterDistance}
                  onChange={(e) => setFilterDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 km</span>
                  <span>5 km</span>
                  <span>10 km</span>
                </div>
              </div>
              <button 
                className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors mt-2"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Nearby Stores</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <select className="bg-transparent border-0 focus:ring-0 cursor-pointer">
                  <option>Sort by distance</option>
                  <option>Sort by availability</option>
                  <option>Sort by name</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {stores.map((store, index) => (
                <StoreListItem
                  key={store.id}
                  store={store}
                  isSelected={selectedStore === store.id}
                  onSelect={handleStoreSelect}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap the entire MapContent in dynamic import to avoid any window references during SSR
const MapContentWithNoSSR = dynamic(() => Promise.resolve(MapContent), { ssr: false });

export default function MapPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              <div className="mt-8 text-center text-gray-600 dark:text-gray-300">Loading map data...</div>
            </div>
          </div>
        }>
          <MapContentWithNoSSR />
        </Suspense>
      </div>
    </MainLayout>
  );
} 