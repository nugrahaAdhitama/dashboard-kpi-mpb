"use client";

/**
 * Dynamic route handler for POB detail pages
 * Redirects to the appropriate POB detail page based on ID
 */
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface POBPageProps {
  params: {
    id: string;
  };
}

export default function POBPage({ params }: POBPageProps) {
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    // Redirect to the appropriate POB detail page
    router.replace(`/pob/${id}`);
  }, [id, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Redirecting...</div>
    </div>
  );
}
