import type { Movie } from "../interfaces/Movie";
import type { Theater } from "../interfaces/Theater";

export const MOCK_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    rating: 8.9,
    year: "2024",
    genre: ["Sci-Fi", "Adventure"],
    duration: "2h 46m",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    type: "movie",
    status: "Now Showing",
  },
  {
    id: 2,
    title: "Oppenheimer",
    rating: 9.1,
    year: "2023",
    genre: ["Drama", "History"],
    duration: "3h 00m",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR5k5k6.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    type: "movie",
  },
  {
    id: 3,
    title: "House of the Dragon",
    rating: 8.8,
    year: "2024",
    genre: ["Fantasy", "Drama"],
    duration: "1h 00m",
    image: "https://image.tmdb.org/t/p/w500/t9XkeE7HzOsdQcDDDapDYh8fEDF.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    type: "series",
    status: "S2 • E4 Aired Today",
  },
  {
    id: 4,
    title: "The Bear",
    rating: 8.7,
    year: "2024",
    genre: ["Comedy", "Drama"],
    duration: "35m",
    image: "https://image.tmdb.org/t/p/w500/g8tFvZsq2eM9j8P4kZ8k8q8q8q8.jpg", // Placeholder logic
    backdrop:
      "https://image.tmdb.org/t/p/original/nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg", // Placeholder
    type: "series",
    status: "S3 • Full Season Out",
  },
  {
    id: 5,
    title: "Civil War",
    rating: 7.6,
    year: "2024",
    genre: ["Action", "Thriller"],
    duration: "1h 49m",
    image: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9AdeGSxwo2k8GL.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s5mq0jUZ1sXD7T0qV7T0qV7T0qV.jpg", // Placeholder
    type: "movie",
  },
  {
    id: 6,
    title: "Godzilla Minus One",
    rating: 8.4,
    year: "2023",
    genre: ["Sci-Fi", "Action"],
    duration: "2h 05m",
    image: "https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/bWIIWhnaoWx3FTVXv6GkYDv3djL.jpg",
    type: "movie",
  },
];

export const THEATERS: Theater[] = [
  {
    id: 1,
    name: "AMC Metreon 16",
    address: "Downtown • 0.8 mi",
    distance: "0.8 mi",
    rating: 4.8,
    features: ["IMAX", "Dolby"],
    coords: { x: 60, y: 40 },
    times: [
      { time: "15:30", type: "imax", status: "selling-fast" },
      { time: "16:45", type: "standard", status: "available" },
      { time: "19:00", type: "dolby", status: "available" },
    ],
  },
  {
    id: 2,
    name: "Alamo Drafthouse",
    address: "Mission District • 1.2 mi",
    distance: "1.2 mi",
    rating: 4.5,
    features: ["Dine-In", "4K"],
    coords: { x: 45, y: 55 },
    times: [
      { time: "14:15", type: "standard", status: "available" },
      { time: "17:30", type: "standard", status: "available" },
      { time: "20:45", type: "standard", status: "selling-fast" },
    ],
  },
  {
    id: 3,
    name: "Regal Stonestown",
    address: "Lakeside • 4.5 mi",
    distance: "4.5 mi",
    rating: 4.2,
    features: ["RPX", "Recliner"],
    coords: { x: 20, y: 80 },
    times: [
      { time: "13:00", type: "rpx", status: "available" },
      { time: "16:15", type: "standard", status: "available" },
    ],
  },
  {
    id: 4,
    name: "Roxie Theater",
    address: "Mission • 1.5 mi",
    distance: "1.5 mi",
    rating: 4.9,
    features: ["Historic", "35mm"],
    coords: { x: 50, y: 60 },
    times: [], // Sold out example
  },
];

export const CAST = [
  {
    name: "Timothée Chalamet",
    role: "Paul Atreides",
    img: "https://image.tmdb.org/t/p/w200/BE2sdjpgEHrT5l8lIiE3ozJG7k.jpg",
  },
  {
    name: "Zendaya",
    role: "Chani",
    img: "https://image.tmdb.org/t/p/w200/cbCibOAF69amDp1F8j04D01jYJz.jpg",
  },
  {
    name: "Austin Butler",
    role: "Feyd-Rautha",
    img: "https://image.tmdb.org/t/p/w200/2gPjLylvP93jR1R5yJ4C9j9yj8.jpg",
  },
  {
    name: "Florence Pugh",
    role: "Princess Irulan",
    img: "https://image.tmdb.org/t/p/w200/fhEsn35uAwUZy37RKpL9H.jpg",
  },
  {
    name: "Josh Brolin",
    role: "Gurney Halleck",
    img: "https://image.tmdb.org/t/p/w200/sX2etBbIkxRaCsATxw5Z.jpg",
  },
];
