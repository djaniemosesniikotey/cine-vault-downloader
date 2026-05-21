# Movie App (OnStream Style) Implementation Plan

Building a movie discovery and "download" simulation app inspired by OnStream. This app will feature movie listings (old and new), search functionality, and a download simulation that stores "downloaded" movie metadata in local storage.

## Scope Summary
- **Movie Discovery**: Fetch and display movie listings using a public API (TMDB).
- **Categories**: Sections for "Trending", "New Releases", and "Classic Movies".
- **Movie Details**: Modal or page showing overview, rating, release date, and poster.
- **Search**: Functional search bar to find specific movies.
- **"Download" Simulation**: A button that "downloads" the movie by saving its metadata to `localStorage` and provides a "Downloads" view.
- **UI/UX**: Dark-themed, mobile-responsive layout similar to streaming platforms.

## Non-Goals
- **Real Video Hosting/Streaming**: This app will not host actual copyrighted video files or provide real streaming due to legal and technical constraints in this environment. It will simulate the interface and provide trailers where possible (via YouTube embeds).
- **User Accounts/Auth**: No server-side persistence or authentication.
- **Actual File Downloads**: The "Download" button will simulate the process and save metadata to the browser's local storage rather than downloading a multi-gigabyte video file to the disk.

## Assumptions & Open Questions
- **API Key**: We will use the TMDB API. A mock or public key might be needed if one isn't provided (using a common public testing key or simulating data if necessary).
- **Persistence**: All user data (downloads, favorites) will be strictly `localStorage` based.

## Affected Areas
- **Frontend**: React-based UI with Tailwind CSS.
- **State Management**: React Hooks (useState, useEffect) + `localStorage` for downloads.
- **Routing**: `react-router-dom` for Home, Search, and Downloads views.

## Implementation Phases

### Phase 1: Foundation & Setup
- Initialize project structure.
- Install dependencies: `lucide-react`, `react-router-dom`, `clsx`, `tailwind-merge`.
- Set up basic theme (Dark mode by default).
- **Owner**: `frontend_engineer`

### Phase 2: API Integration & Data Fetching
- Implement TMDB API service layer.
- Fetch "Trending", "Now Playing" (New), and "Top Rated" (Old) movies.
- Implement search functionality.
- **Owner**: `frontend_engineer`

### Phase 3: Core UI Components
- **Navbar**: Search bar and links to Home/Downloads.
- **Movie Card**: Poster, Title, and Year.
- **Movie Grid**: Responsive layout for movie lists.
- **Movie Detail Modal/Page**: Detailed info + "Download" and "Play Trailer" buttons.
- **Owner**: `frontend_engineer`

### Phase 4: Download Logic & Persistence
- Implement `useLocalStorage` hook.
- Create "Downloads" page to list saved movies.
- Implement "Download" action:
    - Simulate progress bar.
    - Save movie object to `localStorage`.
    - Provide "Delete" from downloads.
- **Owner**: `frontend_engineer`

### Phase 5: Refinement & Mobile Optimization
- Ensure touch-friendly interface.
- Add skeleton loaders for better UX during API calls.
- Final CSS polish to match "OnStream" aesthetic.
- **Owner**: `quick_fix_engineer`

## Sequencing Constraints
- Phase 2 (API) must be completed before Phase 3 (UI) can be fully functional.
- Phase 3 must be done before Phase 4 (Download logic).
