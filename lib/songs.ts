// Song catalog generated from data/songs.csv for grief and loss moods.
// Edit data/songs.csv, then run: node scripts/generate-songs.mjs

export type GriefMood = 'longing' | 'remembrance' | 'comfort' | 'farewell' | 'solitude'

export type CatalogSong = {
  id: string
  title: string
  artist: string
  mood: GriefMood
  tint: string
}

export const MOODS: { id: GriefMood; label: string; hint: string }[] = [
  { id: 'longing', label: 'Longing', hint: 'Missing someone deeply' },
  { id: 'remembrance', label: 'Remembrance', hint: 'Holding on to memories' },
  { id: 'comfort', label: 'Comfort', hint: 'Soft songs that hold you' },
  { id: 'farewell', label: 'Farewell', hint: 'Saying goodbye and letting go' },
  { id: 'solitude', label: 'Solitude', hint: 'Sitting with the quiet' },
]

export const SONG_CATALOG: CatalogSong[] = [
  {
    "id": "longing-01",
    "title": "Tears in Heaven",
    "artist": "Eric Clapton",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-02",
    "title": "Someone Like You",
    "artist": "Adele",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-03",
    "title": "Fix You",
    "artist": "Coldplay",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-04",
    "title": "The Night We Met",
    "artist": "Lord Huron",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-05",
    "title": "I Will Always Love You",
    "artist": "Whitney Houston",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-06",
    "title": "Yesterday",
    "artist": "The Beatles",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-07",
    "title": "Nothing Compares 2 U",
    "artist": "Sinead O'Connor",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-08",
    "title": "Skinny Love",
    "artist": "Bon Iver",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-09",
    "title": "All I Want",
    "artist": "Kodaline",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-10",
    "title": "Jealous",
    "artist": "Labrinth",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-11",
    "title": "When I Look at You",
    "artist": "Miley Cyrus",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-12",
    "title": "If I Die Young",
    "artist": "The Band Perry",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-13",
    "title": "My Immortal",
    "artist": "Evanescence",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-14",
    "title": "A Thousand Years",
    "artist": "Christina Perri",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-15",
    "title": "Stay With Me",
    "artist": "Sam Smith",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-16",
    "title": "Photograph",
    "artist": "Ed Sheeran",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-17",
    "title": "See You Again",
    "artist": "Wiz Khalifa",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-18",
    "title": "Dancing With Your Ghost",
    "artist": "Sasha Alex Sloan",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-19",
    "title": "I Miss You",
    "artist": "Blink-182",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "longing-20",
    "title": "Without You",
    "artist": "Mariah Carey",
    "mood": "longing",
    "tint": "bg-sky-200"
  },
  {
    "id": "remembrance-01",
    "title": "Candle in the Wind",
    "artist": "Elton John",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-02",
    "title": "In the Living Years",
    "artist": "Mike and The Mechanics",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-03",
    "title": "Dance With My Father",
    "artist": "Luther Vandross",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-04",
    "title": "The Dance",
    "artist": "Garth Brooks",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-05",
    "title": "Wind Beneath My Wings",
    "artist": "Bette Midler",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-06",
    "title": "Hero",
    "artist": "Mariah Carey",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-07",
    "title": "One Sweet Day",
    "artist": "Mariah Carey",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-08",
    "title": "I'll Be Missing You",
    "artist": "Puff Daddy",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-09",
    "title": "Supermarket Flowers",
    "artist": "Ed Sheeran",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-10",
    "title": "Fire and Rain",
    "artist": "James Taylor",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-11",
    "title": "Angel",
    "artist": "Sarah McLachlan",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-12",
    "title": "Time to Say Goodbye",
    "artist": "Andrea Bocelli",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-13",
    "title": "You Raise Me Up",
    "artist": "Josh Groban",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-14",
    "title": "Hallelujah",
    "artist": "Jeff Buckley",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-15",
    "title": "My Heart Will Go On",
    "artist": "Celine Dion",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-16",
    "title": "Smallest Light",
    "artist": "Ingrid Michaelson",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-17",
    "title": "Gone Too Soon",
    "artist": "Michael Jackson",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-18",
    "title": "Slipping Through My Fingers",
    "artist": "ABBA",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-19",
    "title": "Keep Me in Your Heart",
    "artist": "Warren Zevon",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "remembrance-20",
    "title": "What a Wonderful World",
    "artist": "Louis Armstrong",
    "mood": "remembrance",
    "tint": "bg-amber-200"
  },
  {
    "id": "comfort-01",
    "title": "Lean on Me",
    "artist": "Bill Withers",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-02",
    "title": "Bridge Over Troubled Water",
    "artist": "Simon and Garfunkel",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-03",
    "title": "Let It Be",
    "artist": "The Beatles",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-04",
    "title": "You'll Never Walk Alone",
    "artist": "Gerry and The Pacemakers",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-05",
    "title": "True Colors",
    "artist": "Cyndi Lauper",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-06",
    "title": "You Are Not Alone",
    "artist": "Michael Jackson",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-07",
    "title": "Heal the World",
    "artist": "Michael Jackson",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-08",
    "title": "Beautiful",
    "artist": "Christina Aguilera",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-09",
    "title": "The Scientist",
    "artist": "Coldplay",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-10",
    "title": "Gravity",
    "artist": "John Mayer",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-11",
    "title": "Holocene",
    "artist": "Bon Iver",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-12",
    "title": "Bloom",
    "artist": "The Paper Kites",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-13",
    "title": "To Build a Home",
    "artist": "The Cinematic Orchestra",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-14",
    "title": "Saturn",
    "artist": "Sleeping at Last",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-15",
    "title": "I Will Carry You",
    "artist": "Ellie Holcomb",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-16",
    "title": "Held",
    "artist": "Natalie Grant",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-17",
    "title": "Be Still",
    "artist": "The Fray",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-18",
    "title": "Come Healing",
    "artist": "Leonard Cohen",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-19",
    "title": "Peace",
    "artist": "O.A.R.",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "comfort-20",
    "title": "Better Place",
    "artist": "Rachel Platten",
    "mood": "comfort",
    "tint": "bg-emerald-200"
  },
  {
    "id": "farewell-01",
    "title": "Goodbye My Lover",
    "artist": "James Blunt",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-02",
    "title": "Leaving on a Jet Plane",
    "artist": "John Denver",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-03",
    "title": "So Long Marianne",
    "artist": "Leonard Cohen",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-04",
    "title": "Fast Car",
    "artist": "Tracy Chapman",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-05",
    "title": "Landslide",
    "artist": "Fleetwood Mac",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-06",
    "title": "Go Rest High on That Mountain",
    "artist": "Vince Gill",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-07",
    "title": "If You Leave Me Now",
    "artist": "Chicago",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-08",
    "title": "Don't Look Back in Anger",
    "artist": "Oasis",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-09",
    "title": "Wish You Were Here",
    "artist": "Pink Floyd",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-10",
    "title": "Knockin' on Heaven's Door",
    "artist": "Bob Dylan",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-11",
    "title": "Free Bird",
    "artist": "Lynyrd Skynyrd",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-12",
    "title": "Amazing Grace",
    "artist": "Judy Collins",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-13",
    "title": "Over the Rainbow",
    "artist": "Israel Kamakawiwo'ole",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-14",
    "title": "Into the West",
    "artist": "Annie Lennox",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-15",
    "title": "Carry On Wayward Son",
    "artist": "Kansas",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-16",
    "title": "Spirit in the Sky",
    "artist": "Norman Greenbaum",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-17",
    "title": "Dust in the Wind",
    "artist": "Kansas",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-18",
    "title": "Seasons of Love",
    "artist": "Rent Cast",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-19",
    "title": "For Good",
    "artist": "Wicked Cast",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "farewell-20",
    "title": "Somewhere Over the Rainbow",
    "artist": "Judy Garland",
    "mood": "farewell",
    "tint": "bg-violet-200"
  },
  {
    "id": "solitude-01",
    "title": "Hurt",
    "artist": "Johnny Cash",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-02",
    "title": "The Sound of Silence",
    "artist": "Simon and Garfunkel",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-03",
    "title": "Everybody Hurts",
    "artist": "R.E.M.",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-04",
    "title": "Mad World",
    "artist": "Gary Jules",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-05",
    "title": "Black",
    "artist": "Pearl Jam",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-06",
    "title": "How to Disappear Completely",
    "artist": "Radiohead",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-07",
    "title": "Creep",
    "artist": "Radiohead",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-08",
    "title": "Nutshell",
    "artist": "Alice in Chains",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-09",
    "title": "Adam's Song",
    "artist": "Blink-182",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-10",
    "title": "Boulevard of Broken Dreams",
    "artist": "Green Day",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-11",
    "title": "Breathe Me",
    "artist": "Sia",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-12",
    "title": "Liability",
    "artist": "Lorde",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-13",
    "title": "Motion Picture Soundtrack",
    "artist": "Radiohead",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-14",
    "title": "Both Sides Now",
    "artist": "Joni Mitchell",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-15",
    "title": "River",
    "artist": "Joni Mitchell",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-16",
    "title": "Blue",
    "artist": "Joni Mitchell",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-17",
    "title": "Alone Again Naturally",
    "artist": "Gilbert O'Sullivan",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-18",
    "title": "Only the Lonely",
    "artist": "Roy Orbison",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-19",
    "title": "Eleanor Rigby",
    "artist": "The Beatles",
    "mood": "solitude",
    "tint": "bg-slate-200"
  },
  {
    "id": "solitude-20",
    "title": "Asleep",
    "artist": "The Smiths",
    "mood": "solitude",
    "tint": "bg-slate-200"
  }
] as CatalogSong[]

export function songsForMood(mood: GriefMood | 'all') {
  if (mood === 'all') return SONG_CATALOG
  return SONG_CATALOG.filter((s) => s.mood === mood)
}

export function findSong(id: string) {
  return SONG_CATALOG.find((s) => s.id === id)
}
