import { FloatButton } from "antd";
import { MaximizeIcon, MinimizeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const Fullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    onFullscreenChange();

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  function handleFullscreen() {
    if (!document.fullscreenElement) {
      const element = document.documentElement;
      element.requestFullscreen().then();
    } else {
      document.exitFullscreen().then();
    }
  }

  return (
    <FloatButton
      onClick={handleFullscreen}
      icon={
        isFullscreen ? <MinimizeIcon size={18} /> : <MaximizeIcon size={18} />
      }
    />
  );
};
