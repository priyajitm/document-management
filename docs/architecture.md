# Architecture Overview

1. **Component Structure**
   - Modular components with clear responsibilities
   - Common components separated from feature-specific ones
   - Hooks for business logic and state management

2. **State Management**
   - Custom hooks for business logic:
     - `useApp`: Main application state and document management
     - `useAutosave`: Automatic saving with debounce (5s delay)
   - State includes:
     - Document loading states
     - Image loading states
     - Save status (saving/saved/has changes)
     - Modal state for image viewer

3. **API Layer**
   - Mock Service Worker (MSW) for API simulation
   - Consistent 2000ms artificial delay
   - Centralized error handling
   - Local storage persistence for mock database
   - Clean separation between API and UI
   - Typed responses and requests

4. **Data Flow**
   ```
   App
   ├── SaveStatus (autosave indicators)
   ├── CardList (DnD context)
   │   └── Card (sortable items)
   └── ImageViewer (modal)
   ```

5. **Key Features**
   - Drag-and-drop reordering (@dnd-kit/core)
   - Image loading states
   - Autosave with status indicators
   - Responsive grid layout (Tailwind CSS)
   - Image preview modal
