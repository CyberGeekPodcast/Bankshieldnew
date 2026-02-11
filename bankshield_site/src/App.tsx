import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Toaster, toast } from "sonner";
import { api } from "../convex/_generated/api";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { BlogPage } from "./pages/BlogPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import { ReviewPage } from "./pages/ReviewPage";
import { CasesPage } from "./pages/CasesPage";

type Page =
  | "home"
  | "products"
  | "blog"
  | "login"
  | "dashboard"
  | "cases"
  | "admin"
  | "review";

type Role = "user" | "reviewer" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const loggedInUser = useQuery(api.auth.loggedInUser);
  const profile = useQuery(api.userProfiles.myProfile);
  const ensureMyProfile = useMutation(api.userProfiles.ensureMyProfile);

  const role: Role = (profile?.role as Role) ?? "user";

  const protectedPages = useMemo(() => new Set<Page>(["dashboard", "cases", "admin", "review"]), []);
  const canReview = role === "reviewer" || role === "admin";

  useEffect(() => {
    if (loggedInUser) {
      void ensureMyProfile();
    }
  }, [loggedInUser, ensureMyProfile]);

  // If auth state changes while on a protected page, kick to login.
  useEffect(() => {
    if (loggedInUser === null && protectedPages.has(currentPage)) {
      setCurrentPage("login");
    }
  }, [loggedInUser, currentPage, protectedPages]);

  // After a successful login, if user is on the login page, route to dashboard.
  useEffect(() => {
    if (loggedInUser && currentPage === "login") {
      setCurrentPage("dashboard");
    }
  }, [loggedInUser, currentPage]);

  const navigate = (page: Page) => {
    if (protectedPages.has(page)) {
      if (!loggedInUser) {
        toast.error("Please sign in first.");
        setCurrentPage("login");
        return;
      }
      if (page === "admin" && role !== "admin") {
        toast.error("Admin access only.");
        setCurrentPage("dashboard");
        return;
      }
      if (page === "review" && !canReview) {
        toast.error("Reviewer access only.");
        setCurrentPage("dashboard");
        return;
      }
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductPage />;
      case "blog":
        return <BlogPage />;
      case "login":
        return <LoginPage />;
      case "dashboard":
        return <DashboardPage />;
      case "cases":
        return <CasesPage />;
      case "admin":
        return <AdminPage />;
      case "review":
        return <ReviewPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors closeButton />
      <Navigation currentPage={currentPage} onNavigate={navigate} role={role} canReview={canReview} />
      {renderPage()}
    </div>
  );
}
