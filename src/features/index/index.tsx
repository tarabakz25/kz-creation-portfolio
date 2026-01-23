import MenuItem from "~/shared/components/layouts/menuItem";
import { useFirstVisitLoading } from "~/shared/hooks/useFirstVisitLoading";
import { PageTransitionProvider } from "~/shared/components/pageTransition";
import Interactive3DText from "~/shared/components/interactive3DText";

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
          <div className="h-[300px] w-full">
            <Interactive3DText 
              englishText="A thrill-seeking explorer in a wild world"
              japaneseText="激動の世を楽しむ探求者"
            />
          </div>
        </div>
      </main>
    </PageTransitionProvider>
  );
}
