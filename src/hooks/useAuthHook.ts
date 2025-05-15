import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login, logout, register } from "@/lib/api/AuthAPI";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/AuthStore";
import { User } from "@/types/UserType";

export function useAuth() {
    const {
        user,
        isAuthenticated,
        isLoading,
        setUser,
        setIsAuthenticated,
        setIsLoading,
        logout: logoutStore
    } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    // Check current user with TanStack Query
    const { refetch: refetchUser } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        enabled: isLoading, // Only run when loading
        retry: false,
        meta:{
            onSuccess: (userData: User | null) => {
                setUser(userData);
                setIsAuthenticated(true);
                setIsLoading(false);
            },
            onError: () => {
                setUser(null);
                setIsAuthenticated(false);
                setIsLoading(false);
            },
        }
    });

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            await refetchUser();
            if (data.user) {
                
            }
            router.push("/dashboard");
        },
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: async (data) => {
            await refetchUser();
            router.push("/dashboard");
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            logoutStore();
            queryClient.invalidateQueries({ queryKey: ["user"] });
            router.push("/login");
        },
    });

    const loginHooks = (email: string, password: string) => {
        return loginMutation.mutate({ email, password });
    };

    const registerHooks = (name: string, email: string, password: string) => {
        return registerMutation.mutate({ email, password });
    };

    const logoutHooks = () => {
        return logoutMutation.mutate();
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        loginHooks,
        registerHooks,
        logoutHooks,
        loginMutation,
        registerMutation,
        logoutMutation,
    };
}