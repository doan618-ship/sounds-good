/**
 * Curated seed database of music posts (New Music, Hidden Gems, In-depth Reviews)
 */

export const INITIAL_POSTS = [
  {
    id: "post-1",
    featured: true,
    category: "indepth",
    categoryLabel: "📝 In-Depth Review",
    artist: "The Midnight Echo",
    album: "Neon Horizons & Electric Dreams",
    releaseDate: "July 18, 2026",
    genre: "Synthwave / Indie Electronic",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    excerpt: "A staggering masterclass in analog synth texturing and melancholic pop songwriting. 'Neon Horizons' solidifies The Midnight Echo as leaders of the modern electronic revival.",
    reviewBody: `On their fourth full-length studio album, *Neon Horizons & Electric Dreams*, electronic indie project The Midnight Echo achieves a breathtaking synthesis of vintage 1980s analog warm warmth and hyper-modern spatial audio production.

    Opening track 'Velvet Skylines' immediately sweeps the listener into a lush soundscape filled with shimmering Prophet-5 synth arpeggios and punchy LinnDrum rhythm sections. What makes this record stand out amongst the modern synthwave renaissance is its emotional depth — vocals aren't buried behind sidechain compression, but soar with heart-wrenching nostalgia.

    Standout track 'Cassette Memories' features mesmerizing saxophone fills layered over cascading basslines. The production detail across all 12 tracks is meticulous; every sub-bass frequency is rounded to perfection, creating a dense yet crystal-clear mix that rewards audiophile headphone listening.`,
    ratings: {
      production: 9.8,
      lyrics: 9.2,
      vibe: 9.9,
      overall: 9.6
    },
    spotifyUrl: "https://open.spotify.com/album/4eLPsYPBmXABThSJ821y6E",
    appleMusicUrl: "https://music.apple.com/us/album/1547890123",
    keyTracks: [
      { name: "Velvet Skylines", note: "Best Synths of 2026" },
      { name: "Cassette Memories", note: "Saxophone Solo Spotlight" },
      { name: "Midnight Cruiser", note: "Peak Driving Energy" }
    ]
  },
  {
    id: "post-2",
    featured: false,
    category: "hidden_gem",
    categoryLabel: "💎 Hidden Gem",
    artist: "Aura & The Pines",
    album: "Whispers in the Cedar Grove",
    releaseDate: "June 29, 2026",
    genre: "Neo-Folk / Ambient",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Discovered tucked away on a Bandcamp cassette release, this ethereal blend of fingerpicked acoustic guitar and field-recorded forest rain is the ultimate atmospheric escape.",
    reviewBody: `Tucked away from mainstream algorithms lies *Whispers in the Cedar Grove*, a breathtaking self-produced record by Pacific Northwest duo Aura & The Pines. 

    Recorded in an isolated cabin in the Olympic Mountains, the album captures natural acoustics like few others. The tactile hum of acoustic guitar strings mixing with real-time forest ambient noise creates a deeply meditative state. Vocal harmonies feel hushed yet omnipresent, reminiscent of early Bon Iver meets Julianna Barwick.

    If you are seeking a record to accompany late-night reading, quiet morning coffee, or rainy commutes, this hidden gem is an essential addition to your playlist rotation.`,
    ratings: {
      production: 9.4,
      lyrics: 9.6,
      vibe: 10.0,
      overall: 9.7
    },
    spotifyUrl: "https://open.spotify.com/album/37i9dQZF1DX4sWSpwq3LiO",
    appleMusicUrl: "https://music.apple.com/us/album/1440854484",
    keyTracks: [
      { name: "Cedar Canopy", note: "Ethereal Guitar Duet" },
      { name: "Rain on Moss", note: "Field Recording Masterpiece" }
    ]
  },
  {
    id: "post-3",
    featured: false,
    category: "new_music",
    categoryLabel: "🔥 New Music",
    artist: "KAIROS",
    album: "Solar Flare EP",
    releaseDate: "July 21, 2026",
    genre: "Future R&B / Soul",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Fresh off the press this week! KAIROS drops 5 tracks of infectious 808-infused soul, liquid synth pads, and falsetto hooks that hit instantly.",
    reviewBody: `KAIROS returns with *Solar Flare EP*, a 5-track powerhouse demonstrating why the 23-year-old producer and vocalist is one of the most exciting new voices in R&B.

    The title track 'Solar Flare' bounces with infectious grooves, tight vocal chops, and sub-bass hits that test the limits of speaker woofers. Lyrically exploring themes of cosmic connection and summer romance, the EP feels electric from start to finish without a single filler bar.`,
    ratings: {
      production: 9.5,
      lyrics: 8.8,
      vibe: 9.7,
      overall: 9.3
    },
    spotifyUrl: "https://open.spotify.com/album/0vEuhN5zM9hly10yWp45v1",
    appleMusicUrl: "https://music.apple.com/us/album/1500000000",
    keyTracks: [
      { name: "Solar Flare", note: "Lead Single" },
      { name: "Liquid Velvet", note: "Silky Smooth Vocals" }
    ]
  },
  {
    id: "post-4",
    featured: false,
    category: "indepth",
    categoryLabel: "📝 In-Depth Review",
    artist: "Solaris Ensemble",
    album: "Polyphonic Architecture",
    releaseDate: "May 14, 2026",
    genre: "Modern Classical / Post-Rock",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    excerpt: "A sweeping orchestral journey blending cello, modular synthesizers, and roaring post-rock climaxes. An ambitious cinematic triumph.",
    reviewBody: `Solaris Ensemble's *Polyphonic Architecture* is an epic 60-minute composition that bridges the gap between contemporary classical string quartets and heavy post-rock crescendos.

    Building from whispered cello motifs into wall-of-sound guitar textures and brass swells, the record captures feelings of architectural majesty and cosmic solitude. Fans of Max Richter, Sigur Rós, and Mona/Godspeed You! Black Emperor will find this album profoundly moving.`,
    ratings: {
      production: 9.9,
      lyrics: 8.5,
      vibe: 9.8,
      overall: 9.4
    },
    spotifyUrl: "https://open.spotify.com/album/2cwbSoMuYFj6S6igFz0huX",
    appleMusicUrl: "https://music.apple.com/us/album/1600000000",
    keyTracks: [
      { name: "Movement III: Monolith", note: "Chills-inducing climax" },
      { name: "Cello Sonata in D Minor", note: "Intricate Solo Cello" }
    ]
  },
  {
    id: "post-5",
    featured: false,
    category: "hidden_gem",
    categoryLabel: "💎 Hidden Gem",
    artist: "Lina & The Waves",
    album: "Midnight Drive in Tokyo",
    releaseDate: "June 02, 2026",
    genre: "City Pop / Funk",
    coverUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Groovy, retro Japanese City-Pop revival with slap basslines, brass fanfares, and infectious night-drive energy.",
    reviewBody: `Recorded in Shibuya and Tokyo studios, *Midnight Drive in Tokyo* captures the vibrant neon aesthetics of late-70s and 80s Japanese City Pop with modern sparkling crispness.

    Slap bass guitar, electric piano chords, and bright horn sections propel every track forward. It's impossible not to tap your foot from the very first chord.`,
    ratings: {
      production: 9.3,
      lyrics: 8.9,
      vibe: 9.9,
      overall: 9.4
    },
    spotifyUrl: "https://open.spotify.com/album/1A2B3C4D5E6F7G8H9I0J",
    appleMusicUrl: "https://music.apple.com/us/album/1700000000",
    keyTracks: [
      { name: "Shibuya Lights", note: "Infectious Slap Bass" },
      { name: "Neon Boulevard", note: "Retro Brass Hook" }
    ]
  }
];
