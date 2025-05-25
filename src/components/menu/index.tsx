import { FloatButton } from "antd";

import { Fullscreen } from "./fullscreen";
import { Video } from "./video";

export const Menu = () => {
  return (
    <FloatButton.Group shape="square" placement="right">
      <Video />
      <Fullscreen />
    </FloatButton.Group>
  );
};
