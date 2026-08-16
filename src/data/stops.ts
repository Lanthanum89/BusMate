export type StopGroup = 'home' | 'town'

export type RouteColor = 'yellow' | 'black'

export const ROUTE_COLOR_HEX: Record<RouteColor, string> = {
  yellow: '#facc15',
  black: '#18181b',
}

export interface BusStop {
  id: string
  code: string
  label: string
  group: StopGroup
  color: RouteColor
}

// Reading Buses ATCO stop codes - public information, same ones used on
// reading-buses.co.uk's own live-departures pages. Add/remove/reorder
// freely; the app just renders whatever's here.
export const stops: BusStop[] = [
  { id: 'ikea', code: '030054700001', label: 'Towards IKEA', group: 'home', color: 'yellow' },
  { id: 'home-station', code: '030054700002', label: 'Towards Station', group: 'home', color: 'yellow' },
  { id: 'langley-hill', code: '030054120001', label: 'Langley Hill', group: 'home', color: 'black' },
  { id: 'town-station', code: '039028150004', label: 'Station', group: 'town', color: 'yellow' },
  { id: 'blagrave', code: '039028150001', label: 'Blagrave', group: 'town', color: 'black' },
]

export function stopUrl(code: string): string {
  return `https://www.reading-buses.co.uk/stops/${code}`
}
