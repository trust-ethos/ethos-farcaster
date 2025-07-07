import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      colors: {
        ethos: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#06b6d4",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        farcaster: {
          purple: "#8a63d2",
          white: "#ffffff",
          black: "#000000",
        },
      },
    },
  },
} as Options; 