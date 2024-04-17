import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { ReactNode, Suspense, useEffect } from "react";

export const SuspenseWithProgress = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    nprogress.start();

    () => {
      nprogress.complete();
      nprogress.cleanup();
    };
  }, []);

  return (
    <Suspense
      fallback={
        <NavigationProgress initialProgress={20} stepInterval={300} size={2} />
      }
    >
      {children}
    </Suspense>
  );
};
