import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const val = localStorage.getItem("swiftdrop_theme");
      if (val) return val === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("swiftdrop_theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, setIsDark };
};

export default useTheme;
