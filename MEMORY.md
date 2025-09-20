# Aviation Mission Management System - Technical Memory

## System Overview

**Type**: Full-stack web application for managing general aviation training missions
**Architecture**: Clojure backend + ClojureScript/Reagent frontend, containerized with Docker
**Purpose**: Help pilots discover, plan, and track aviation training missions across different skill levels

## Technology Stack

### Backend (Clojure)
- **Framework**: Ring + Compojure for HTTP routing
- **Database**: H2 embedded database (file-based, production-ready)
- **API**: RESTful JSON API with full OpenAPI/Swagger documentation
- **Authentication**: Session-based admin authentication with bearer tokens
- **Dependencies**: 
  - `ring/ring-core` & `ring/ring-jetty-adapter` for web server
  - `compojure` for routing
  - `cheshire` for JSON handling
  - `org.clojure/java.jdbc` for database operations
  - `honeysql` for SQL query building
  - `ring-cors` for CORS handling
  - `clj-time` for timestamp management
  - `metosin/ring-swagger` for API documentation

### Frontend (ClojureScript/Reagent)
- **Framework**: Reagent (ClojureScript React wrapper)
- **Build Tool**: Shadow-CLJS for compilation and development
- **HTTP Client**: `cljs-http` for API communication
- **State Management**: Single Reagent atom for global state
- **UI Pattern**: Component-based architecture with modal dialogs
- **Styling**: Custom CSS with modern card-based layouts

### Infrastructure
- **Containerization**: Multi-stage Docker build with optimized caching
- **Deployment**: Supports Railway, Heroku, AWS ECS, Google Cloud Run, Kubernetes
- **Database Persistence**: H2 database files mounted as Docker volumes
- **Port Configuration**: Flexible port binding (PORT/API_PORT environment variables)

## Application Features

### Core Functionality
1. **Mission Catalog**: Browse aviation training missions with filtering by category, difficulty, experience level
2. **Mission Details**: Comprehensive mission information including objectives, procedures, routes, and challenge analysis
3. **Pagination**: Grid-based mission cards with page navigation (8 missions per page)
4. **Challenge Analysis**: Intelligent detection of flight challenges (mountain flying, complex airspace, high DA, etc.)

### User Features
- **Mission Browsing**: Card-based layout with hover effects and scrolling
- **Mission Details**: Full mission briefing page with statistics and metadata
- **Comments & Reviews**: Community feedback system
- **Completion Tracking**: Mark missions as completed with notes

### Admin Features
- **Admin Panel**: Comprehensive management interface
- **Mission Management**: Create, edit, delete missions
- **Import/Export**: JSON-based mission database backup/restore
- **Submission Review**: Approve/reject community-submitted missions
- **System Statistics**: Mission counts, categories, difficulty analysis
- **Authentication**: Session-based login with localStorage persistence

### UI/UX Features
- **Floating Action Button (FAB)**: Create new missions via modal popup
- **Responsive Design**: Works on desktop and mobile devices
- **Modal Dialogs**: Clean popup interfaces for forms
- **Navigation**: Tab-based navigation with admin access control
- **Loading States**: User feedback during API operations

## Database Schema

### Core Tables
1. **missions**: Primary mission data with metadata
2. **comments**: User comments on missions
3. **mission_ratings**: Thumbs up/down ratings
4. **reviews**: Detailed mission reviews with flight dates
5. **mission_completions**: Completion tracking with pilot notes
6. **submissions**: Community-submitted missions pending approval
7. **mission_updates**: Proposed mission edits pending approval
8. **admin_sessions**: Admin authentication session management

### Key Relationships
- One-to-many: missions → comments, ratings, reviews, completions
- Foreign key constraints with cascade delete for data integrity
- Unique constraints on pilot ratings (one rating per pilot per mission)

## API Architecture

### RESTful Endpoints
- **GET /missions**: List missions with filtering (category, difficulty, experience)
- **GET /missions/:id**: Individual mission details
- **POST /missions**: Create mission (admin) or submit for approval (user)
- **PUT /missions/:id**: Update mission (admin) or submit update for approval
- **DELETE /missions/:id**: Delete mission (admin only)

### Interaction Endpoints
- **Comments**: GET/POST `/missions/:id/comments`
- **Reviews**: GET/POST `/missions/:id/reviews` 
- **Ratings**: GET/POST `/missions/:id/rating/:pilot_name`
- **Completions**: GET/POST `/missions/:id/completed`

