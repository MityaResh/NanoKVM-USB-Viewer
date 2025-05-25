export const resolutionParse = (
  resolution: string,
): { width: number; height: number } => {
  const [width, height] = resolution.split("x");

  return { width: Number(width), height: Number(height) };
};

export const saveResolution = (resolution: string) => {
  localStorage.setItem("resolution", resolution);
}

export const readResolution = () => {
  return localStorage.getItem("resolution") || "1920x1080";
}