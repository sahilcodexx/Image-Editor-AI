import { HeroVideoDialog } from "./hero-video-dialog";

export function VideoPlayer() {
  return (
    <div className="outer-shadow relative mx-3 mt-10 rounded-[14px] border p-2.5 md:mx-0">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="#"
        thumbnailSrc="/herolight.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="#"
        thumbnailSrc="/herodark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