### Admin Endpoints
- **Authentication**: POST `/admin/login`, GET `/admin/status`
- **Submissions**: GET `/submissions`, PUT `/submissions/:id/approve|reject`
- **Updates**: GET `/updates`, PUT `/updates/:id/approve|reject`
- **Import/Export**: GET `/missions/export`, POST `/missions/import`

### Documentation
- **Swagger Spec**: GET `/swagger.json`
- **Interactive Docs**: Available at `/docs/` (when implemented)

## File Structure Analysis

### Backend Files (`backend/src/aviation_missions/`)
1. **core.clj**: Main application entry point, routing, middleware configuration
2. **db.clj**: Database operations, schema management, CRUD functions
3. **handlers.clj**: HTTP request handlers, validation, error handling
4. **mission_parser.clj**: Parse missions.txt file for database seeding
5. **swagger.clj**: OpenAPI specification definition

### Frontend Files (`frontend/src/cljs/aviation_missions/`)
1. **core.cljs**: Main application component, state management, UI components
2. **config.cljs**: Environment configuration (debug mode, API URLs)

### Configuration Files
1. **project.clj**: Clojure backend dependencies and build configuration
2. **shadow-cljs.edn**: ClojureScript build configuration
3. **package.json**: Node.js dependencies for frontend build
4. **Dockerfile**: Multi-stage container build with optimized caching
5. **docker-compose.yml**: Local development and deployment configuration

## State Management

### Global State Structure (ClojureScript)
```clojure
{:current-page :missions                    ; Current page (:missions, :mission-details, :admin)
 :missions []                              ; Array of mission objects
 :selected-mission-id nil                  ; Currently selected mission ID
 :mission-details nil                      ; Detailed mission data for details page
 :loading false                           ; Loading state for missions list
 :mission-details-loading false           ; Loading state for mission details
 :page-number 1                           ; Current page number for pagination
 :missions-per-page 8                     ; Number of missions per page
 :create-dialog-open false                ; Create mission modal state
 :login-dialog-open false                 ; Admin login modal state
 :admin-authenticated false               ; Admin authentication status
 :admin-token nil                         ; Admin session token
 :admin-name nil                          ; Admin username
 :submissions []                          ; Pending mission submissions (admin)
 :pending-updates []                      ; Pending mission updates (admin)
 :edit-mission-id nil                     ; Mission being edited
 :edit-dialog-open false                  ; Edit mission modal state
 :new-mission {...}                       ; Form data for new mission
 :login-credentials {...}}                ; Login form data
```

## Component Architecture

### Page Components
1. **missions-page**: Main mission grid with pagination and FAB
2. **mission-details-page**: Detailed mission view with sidebar
3. **admin-panel**: Admin dashboard with management tools

### UI Components
1. **mission-card**: Individual mission card with challenge analysis
2. **page-navigation**: Pagination controls
3. **create-mission-dialog**: Modal for creating new missions
4. **admin-login-dialog**: Modal for admin authentication
5. **edit-mission-dialog**: Modal for editing existing missions
6. **navigation**: Tab-based navigation bar

### Utility Components
1. **challenges-table**: Display flight challenges as icons and labels

## Business Logic

### Mission Categories (Auto-detected)
- **Airspace Operations**: Class B/C operations, complex airspace
- **Terrain & Environment**: Mountain flying, island operations
- **Weather & Atmospheric**: Marine layer, density altitude, convective weather
- **Navigation & Diversions**: Dead reckoning, diversion practice
- **Airport Operations**: Complex airports, runway operations
- **Endurance & Planning**: Long cross-country flights
- **Advanced Adventures**: Extreme conditions, challenging destinations

### Challenge Detection System
Intelligent analysis of mission text to identify:
- **Short Runway**: Airports with limited runway length
- **High Density Altitude**: Mountain airports, hot weather operations
- **Mountain Flying**: Terrain challenges, valley operations
- **Complex Airspace**: Class B/C operations, MOAs
- **Soft Field**: Grass strips, unpaved runways
- **Obstacles**: Terrain, power lines, challenging approaches
- **Time Restrictions**: Peak hour operations, scheduling constraints

### Difficulty Scaling (1-9)
- **1-2**: EASY - Basic operations, familiar airports
- **3-5**: HARD - Challenging conditions, new airports
- **6-9**: EXPERT - Extreme conditions, complex operations

### Experience Levels
- **STUDENT**: Beginner (< 100 hours)
- **PRIVATE**: Intermediate (100-1000 hours)  
- **COMMERCIAL**: Advanced (1000+ hours)

