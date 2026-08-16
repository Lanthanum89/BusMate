import { useEffect, useRef } from 'react'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Icon.Default._getIconUrl() prepends an auto-detected imagePath in front of
// whatever iconUrl/shadowUrl it's given - deleting the override falls back to
// using our Vite-resolved URLs as-is.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export function LocationMap({ lat, lon, theme }: { lat: number; lon: number; theme: 'light' | 'dark' }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const map = L.map(containerRef.current, {
      center: [lat, lon],
      zoom: 15,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true,
    })

    // CARTO's free, no-key basemaps - dark_all/light_all - read closer to
    // the app's own palette than default OSM tiles.
    const basemapStyle = theme === 'dark' ? 'dark_all' : 'light_all'
    L.tileLayer(`https://{s}.basemaps.cartocdn.com/${basemapStyle}/{z}/{x}/{y}{r}.png`, {
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
    }).addTo(map)

    L.marker([lat, lon]).addTo(map)

    // Leaflet needs a real size at init - the map panel's height depends on
    // layout that may not have settled on the very first paint.
    const resize = new ResizeObserver(() => map.invalidateSize())
    resize.observe(containerRef.current)

    return () => {
      resize.disconnect()
      map.remove()
    }
  }, [lat, lon, theme])

  return <div ref={containerRef} className="map-canvas" />
}
