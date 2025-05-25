import { Result, Spin } from "antd";
import { useEffect, useState } from "react";

import styles from "@/assets/index.module.css";
import DeviceChooser from "@/components/deviceChooser";
import { Menu } from "@/components/menu";
import ResolutionChooser from "@/components/resolutionChooser";
import { camera } from "@/libs/camera.ts";
import { readResolution, resolutionParse } from "@/libs/helpers.ts";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const { width, height } = resolutionParse(readResolution());
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: width },
            height: { ideal: height },
          },
          audio: false,
        });
        stream.getTracks().forEach((track) => track.stop());

        setIsCameraAvailable(true);
      } catch {
        setIsCameraAvailable(false);
      }

      setIsLoading(false);
    };

    checkCamera();

    return () => {
      camera.close();
    };
  }, []);

  if (isLoading) {
    return <Spin size="large" spinning={isLoading} fullscreen />;
  }

  return (
    <>
      {!isCameraAvailable ? (
        <Result
          status="warning"
          title="Camera is not available"
          subTitle="Please check your browser settings."
        />
      ) : (
        <>
          <DeviceChooser />
          <ResolutionChooser />
          <Menu />

          <video id="video" className={styles.video} autoPlay playsInline />
        </>
      )}
    </>
  );
};

export default App;
