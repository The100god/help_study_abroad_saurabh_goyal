# Next.js Admin Dashboard Assessment

A modern, responsive admin dashboard built to assess proficiency in **Next.js (App Router)**, **TypeScript**, **Material UI**, and **Zustand**. The application integrates with the [DummyJSON API](https://dummyjson.com/) to manage users and products.

## 🚀 Features

* **Authentication:** Secure login using `NextAuth.js` with JWT session handling.
* **Protected Routes:** Dashboard access is restricted to authenticated users.
* **Users Management:** Server-side pagination, real-time search (debounced), and detailed profile views.
* **Products Management:** Grid layout, category filtering, and image carousels.
* **State Management:** Global state handled via `Zustand`.
* **Performance:** Client-side caching, search debouncing, and optimized MUI rendering.
* **Responsive UI:** Fully responsive Sidebar, Tables, and Grids using Material UI.

## 🛠️ Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **UI Library:** Material UI (MUI v5/v6)
* **State Management:** Zustand
* **Auth:** NextAuth.js
* **HTTP Client:** Axios

---

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd mui-zustand-assessment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_random_secret_string_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000).

---

## 🔑 Login Credentials

The application connects to the real `dummyjson.com/auth/login` endpoint. You must use valid credentials from their database.

* **Username:** `kminchelle`
* **Password:** `0lelplR`

---

## 🧠 Architectural Decisions

### Why Zustand?
Zustand was chosen over Redux or Context API for the following reasons:
1.  **Simplicity & Boilerplate:** It requires zero boilerplate code (no reducers, no providers wrapping the app).
2.  **Performance:** It solves the "zombie child" problem and unnecessary re-renders automatically. Components only re-render when the specific slice of state they select changes.
3.  **Async Actions:** Unlike Redux (which needs Thunk/Saga), Zustand handles async API calls natively within the store actions.
4.  **Bundle Size:** It is extremely lightweight (~1kB).

### Optimization & Caching Strategy
To ensure a snappy user experience and reduce load on the API, a **Client-Side Caching Strategy** was implemented within the `useDataStore`.

* **Logic:** When fetching Users or Products, we generate a unique `cacheKey` based on the current query parameters (e.g., `users-limit10-skip0-searchJohn`).
* **Behavior:** Before making an API request, the store checks if this key exists in the `userCache` object.
    * **Hit:** Data is served instantly from memory (0ms latency).
    * **Miss:** API call is made, and the result is stored in the cache for future requests.
* **Benefit:** Navigating back and forth between pagination pages or viewing details and returning to the list is instant.

### UI Optimization
* **Debouncing:** The search input in the Users list utilizes a `setTimeout` hook to wait **500ms** after the user stops typing before triggering the API call / State update. This prevents flooding the backend with requests on every keystroke.
* **MUI Grid2:** Used the modern `Unstable_Grid2` components for better CSS Flexbox performance and simplified props API.

---

## 📂 Project Structure

```bash
/app
  /api/auth       # NextAuth configuration
  /dashboard      # Protected routes (Layout includes Sidebar)
    /users        # List and Detail pages for Users
    /products     # List and Detail pages for Products
  /login          # Public Login page
  layout.tsx      # Root layout (MUI Registry & SessionProvider)
/components
  /ui             # Reusable UI components
  ThemeRegistry   # MUI + Next.js App Router integration
/store
  useDataStore.ts # Zustand store for Data & Caching
/types
  index.ts        # TypeScript interfaces