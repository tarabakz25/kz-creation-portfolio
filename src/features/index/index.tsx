import MenuItem from "~/shared/components/layouts/menuItem";
import { useFirstVisitLoading } from "~/shared/hooks/useFirstVisitLoading";
import { PageTransitionProvider } from "~/shared/components/pageTransition";

export default function IndexPage() {
  useFirstVisitLoading();

  return (
    <PageTransitionProvider>
      <main className="px-[5vw] py-[10vh] h-screen">
        <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
          <h1 className="text-3xl font-futura_pt tracking-wider">
            Welcome to Kz Creation portfolio.
          </h1>
          <MenuItem />
        </div>
      </main>
    </PageTransitionProvider>
  );
}
