import { Dropdown, FloatButton } from "antd";
import {ProportionsIcon, SettingsIcon, VideoIcon} from "lucide-react";
import { useSetAtom } from "jotai";
import {
  isOpenDeviceChooserAtom,
  isOpenResolutionAtom,
} from "@/jotai/settings.ts";

export const Video = () => {
  const setIsOpenDeviceChooser = useSetAtom(isOpenDeviceChooserAtom);
  const setIsOpenResolution = useSetAtom(isOpenResolutionAtom);

  const items = [
    {
      key: "Device",
      label: "Device",
      icon: <VideoIcon size={18} />,
      onClick: () => setIsOpenDeviceChooser(true),
    },
    {
      key: "Resolution",
      label: "Resolution",
      icon: <ProportionsIcon size={18} />,
      onClick: () => setIsOpenResolution(true),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="topRight" trigger={["click"]}>
      <FloatButton icon={<SettingsIcon size={18} />} />
    </Dropdown>
  );
};
