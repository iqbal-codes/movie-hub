// Define the interfaces for the configuration data
export interface TmdbImageConfig {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

// Define the shape of the context data
export interface ImageConfigContextType {
  config: TmdbImageConfig | null;
  loading: boolean;
  error: Error | null;
  getImageUrl: (
    path: string | null | undefined,
    type: ImageType,
    customScreenSize?: ScreenSize,
    secure?: boolean
  ) => string | undefined;
}

export type ImageType = "backdrop" | "logo" | "poster" | "profile" | "still";
export type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl";
