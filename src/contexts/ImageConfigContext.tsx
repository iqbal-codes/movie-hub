/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getConfiguration } from "../services/api";
import { ImageConfigContextType, TmdbImageConfig } from "../types/config";
import { useScreenSize } from "../hooks/utils/useScreenSize";
import moviePosterPlaceholder from "../assets/movie_poster_placeholder.jpg";
import profilePlaceholder from "../assets/profile_placeholder.jpeg";

// Create the context with a default undefined value
export const ConfigContext = createContext<ImageConfigContextType | undefined>(
  undefined
);

// Define the props for the provider
interface ConfigProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ImageConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState<TmdbImageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        const data = await getConfiguration();
        setConfig(data.images);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch TMDB config")
        );
        console.error("Failed to fetch TMDB config:", err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getImageUrl: ImageConfigContextType["getImageUrl"] = useCallback(
    (
      path,
      type,
      customScreenSize = "md",
      secure = true
    ): string | undefined => {
      if (!config || !path) {
        if (type === "poster") {
          return moviePosterPlaceholder;
        }
        if (type === "profile") {
          return profilePlaceholder;
        }
        return undefined;
      }

      const sizeMaps = {
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        "2xl": 4,
      };

      const size = customScreenSize || screenSize;
      const baseUrl = secure ? config.secure_base_url : config.base_url;
      const imageSize = config[`${type}_sizes`][sizeMaps[size]];

      return `${baseUrl}${imageSize}${path}`;
    },
    [config, screenSize]
  );

  return (
    <ConfigContext.Provider value={{ config, loading, error, getImageUrl }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Create a custom hook to use the config context
export const useImageConfig = (): ImageConfigContextType => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
