# Cruise Ship Management System

A comprehensive web application for managing cruise ship operations, enabling voyagers to order services and staff to manage operations efficiently.

## Technologies
- Frontend: Vite, React, TypeScript
- UI: shadcn-ui, Tailwind CSS
- AI: GPT Engineer (for AI functionality)
- Database: Firebase
- Logging: JavaScript logging library

## System Modules

### 1. Voyager Features
- User authentication (login with unique ID/password)
- Order catering items (snacks, food, beverages)
- Order stationery items (gifts, chocolates, books)
- Book Resort-Movie tickets
- Book Beauty Salon appointments
- Book Fitness Center sessions
- Book Party Hall for events

### 2. Admin Features
- User management (voyager registration)
- Menu item management (add/edit/delete)
- System configuration

### 3. Manager Features
- View all bookings:
  - Resort-Movie tickets
  - Beauty Salon appointments
  - Fitness Center sessions
  - Party Hall reservations

### 4. Head-Cook Features
- View ordered catering items
- Manage food preparation and delivery

### 5. Supervisor Features
- View ordered stationery items
- Approve and manage deliveries

## Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Firebase account

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Prudvi337/cruise-ship-management
cd cruise-ship-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
- Create a Firebase project
- Add configuration to `.env` file

4. Start development server:
```bash
npm run dev
```

## Project Structure
```
src/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── services/         # API services and Firebase integration
├── stores/           # State management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and helpers
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## Testing Strategy
- Unit tests: Jest + React Testing Library
- Integration tests: Cypress
- Test cases cover:
  - User authentication flows
  - Order placement scenarios
  - Booking system functionality
  - Admin management features

## Logging Implementation
- Comprehensive logging for all actions:
  - User activities
  - Order processing
  - System events
- Log levels: info, warn, error
- Logs stored in Firebase for analysis


### Local Deployment
- Can be run locally for development/testing
- Requires Firebase emulator suite for full functionality

## Contribution Guidelines
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Optimization
- Code level:
  - Memoization for expensive computations
  - Lazy loading for components
- Architecture level:
  - Modular design for easy maintenance
  - Efficient state management
  - Optimized Firebase queries

## License
[MIT](https://choosealicense.com/licenses/mit/)