## Authentication & Authorization

### Admin Authentication
- **Login**: Username/password (demo: admin/aviation123)
- **Session Management**: JWT-like tokens with 8-hour expiration
- **Persistence**: Tokens stored in localStorage for session restoration
- **Authorization**: Bearer token in Authorization header

### Permission Levels
- **Public**: View missions, add comments/reviews, submit missions
- **Admin**: All public permissions + create/edit/delete missions, approve submissions, access admin panel

## Data Flow

### Mission Loading
1. App initialization → check admin status → fetch missions
2. API call to `/missions` → populate global state
3. Render mission cards with pagination

### Mission Details
1. Click "BRIEF" button → fetch mission details
2. API call to `/missions/:id` → load detailed data
3. Navigate to mission details page with sidebar

### Admin Operations
1. Login via modal → store token → enable admin features
2. Admin panel access → fetch submissions and updates
3. CRUD operations → API calls with authorization headers

### Import/Export
1. Export: Client-side JSON generation and file download
2. Import: File reader → JSON parsing → state update

## Known Issues & Technical Debt

### Current Syntax Errors
1. **frontend/src/cljs/aviation_missions/core.cljs**: Unmatched bracket delimiters in mission-details-page function
   - Error location: Line 738, column 33
   - Issue: Complex nested UI components with mismatched closing brackets
   - Impact: Prevents frontend compilation and application startup

### Code Quality Issues
1. **Large Functions**: mission-details-page function is ~150 lines (should be broken into smaller components)
2. **Bracket Complexity**: Deep nesting makes maintenance difficult
3. **Missing Error Handling**: Some API calls lack proper error handling
4. **Hardcoded Values**: Admin credentials hardcoded (acceptable for demo)

### Performance Considerations
1. **Docker Caching**: Implemented multi-stage builds with dependency caching
2. **Bundle Size**: ClojureScript compilation with :simple optimizations
3. **API Efficiency**: Single API call loads all missions (acceptable for current scale)

## Development Workflow

### Local Development
1. **Backend**: `lein ring server-headless 3000`
2. **Frontend**: `shadow-cljs watch app` (development server on 8280)
3. **Full Stack**: `make start` (Docker Compose)

### Build Process
1. **Frontend Build**: Shadow-CLJS compiles ClojureScript → JavaScript
2. **Backend Build**: Leiningen creates uberjar with all dependencies
3. **Container Build**: Multi-stage Docker build with frontend assets copied to backend resources

### Deployment
1. **Railway**: Automatic deployment with nixpacks.toml configuration
2. **Docker**: Single container with embedded web server
3. **Environment Variables**: PORT, API_PORT for flexible deployment

## Future Enhancement Opportunities

### Technical Improvements
1. **Component Refactoring**: Break large functions into smaller, reusable components
2. **Type Safety**: Add clojure.spec validation for better error handling
3. **Testing**: Expand test coverage for both backend and frontend
4. **Performance**: Implement mission search/filtering on backend
5. **Database**: Consider PostgreSQL for production scalability

### Feature Enhancements
1. **User Accounts**: Full user registration and profile management
2. **Flight Logging**: Integration with pilot logbooks
3. **Weather Integration**: Real-time weather data for mission planning
4. **Mobile App**: React Native or mobile-optimized PWA
5. **Social Features**: Pilot networking, mission sharing
6. **Analytics**: Mission completion analytics, difficulty trends

### UI/UX Improvements
1. **Accessibility**: ARIA labels, keyboard navigation
2. **Dark Mode**: Theme switching capability
3. **Offline Support**: Service worker for offline mission viewing
4. **Print Optimization**: Proper mission brief printing
5. **Map Integration**: Interactive route visualization

## Mission Data Format

### Core Mission Structure
```clojure
{:id 1
 :title "Class B Ops: LAX Bravo Transition"
 :category "Airspace Operations"
 :difficulty 7
 :objective "Master Class B communication, clearances, and situational awareness"
 :mission_description "Fly down the California coast, request Coastal Route..."
 :why_description "Learn to fit GA ops into airline-dense airspace..."
 :notes "Study LAX VFR charts. Have alternates..."
 :route "KPAO → coastal route south → LAX Bravo → KTOA/KSMO"
 :suggested_route "KPAO KWVI KHHR KTOA"
 :pilot_experience "Intermediate (100 - 1000 hours)"
 :created_at "2024-01-01T00:00:00Z"
 :updated_at "2024-01-01T00:00:00Z"
 :comment_count 5
 :completion_count 12
 :thumbs_up 8
 :thumbs_down 1}
```

