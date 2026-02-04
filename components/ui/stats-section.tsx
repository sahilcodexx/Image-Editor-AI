import { MoveDownLeft, MoveUpRight } from "lucide-react";
import SectionHeading from "../common/section-heading";

function Stats() {
  return (
    <>
      <SectionHeading
        title="Our Stats"
        description="Here are some of our key metrics and achievements."
      />

      <div className="w-full py-10 pb-15 lg:py-5 lg:pb-10">
        <div className="container mx-auto">
          <div className="grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
              <MoveUpRight className="text-primary mb-10 h-4 w-4" />
              <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
                100+
                <span className="text-muted-foreground text-sm tracking-normal">
                  +10%
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-left text-base leading-relaxed tracking-tight">
                Image Processed
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
              <MoveDownLeft className="text-destructive mb-10 h-4 w-4" />
              <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
                50.105
                <span className="text-muted-foreground text-sm tracking-normal">
                  -2%
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-left text-base leading-relaxed tracking-tight">
                Daily active users
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
              <MoveUpRight className="text-success mb-10 h-4 w-4" />
              <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
                500+
                <span className="text-muted-foreground text-sm tracking-normal">
                  +8%
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-left text-base leading-relaxed tracking-tight">
                AI Transformations
              </p>
            </div>
            <div className="flex flex-col justify-between gap-0 rounded-md border p-6">
              <MoveUpRight className="text-primary mb-10 h-4 w-4" />
              <h2 className="font-regular flex max-w-xl flex-row items-end gap-4 text-left text-4xl tracking-tighter">
                $200
                <span className="text-muted-foreground text-sm tracking-normal">
                  +2%
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-left text-base leading-relaxed tracking-tight">
                Monthly recurring revenue
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Stats };
