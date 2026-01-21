import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";

const reviews = [
  {
    name: "James",
    username: "@james",
    body: "The AI suggestions are insanely accurate. My photos went from plain to wow in seconds. A total game-changer for designers.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "John",
    username: "@john",
    body: "Incredible! Even as a beginner, I felt like a pro designer. The AI does all the heavy lifting while keeping creativity in my hands.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Avery Smith",
    username: "@averysmith",
    body: "A complete game‑changer! The AI image editor turned my simple photo into something brilliant. Truly effortless and inspiring!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Riley Chen",
    username: "@rileychen",
    body: "Absolutely intuitive and powerful! The smart AI suggestions feel like a creative partner helping every step of the way.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jordan Lee",
    username: "@jordanlee",
    body: "I’ve never enjoyed editing images more. The speed and quality are jaw‑dropping — this is the future of creativity!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Taylor Nguyen",
    username: "@taylornguyen",
    body: "From beginner to pro vibes in minutes! These tools make creating stunning visuals feel natural and effortless.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Morgan Patel",
    username: "@morganpatel",
    body: "This is not just an editor — it’s a creative spark machine. Every time I use it, the results exceed my expectations.",
    img: "https://avatar.vercel.sh/john",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
        // dark styles
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden max-w-5xl m-auto">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
