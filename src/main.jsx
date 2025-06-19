import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import Products from "./Products.jsx";
import Product from "./Product.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:productId",
    element: <Product />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ! for centralized/global stale time config
      staleTime: 10000,
    },
  },
});

//! Default Option to manipulate react query instance
//! Stale queries refetched on a few factors
//! 1. new instance of query mounts 2. window is refocused
//! 3. network reconnected 4. refetchInterval

//! We can set these values as per our requirement

//! Cache Time
//! stale time if set to infinity - garbage will be collected after 5 mins by default

//! retry and retryDelay -> fetch retry after failure, delay increases exponentially

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
