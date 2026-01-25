import MenuItem from "~/shared/components/layouts/menuItem";
import { useFirstVisitLoading } from "~/shared/hooks/useFirstVisitLoading";
import { PageTransitionProvider } from "~/shared/components/pageTransition";

export default function IndexPage() {
  useFirstVisitLoading();

  return (
    <PageTransitionProvider>
      <main className="px-[5vw] py-[10vh] h-screen flex justify-between">
        <div className="flex flex-col items-start w-full min-h-screen text-white gap-8">
          <h1 className="text-3xl font-futura_pt tracking-wider">
            Welcome to Kz Creation portfolio.
          </h1>
          <MenuItem />
        </div>
        <div className="w-full flex flex-col items-right justify-center text-white">
          <div className="text-right">
            <h1 className="text-3xl font-avenir italic tracking-wide">
              A thrill-seeking explorer in a wild world
            </h1>
            <p className="text-xl font-shuei_gothic">激動の世を楽しむ探求者</p>
          </div>
        </div>
      </main>
    </PageTransitionProvider>
  );
}
