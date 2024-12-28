import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = ['user', 'admin']
}) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
            return;
        }

        if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            if (user.role === 'admin') {
                router.push('/dashboard');
            } else {
                router.push('/courses/my-courses');
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;