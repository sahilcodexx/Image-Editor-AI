import { HeroVideoDialog } from "./hero-video-dialog";

export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="mt-20 relative border p-2.5 rounded-[14px] mask-b-from-50%  outer-shadow mx-3 md:mx-0">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/herolight.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="/herodark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
