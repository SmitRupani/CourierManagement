# CourierPro Frontend

Premium React Frontend for the Courier Management System.

## Features
- **Visuals**: Dark/Premium aesthetics with animations.
- **Pages**: Landing, Tracking, Dashboard, Authentication.
- **Tech**: React, Vite, Vanilla CSS (Variables/Themes), Lucide React (Icons).
- **Integration**: Fully integrated with standard Spring Boot Backend API.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Configuration
- The API URL is set to `http://localhost:8080/api/v1` in `src/services/api.js`.
- If your backend is running on a different port/host, update the `baseURL`.

## Notes
- Ensure the Backend is running (`docker compose up` in parent `Backend` folder) before logging in.
- Default Admin credentials (if seeded) or Register a new user to test.
