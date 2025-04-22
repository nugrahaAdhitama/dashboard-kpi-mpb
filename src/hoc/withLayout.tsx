"use client";

/**
 * Higher Order Component (HOC) that wraps a component with a consistent layout
 * Includes Header and Footer components
 */
import React from "react";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

interface WithLayoutProps {
  [key: string]: unknown;
}

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithLayout: React.FC<P & WithLayoutProps> = (props) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <WrappedComponent {...props} />
        </main>
        <Footer />
      </div>
    );
  };

  // Set display name for debugging purposes
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  WithLayout.displayName = `withLayout(${displayName})`;

  return WithLayout;
};

export default withLayout;
