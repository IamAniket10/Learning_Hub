import React, { useState } from 'react';
import { useAuth } from "@/context/AuthContext";
import { Menu, X, Book, User, LogOut, ChevronDown, Home } from 'lucide-react';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

    const NavigationLink = ({ href, children, className }: { 
        href: string; 
        children: React.ReactNode; 
        className?: string 
    }) => (
        <a href={href} className={className}>
            {children}
        </a>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
            <nav className="bg-white border-b border-orange-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <NavigationLink href="/" className="flex items-center space-x-2 group">
                                <Book className="h-8 w-8 text-orange-500 group-hover:text-orange-600 transition-colors" />
                                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    LearningHub
                                </span>
                            </NavigationLink>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <>
                                    <NavigationLink 
                                        href="/courses" 
                                        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                    >
                                        <Book className="h-4 w-4" />
                                        <span>Browse Courses</span>
                                    </NavigationLink>
                                    
                                    {user.role === 'admin' && (
                                        <NavigationLink 
                                            href="/dashboard" 
                                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Home className="h-4 w-4" />
                                            <span>Admin Dashboard</span>
                                        </NavigationLink>
                                    )}
                                    
                                    {user.role === 'user' && (
                                        <NavigationLink 
                                            href="/courses/my-courses" 
                                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <Book className="h-4 w-4" />
                                            <span>My Courses</span>
                                        </NavigationLink>
                                    )}


                                    {/* Profile Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={toggleProfileDropdown}
                                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>{user?.username || "Guest"}</span>
                                            <ChevronDown className="h-4 w-4" />
                                        </button>

                                        {isProfileDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1">
                                                    <button
                                                        onClick={logout}
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 w-full text-left"
                                                    >
                                                        <LogOut className="h-4 w-4" />
                                                        <span>Logout</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <NavigationLink 
                                        href="/login" 
                                        className="px-4 py-2 text-orange-600 hover:text-orange-700 transition-colors"
                                    >
                                        Login
                                    </NavigationLink>
                                    <NavigationLink 
                                        href="/signup" 
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                    >
                                        Sign Up
                                    </NavigationLink>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {user ? (
                                <>
                                    <NavigationLink 
                                        href="/courses" 
                                        className="block px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        Browse Courses
                                    </NavigationLink>
                                    {user.role === 'admin' && (
                                        <NavigationLink 
                                            href="/dashboard" 
                                            className="block px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            Admin Dashboard
                                        </NavigationLink>
                                    )}
                                    {user.role === 'user' && (
                                        <NavigationLink 
                                            href="/courses/my-courses" 
                                            className="block px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                        >
                                            My Courses
                                        </NavigationLink>
                                    )}
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavigationLink 
                                        href="/login" 
                                        className="block px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        Login
                                    </NavigationLink>
                                    <NavigationLink 
                                        href="/signup" 
                                        className="block px-3 py-2 rounded-md text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        Sign Up
                                    </NavigationLink>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};


export default Layout;

