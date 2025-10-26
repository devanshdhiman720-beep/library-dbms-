import { 
  BookOpen, Users, ArrowLeftRight, LayoutDashboard, Home, Search, Menu,
  DollarSign, TrendingUp, CreditCard, Receipt, Wallet, FileText, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback, useMemo } from "react";

const Navigation = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  
  // Simple navigation handler
  const handleNavigate = useCallback((path) => {
    setCurrentPath(path);
    // In your actual app, use: navigate(path) from react-router-dom
    console.log("Navigating to:", path);
  }, []);
  
  // In production, fetch these from your API with proper error handling
  const pendingFines = 3;
  const totalRevenue = 12450;
  
  const navItems = useMemo(() => [
    { path: "/", label: "Home", icon: Home },
    { path: "/books", label: "Books", icon: BookOpen },
    { path: "/members", label: "Members", icon: Users },
    { path: "/transactions", label: "Transactions", icon: ArrowLeftRight },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ], []);

  const financeItems = useMemo(() => [
    { 
      path: "/finances", 
      label: "Finance Dashboard", 
      icon: BarChart3, 
      description: "Overview & Analytics",
      ariaLabel: "View finance dashboard with overview and analytics"
    },
    { 
      path: "/revenue", 
      label: "Revenue Tracking", 
      icon: TrendingUp, 
      description: "Income & Subscriptions",
      ariaLabel: "Track revenue, income and subscriptions"
    },
    { 
      path: "/fines", 
      label: "Fines Management", 
      icon: Receipt, 
      badge: pendingFines, 
      description: "Overdue & Penalties",
      ariaLabel: `Manage fines, overdue items and penalties. ${pendingFines} pending fine${pendingFines !== 1 ? 's' : ''}`
    },
    { 
      path: "/payments", 
      label: "Payment Processing", 
      icon: CreditCard, 
      description: "Transactions & Methods",
      ariaLabel: "Process payments, view transactions and payment methods"
    },
    { 
      path: "/invoices", 
      label: "Invoices & Billing", 
      icon: FileText, 
      description: "Generate & Track",
      ariaLabel: "Generate and track invoices and billing"
    },
    { 
      path: "/expenses", 
      label: "Expense Management", 
      icon: Wallet, 
      description: "Costs & Budget",
      ariaLabel: "Manage expenses, costs and budget"
    },
    { 
      path: "/reports", 
      label: "Financial Reports", 
      icon: BarChart3, 
      description: "Analytics & Insights",
      ariaLabel: "View financial reports, analytics and insights"
    },
  ], [pendingFines]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      // Add your search logic here
      console.log("Searching for:", trimmedQuery);
      // Navigate to search results page or trigger search
      // Example: navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  }, [searchQuery]);

  const closeSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isFinancePath = useMemo(() => {
    const financePaths = ['/finances', '/revenue', '/fines', '/payments', '/invoices', '/expenses', '/reports'];
    return financePaths.some(path => location.pathname.startsWith(path));
  }, [location.pathname]);

  const formatCurrency = useCallback((amount) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `$${amount.toLocaleString()}`;
    }
  }, []);

  return (
    <nav 
      className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="LibraryMS home"
          >
            <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LibraryMS
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Button 
                  key={path} 
                  asChild 
                  variant={isActive ? "default" : "ghost"} 
                  size="sm" 
                  className="gap-2"
                  role="menuitem"
                >
                  <Link 
                    to={path}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </Link>
                </Button>
              );
            })}

            {/* Finance Dropdown */}
            <DropdownMenu open={isFinanceOpen} onOpenChange={setIsFinanceOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={isFinancePath ? "default" : "ghost"} 
                  size="sm" 
                  className="gap-2"
                  aria-haspopup="true"
                  aria-expanded={isFinanceOpen}
                  aria-label={`Finance menu${pendingFines > 0 ? `, ${pendingFines} pending fine${pendingFines !== 1 ? 's' : ''}` : ''}`}
                >
                  <DollarSign className="h-4 w-4" aria-hidden="true" />
                  Finance
                  {pendingFines > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="ml-1 h-5 px-1.5 text-xs"
                      aria-label={`${pendingFines} pending`}
                    >
                      {pendingFines}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 max-h-[500px] overflow-y-auto bg-popover border shadow-lg z-50"
                sideOffset={5}
                role="menu"
              >
                <DropdownMenuLabel 
                  className="flex items-center justify-between sticky top-0 bg-popover z-10 py-3 border-b"
                  role="presentation"
                >
                  <span className="font-semibold text-base">Financial Management</span>
                  <Badge 
                    variant="secondary" 
                    className="ml-2 text-xs font-medium"
                    aria-label={`Total revenue: ${formatCurrency(totalRevenue)}`}
                  >
                    {formatCurrency(totalRevenue)}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {financeItems.map(({ path, label, icon: Icon, badge, description, ariaLabel }) => (
                  <DropdownMenuItem 
                    key={path} 
                    asChild 
                    className="cursor-pointer py-3 px-4 focus:bg-accent focus:text-accent-foreground"
                    role="menuitem"
                  >
                    <Link 
                      to={path} 
                      className="flex items-start justify-between gap-3 w-full"
                      aria-label={ariaLabel}
                      onClick={() => setIsFinanceOpen(false)}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Icon className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                          <span className="font-medium text-sm leading-tight">{label}</span>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {description}
                          </span>
                        </div>
                      </div>
                      {badge !== undefined && badge > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="h-5 px-2 text-xs shrink-0"
                          aria-label={`${badge} pending`}
                        >
                          {badge}
                        </Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch} 
            className="relative hidden md:flex flex-1 max-w-md"
            role="search"
          >
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" 
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search books, members, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search books, members, and transactions"
            />
          </form>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    LibraryMS
                  </span>
                </SheetTitle>
                <SheetDescription>
                  Navigation menu with search and links to all pages
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 flex flex-col gap-2">
                <form onSubmit={handleSearch} className="relative mb-4" role="search">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" 
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    aria-label="Search"
                  />
                </form>

                <nav aria-label="Primary navigation">
                  {navItems.map(({ path, label, icon: Icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <Button 
                        key={path} 
                        asChild 
                        variant={isActive ? "default" : "ghost"} 
                        className="justify-start gap-3 h-12" 
                        onClick={closeSheet}
                      >
                        <Link 
                          to={path}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          {label}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>

                {/* Finance Section */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-3 px-3">
                    <span className="text-sm font-semibold">Financial Management</span>
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      aria-label={`Total revenue: ${formatCurrency(totalRevenue)}`}
                    >
                      {formatCurrency(totalRevenue)}
                    </Badge>
                  </div>
                  <nav aria-label="Financial navigation">
                    {financeItems.map(({ path, label, icon: Icon, badge, description, ariaLabel }) => {
                      const isActive = location.pathname === path;
                      return (
                        <Button 
                          key={path} 
                          asChild 
                          variant={isActive ? "default" : "ghost"} 
                          className="justify-start gap-3 h-auto py-3 w-full text-left" 
                          onClick={closeSheet}
                        >
                          <Link 
                            to={path} 
                            className="flex items-start justify-between w-full"
                            aria-label={ariaLabel}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className="flex items-start gap-3 flex-1">
                              <Icon className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
                              <div className="flex flex-col gap-0.5 flex-1">
                                <span className="font-medium text-sm leading-tight">{label}</span>
                                <span className="text-xs text-muted-foreground font-normal leading-tight">
                                  {description}
                                </span>
                              </div>
                            </span>
                            {badge !== undefined && badge > 0 && (
                              <Badge 
                                variant="destructive" 
                                className="h-5 px-2 text-xs shrink-0 mt-0.5"
                                aria-label={`${badge} pending`}
                              >
                                {badge}
                              </Badge>
                            )}
                          </Link>
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;