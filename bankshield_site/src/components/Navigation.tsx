import { Authenticated, Unauthenticated } from "@convex-dev/auth/react";
import {
  Shield,
  Home,
  Box,
  BookOpen,
  LogIn,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  ClipboardList,
} from "lucide-react";
import { SignOutButton } from "../SignOutButton";

type Page = "home" | "products" | "blog" | "login" | "dashboard" | "cases" | "admin" | "review";
type Role = "user" | "reviewer" | "admin";

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  role: Role;
  canReview: boolean;
}

export function Navigation({ currentPage, onNavigate, role, canReview }: NavigationProps) {
  const navItems = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "products" as const, label: "Products", icon: Box },
    { id: "blog" as const, label: "Blog", icon: BookOpen },
  ];

  const isActive = (page: Page) => currentPage === page;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BankShield</span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.id)
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <Authenticated>
              <button
                onClick={() => onNavigate("dashboard")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("dashboard")
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => onNavigate("cases")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("cases")
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <ClipboardList className="h-4 w-4" />
                <span>Cases</span>
              </button>

              {canReview && (
                <button
                  onClick={() => onNavigate("review")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive("review")
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span>Reviewer</span>
                </button>
              )}

              {role === "admin" && (
                <button
                  onClick={() => onNavigate("admin")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive("admin")
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Admin</span>
                </button>
              )}

              <div className="ml-3">
                <SignOutButton />
              </div>
            </Authenticated>

            <Unauthenticated>
              <button
                onClick={() => onNavigate("login")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isActive("login")
                    ? "bg-cyan-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            </Unauthenticated>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <Unauthenticated>
              <button onClick={() => onNavigate("login")} className="text-slate-300 hover:text-white">
                <LogIn className="h-6 w-6" />
              </button>
            </Unauthenticated>
            <Authenticated>
              <button onClick={() => onNavigate("dashboard")} className="text-slate-300 hover:text-white">
                <LayoutDashboard className="h-6 w-6" />
              </button>
              <button onClick={() => onNavigate("cases")} className="text-slate-300 hover:text-white">
                <ClipboardList className="h-6 w-6" />
              </button>
            </Authenticated>
          </div>
        </div>
      </div>
    </nav>
  );
}
