# X-Shop

## 1. Project Overview

**X-Shop** is a modern e-commerce application built as a **production-style project**. It covers a full shopping experience: browsing a product catalog, filtering, sorting, pagination, product detail page, cart, user authentication, and checkout.

The app was developed as a portfolio project to demonstrate skills in handling production-level tasks found in real commercial projects: working with APIs, managing server state, handling user sessions, cart synchronization, and maintainable code architecture.

The Supabase database includes the following tables: `products`, `categories`, `brands`, `carts`, `cart_items`, `orders` — with configured relationships and Row Level Security to protect user data.

**Live Demo:** [https://x-shop-dusky.vercel.app/](https://x-shop-dusky.vercel.app/)

### Features

- Product catalog with filtering by category, brand, and price
- Sorting by price, popularity, and newest
- Pagination with data fetched from the API
- Filters, sorting, and pagination synced with URL parameters
- Product search with dropdown suggestions
- Product detail page
- Authentication: sign up, sign in, sign out, and session handling
- Guest cart stored in `localStorage`
- Authenticated user cart stored in Supabase
- Guest cart merged with user cart after sign in
- Checkout with delivery form, payment method selection, and order creation
- Responsive layout for mobile, tablet, and desktop
- Handling of `loading`, `error`, and empty data states

---

## 2. Tech Stack

| Area               | Technologies                         |
| ------------------ | ------------------------------------ |
| Frontend           | React, TypeScript                    |
| Routing            | React Router                         |
| Styling            | SCSS Modules, Sass                   |
| Backend / Database | Supabase                             |
| API                | Supabase REST API, axios             |
| Server state       | TanStack Query                       |
| Forms              | React Hook Form                      |
| App state          | Context API, Custom Hooks            |
| Architecture       | Feature-based / layered architecture |
| Build tool         | Create React App, CRACO              |
| Deploy             | Vercel                               |

### Project Architecture

The project is divided into layers to keep the code maintainable, scalable, and easy to read:

```bash
src/
├── app/              # App configuration, providers, routing, global styles
├── pages/            # Application pages
├── features/         # Domain modules: auth, products, cart, checkout
├── shared/           # Shared components, hooks, API helpers, and utilities
└── types/            # Global TypeScript types: data models, API responses, shared interfaces
```

Import rule:

```bash
pages → features → shared
```

`pages` handle screens, `features` handle the logic of specific functionalities, and `shared` contains reusable elements and utilities.

---

## 3. Libraries

| Library                 | Purpose                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| `typescript`            | Typing data, props, API responses, and application logic.                                  |
| `react-router-dom`      | App routing, page navigation, and URL parameter handling.                                  |
| `@tanstack/react-query` | Fetching server data, caching, handling loading/error states, and pagination.              |
| `@supabase/supabase-js` | Supabase integration: authentication, user session, and database operations.               |
| `axios`                 | HTTP requests to the Supabase REST API.                                                    |
| `react-hook-form`       | Managing login, registration, and checkout forms.                                          |
| `react-toastify`        | Displaying notifications to the user, e.g. on success or error.                            |
| `react-slick`           | Sliders and carousels in the UI.                                                           |
| `classnames`            | Convenient conditional CSS class merging in components.                                    |
| `sass`                  | SCSS and SCSS Modules support.                                                             |
| `@craco/craco`          | Overriding Create React App configuration, e.g. setting up `@` alias for the `src` folder. |

---

## 4. Key Technical Decisions

- Filters are synced with URL parameters — so the page is shareable and state is preserved on reload.
- TanStack Query is used for server state — instead of manual request management with useState + useEffect. This provides caching, deduplication of requests, loading/error state control, and convenient refetching.
- The guest cart is stored in `localStorage`, the authenticated user's cart — in Supabase. After sign in, the guest cart is merged with the server cart.
- Feature-based architecture: `pages → features → shared`. This prevents circular dependencies and makes the project easier to scale.

---

## 5. Running Locally

The project is available as a **Live Demo**. Below are instructions for running it locally.

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/OlegGania/x-shop.git
cd x-shop
npm install
```

### 2. How to get Supabase keys

To run locally you need Supabase credentials:

1. Create a project at [supabase.com](https://supabase.com)
2. Copy the **Project URL** and **anon public key** (Settings → API)
3. Paste them into the `.env` file

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit the `.env` file and add your Supabase keys:

```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Start the app

```bash
npm start
```

The app will be available at `http://localhost:3000/`
