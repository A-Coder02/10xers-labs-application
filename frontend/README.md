# Online Store Frontend

This is the frontend web application for an **Online Store** that sells mobile phones.  
It is built using **React**, **Redux Toolkit**, **Tailwind CSS**, and **Vite**.

---

## Project Overview

This project is part of a FullStack Developer Technical Task to design a web application for an online store that sells mobile phones and manages products. The app includes:

- User Sign Up (Email, Password, Role: Admin or Customer)
- User Login and Logout
- Role-based Home Pages:
  - Customers can view all products.
  - Admins can manage products they have created (Create, Read, Update, Delete).
- Public product viewing without authentication.
- Admin-only product management functionality.
- Backend API integration with JWT-based authentication.
- Local database assumed PostgreSQL with RESTful API endpoints.

---

## Features

- User Authentication (Sign Up, Login, Logout) with role-based access
- Role-based UI for Customers and Admins
- Product listing with card layout and detailed view
- Admins can Create, Update, Delete their products
- Form validation with Formik and Yup
- Infinite scrolling on product list for performance
- Toast notifications for feedback
- JWT token management with role decoding
- Mobile-friendly web design (desktop-focused, no dedicated mobile app)
- Unit testing for components and API calls

---

## Tech Stack & Tools

### Frontend

- React 19
- Redux Toolkit + React-Redux
- React Router DOM v7 for routing
- Tailwind CSS for styling
- Formik + Yup for forms and validation
- Axios for API communication
- JWT Decode for handling tokens
- Jest & React Testing Library for testing
- Vite for fast dev server and bundling

### Backend (Assumed)

- Node.js with Express
- PostgreSQL relational database
- JWT-based authentication and role authorization
- RESTful API design with Swagger documentation

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Running backend API (see backend README for setup)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/online-store-frontend.git
   cd online-store-frontend
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root (optional) to configure environment variables

   Example `.env`:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser at

   ```
   http://localhost:5173
   ```

---

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Starts the dev server (Vite)         |
| `npm run build`   | Builds the app for production        |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint on source files           |
| `npm run test`    | Run unit tests with Jest             |

---

## Testing

Unit tests are written using Jest and React Testing Library.

To run tests:

```bash
npm run test
```

## Project Structure

src/
├── assets/ # Static assets like images, fonts, icons
├── components/ # Reusable React components
├── pages/ # Page components mapped to routes
├── hooks/ # Custom React hooks
├── services/ # API calls and external service integrations
├── store/ # Redux Toolkit slices and store setup
├── tests/ # Unit and integration tests
├── utils/ # Utility functions and helpers

## Notes

- The frontend communicates with a backend API for authentication and product management.
- Authentication state is managed using JWT tokens stored in `localStorage`.
- Only users with the role **"admin"** can create, update, or delete products.
- Customers can browse products without authentication.
- Toast notifications inform users of success and error messages.
- The UI adapts based on user roles (admin vs customer).
- Form validation and error handling are done with Formik and Yup.
- Infinite scroll improves product list performance and user experience.
- React Router DOM manages routing and navigation.
- Tailwind CSS is used for rapid styling and responsiveness.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## Contact

Created by **[Your Name]** – feel free to reach out!

- Email: arbaj897ansari@gmail.com
- GitHub: [your-github-username](https://github.com/A-Coder02)
- LinkedIn: [your-linkedin-profile](arbaj Ansari | LinkedIn)

---

## Demo Video

Watch the demo video explaining the app features and usage here:  
[![Watch Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg)](https://www.loom.com/share/your-demo-link)

Or visit directly:  
[https://www.loom.com/share/your-demo-link](https://www.loom.com/share/your-demo-link)
