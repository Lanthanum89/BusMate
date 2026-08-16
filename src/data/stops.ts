export type StopGroup = 'home' | 'town'

export interface BusStop {
  id: string
  code: string
  label: string
  group: StopGroup
}

// Reading Buses ATCO stop codes - public information, same ones used on
// reading-buses.co.uk's own live-departures pages. Add/remove/reorder
// freely; the app just renders whatever's here.
export const stops: BusStop[] = [
  { id: 'ikea', code: '030054700001', label: 'Towards IKEA', group: 'home' },
  { id: 'home-station', code: '030054700002', label: 'Towards Station', group: 'home' },
  { id: 'town-station', code: '039028150004', label: 'Station', group: 'town' },
  { id: 'blagrave', code: '039028150001', label: 'Blagrave', group: 'town' },
]

export function stopUrl(code: string): string {
  return `https://www.reading-buses.co.uk/stops/${code}`
}
