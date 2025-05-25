import { Modal, Select } from "antd";
import { useAtom } from "jotai";

import { resolutionAtom } from "@/jotai/device.ts";
import { isOpenResolutionAtom } from "@/jotai/settings.ts";
import { camera } from "@/libs/camera.ts";
import { resolutionParse, saveResolution } from "@/libs/helpers.ts";

export default function ResolutionChooser() {
  const [isOpenResolution, setIsOpenResolution] = useAtom(isOpenResolutionAtom);
  const [resolution, setResolution] = useAtom(resolutionAtom);

  async function updateResolution(value: string) {
    try {
      const { width, height } = resolutionParse(value);
      await camera.updateResolution(width, height);
    } catch (err) {
      console.log(err);
      return;
    }

    const video = document.getElementById("video") as HTMLVideoElement;
    if (!video) return;
    video.srcObject = camera.getStream();

    saveResolution(value);
    setResolution(value);
    setIsOpenResolution(false);
  }

  return (
    <Modal
      title="Choose a display resolution"
      closable={false}
      open={isOpenResolution}
      footer={[]}
    >
      <Select
        style={{ width: "100%" }}
        onChange={updateResolution}
        value={resolution}
        options={[
          { name: "2560x1440", value: "2560x1440" },
          { name: "1920x1080", value: "1920x1080" },
          { name: "1280x720", value: "1280x720" },
          { name: "800x600", value: "800x600" },
          { name: "640x480", value: "640x480" },
        ]}
      />
    </Modal>
  );
}
