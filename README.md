# MovieHub - Modern Movie Browsing Application

A feature-rich movie browsing application built with React, TypeScript, and the TMDB API. Browse popular movies, search for your favorites, view detailed information, and discover new films.

## Features

- Responsive movie grid with filtering and infinite scroll
- Comprehensive movie details with trailers and cast information
- Advanced search with debouncing
- Category, Genre, year, and rating filtering
- Related movie recommendations
- Modern, cinema-inspired design

## Tech Stack

- React 18+ with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- React Router for navigation
- Axios for API requests
- Custom hooks for data fetching and UI logic

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```
4. Start the development server: `npm run dev`

## Project Structure

The project follows Atomic Design principles:

- `atoms/`: Basic UI components (Button, Rating, Badge, etc.)
- `molecules/`: Combinations of atoms (MovieCard, SearchBar, etc.)
- `organisms/`: Complex components (MovieGrid, Header, Footer, etc.)
- `pages/`: Full page components
- `hooks/`: Custom React hooks
- `services/`: API service functions
- `types/`: TypeScript interfaces and types

## API Usage

This project uses the TMDB API for movie data. You'll need to register for an API key at [themoviedb.org](https://www.themoviedb.org/documentation/api).

## Hosted Deployment

You can access the live version of MovieHub at [movie-hub.iqbal-devs.xyz](https://movie-hub.iqbal-devs.xyz).

## License

MIT