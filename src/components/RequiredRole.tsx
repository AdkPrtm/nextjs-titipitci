import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const RequireRole = ({ role, children }: { role: string; children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    else if (user.role !== role) router.push("/unauthorized");
  }, [user, role]);

  if (!user || user.role !== role) return null;
  return <>{children}</>;
};
