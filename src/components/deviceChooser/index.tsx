import { Modal, Select } from "antd";

import { isLoadingAtom, isOpenDeviceChooserAtom } from "@/jotai/settings.ts";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import type { MediaDevice } from "@/types.ts";
import { camera } from "@/libs/camera.ts";
import { resolutionAtom, videoDeviceIdAtom } from "@/jotai/device.ts";
import { resolutionParse } from "@/libs/helpers.ts";

export default function DeviceChooser() {
  const [isOpenDeviceChooser, setIsOpenDeviceChooser] = useAtom(
    isOpenDeviceChooserAtom,
  );
  const resolution = useAtomValue(resolutionAtom);
  const [videoDeviceId, setVideoDeviceId] = useAtom(videoDeviceIdAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const [devices, setDevices] = useState<MediaDevice[]>([]);

  async function getDevices() {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(
        (device) => device.kind === "videoinput",
      );

      setDevices(
        videoDevices.map((videoDevice) => ({
          videoId: videoDevice.deviceId,
          videoName: videoDevice.label,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function selectDevice(videoId: MediaDevice["videoId"]) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { width, height } = resolutionParse(resolution);
      await camera.open(videoId, width, height);

      const video = document.getElementById("video") as HTMLVideoElement;
      if (!video) return;
      video.srcObject = camera.getStream();

      setVideoDeviceId(videoId);
      setIsOpenDeviceChooser(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDevices();
  }, []);

  return (
    <Modal
      title="Choose a device"
      closable={videoDeviceId !== ""}
      open={isOpenDeviceChooser}
      onCancel={() => setIsOpenDeviceChooser(false)}
      footer={[]}
    >
      <Select
        style={{ width: "100%" }}
        onChange={selectDevice}
        value={videoDeviceId}
        options={devices.map((device) => ({
          label: device.videoName,
          value: device.videoId,
        }))}
      />
    </Modal>
  );
}