### Mission Categories
1. **Airspace Operations**: Class B/C, complex airspace navigation
2. **Terrain & Environment**: Mountain flying, island operations
3. **Weather & Atmospheric**: Marine layer, density altitude challenges
4. **Navigation & Diversions**: Dead reckoning, emergency diversions
5. **Airport Operations**: Complex airports, runway challenges
6. **Endurance & Planning**: Long cross-country flights
7. **Advanced Adventures**: Extreme conditions, expert-level challenges

## Critical Implementation Notes

### ClojureScript Syntax Rules
- **Vectors**: `[]` for UI components, data structures
- **Lists**: `()` for function calls, special forms
- **Maps**: `{}` for configuration, data objects
- **Nesting**: Must match exactly, deep nesting requires careful bracket counting
- **Functions**: `(defn name [args] body)` structure must be complete

### Reagent Component Patterns
```clojure
;; Simple component
(defn component-name []
  [:div "content"])

;; Component with state
(defn stateful-component []
  (let [state @app-state]
    [:div (:some-value state)]))

;; Component with event handlers
(defn interactive-component []
  [:button {:on-click #(swap! app-state update :counter inc)}
   "Click me"])
```

### Common Bracket Patterns
```clojure
;; Modal structure
[:div.modal
 [:div.modal-backdrop]
 [:div.modal-content
  [:div.modal-header]
  [:div.modal-body]
  [:div.modal-footer]]]

;; Form structure
[:div.form-group
 [:label "Label"]
 [:input {:type "text" :value value :on-change handler}]]

;; Conditional rendering
(when condition
  [:div "conditional content"])
```

## Deployment Configuration

### Railway Deployment
- **railway.toml**: Specifies Docker build, health checks, environment variables
- **nixpacks.toml**: Prevents buildpack conflicts, forces Docker usage
- **Environment**: PORT=3000, API_PORT=3000 for Railway compatibility

### Docker Configuration
- **Multi-stage Build**: Base → Frontend Build → Backend Build → Production
- **Caching Strategy**: Copy package files first, then source code
- **Health Checks**: `/health` endpoint for container orchestration
- **Port Binding**: Flexible port configuration via environment variables

### Mission Data Seeding
- **Source**: missions.txt file with structured mission descriptions
- **Parser**: aviation-missions.mission-parser namespace
- **Auto-seeding**: Database seeded on first startup if empty
- **Format**: Human-readable text format with structured parsing

## Troubleshooting Guide

### Common Build Issues
1. **Bracket Syntax Errors**: Use careful bracket counting, break large functions into smaller ones
2. **Dependency Conflicts**: Check shadow-cljs.edn and project.clj for version conflicts
3. **Container Build Failures**: Check .dockerignore, ensure all required files are copied
4. **Port Conflicts**: Verify PORT and API_PORT environment variables

### Development Tips
1. **REPL-Driven Development**: Use Shadow-CLJS REPL for interactive development
2. **Hot Reloading**: Frontend changes reflect immediately in development mode
3. **Database Inspection**: H2 console available for database debugging
4. **Logging**: Use js/console.log for frontend, clojure.tools.logging for backend

## Security Considerations

### Current Security Model
- **Admin Authentication**: Simple username/password (demo purposes)
- **Session Management**: Token-based with expiration
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Basic validation on mission data

### Production Security Recommendations
1. **Authentication**: Implement proper OAuth/JWT authentication
2. **Password Security**: Hash passwords, enforce strong password policies
3. **HTTPS**: Force HTTPS in production environments
4. **Input Sanitization**: Validate and sanitize all user inputs
5. **Rate Limiting**: Implement API rate limiting
6. **Session Security**: Secure session storage, CSRF protection

## Performance Optimization

### Current Optimizations
1. **Docker Layer Caching**: Dependencies cached separately from source code
2. **ClojureScript Compilation**: :simple optimizations for production builds
3. **Database Queries**: Efficient joins for mission statistics
4. **Static Assets**: Served directly by Ring

### Future Optimizations
1. **Database Indexing**: Add indexes on frequently queried columns
2. **API Pagination**: Server-side pagination for large mission lists
3. **Caching**: Redis or in-memory caching for frequently accessed data
4. **CDN**: Static asset delivery via CDN
5. **Bundle Splitting**: Code splitting for faster initial loads

This document serves as a comprehensive guide for understanding, maintaining, and extending the Aviation Mission Management System.
