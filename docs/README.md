# Document Management System Documentation

Welcome to the Document Management System documentation. This system provides a responsive interface for managing and reordering documents with real-time autosave functionality.

## Notes for reviewer
- I am a frontend developer and have implemented Mock Service Worker for API calls.
- MSW is also loaded in production for testing purposes.
- While all CRUD endpoints are implemented, currently only GET and PUT are used in the frontend.
- Tests are not implemented as was not a requirement. Please let me know if you would like me to implement them.

## Core Features

### Document Management
- Drag-and-drop document reordering with @dnd-kit
- Automatic position recalculation
- Responsive grid layout (1 column mobile, 3 columns desktop)
- Image preview modal

### Autosave System
- Automatic saving with 5-second delay
- Visual status indicators:
  - Saving in progress (spinner)
  - Unsaved changes (yellow)
  - Last save time (green)
- Local storage persistence

### Image Handling
- Loading states for each image
- Thumbnail preview with loading spinners
- Full-size image modal viewer
- Cache-busting for image URLs

## Core Concepts

### Document Interface
```typescript
interface Document {
  type: string;      // Unique identifier
  title: string;     // Display name
  position: number;  // Order in grid
  thumbnail: string; // Image URL
}
```

### State Management
The application uses custom hooks for state management:
- `useApp`: Main application logic and document state
- `useAutosave`: Debounced saving functionality

### API Integration
- Mock API using MSW (Mock Service Worker)
- Consistent 2-second simulated delay
- Local storage persistence
- Automatic error handling and recovery

## Additional Documentation
- [Architecture Overview](./architecture.md)
- [API Documentation](./api.md)

## Getting Started

See the [Quick Start Guide](../README.md) for installation and setup instructions.
