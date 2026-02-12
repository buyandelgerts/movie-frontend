export interface Theater {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  features: string[];
  times: {
    time: string;
    type: "standard" | "imax" | "dolby" | "rpx";
    status: "available" | "selling-fast" | "sold-out";
  }[];
  coords: { x: number; y: number };
}
