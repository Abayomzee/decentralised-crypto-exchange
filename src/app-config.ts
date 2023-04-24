export const getEnv = () => {
  const isBrowser = typeof window !== "undefined";
  const self = isBrowser ? window : { location: { hostname: "" } };

  const hostname = self && self.location && self.location.hostname;

  return ["localhost"].includes(hostname) ? "local" : "prod";
};

export const imageUrl = getEnv() === "prod" ? "/images" : "/images";
// export const imageUrl = getEnv() === "prod" ? "../images" : "images";
