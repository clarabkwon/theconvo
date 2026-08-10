import { SONG_CATALOG, type CatalogSong } from '@/lib/songs'

export type Song = {
  id: string
  title: string
  artist: string
  tint: string
  mood?: string
}

export type Memory = {
  id: string
  song: Song
  message: string
  pseudonym: string
  date: string
  flower: number // 1-5 -> /images/flower-N.png
  x: number // percent across the field
  y: number // percent from top of the field band
  size: number // px height
}

function toSong(s: CatalogSong): Song {
  return { id: s.id, title: s.title, artist: s.artist, tint: s.tint, mood: s.mood }
}

function songById(id: string): Song {
  const found = SONG_CATALOG.find((s) => s.id === id)
  if (!found) throw new Error(`Missing song id: ${id}`)
  return toSong(found)
}

// Kept for older imports. Prefer SONG_CATALOG from lib/songs for the full list.
export const SONGS: Song[] = [
  songById('comfort-03'),
  songById('farewell-05'),
  songById('remembrance-14'),
  songById('comfort-11'),
]

export const SUGGESTED_SONGS: Song[] = SONG_CATALOG.filter((s) => s.mood === 'comfort')
  .slice(0, 4)
  .map(toSong)

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'm1',
    song: songById('comfort-03'),
    message:
      'We danced in the kitchen while the pasta boiled over. Nobody cared. I think about that night every autumn.',
    pseudonym: 'quiet-fern',
    date: 'Nov 13, 2025',
    flower: 1,
    x: 12,
    y: 38,
    size: 150,
  },
  {
    id: 'm2',
    song: songById('remembrance-03'),
    message:
      'My mother hummed this while braiding my hair before school. I can still feel her hands.',
    pseudonym: 'paper-lantern',
    date: 'Jan 4, 2026',
    flower: 3,
    x: 28,
    y: 22,
    size: 130,
  },
  {
    id: 'm3',
    song: songById('comfort-11'),
    message:
      'A long train ride through the mountains, headphones shared between two strangers who became friends.',
    pseudonym: 'winter-wren',
    date: 'Mar 21, 2026',
    flower: 2,
    x: 43,
    y: 46,
    size: 140,
  },
  {
    id: 'm4',
    song: songById('farewell-04'),
    message:
      'The last summer at the lake house. Sand in every book I brought, and I regret none of it.',
    pseudonym: 'salt-and-cedar',
    date: 'Jun 2, 2026',
    flower: 4,
    x: 58,
    y: 26,
    size: 145,
  },
  {
    id: 'm5',
    song: songById('comfort-12'),
    message:
      'Driving home at dusk with the windows down. For three minutes and forty seconds, everything was fine.',
    pseudonym: 'amber-hollow',
    date: 'Apr 17, 2026',
    flower: 5,
    x: 73,
    y: 42,
    size: 135,
  },
  {
    id: 'm6',
    song: songById('remembrance-01'),
    message:
      "Played at my grandfather's memorial. He would have tapped his foot and pretended not to cry.",
    pseudonym: 'north-field',
    date: 'Feb 9, 2026',
    flower: 1,
    x: 87,
    y: 30,
    size: 125,
  },
  {
    id: 'm7',
    song: songById('longing-14'),
    message:
      "First slow dance at our wedding. We stepped on each other's feet the whole time.",
    pseudonym: 'two-left-shoes',
    date: 'May 30, 2026',
    flower: 4,
    x: 20,
    y: 58,
    size: 120,
  },
  {
    id: 'm8',
    song: songById('solitude-14'),
    message:
      'A snowed-in weekend with nowhere to be. This album on repeat, tea going cold on the sill.',
    pseudonym: 'still-water',
    date: 'Dec 28, 2025',
    flower: 3,
    x: 65,
    y: 60,
    size: 118,
  },
  {
    id: 'm9',
    song: songById('farewell-05'),
    message:
      'My best friend mailed me this song on a burned CD in 2004. We still talk every Sunday.',
    pseudonym: 'burned-cd',
    date: 'Oct 2, 2025',
    flower: 2,
    x: 80,
    y: 62,
    size: 122,
  },
]

export const TYPING_EXAMPLE =
  'e.g. "This song was playing the first time we drove to the coast. The windows were down and my sister sang every word wrong, on purpose."'

// Returns the image path for a finished bloom (flowers 1 through 5).
export function flowerSrc(n: number) {
  return `/images/flower-${n}.png`
}

// Returns the sprout image used before the user presses Bloom.
export function sproutSrc() {
  return '/images/flower-sprout.png'
}
