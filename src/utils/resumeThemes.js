const resumeThemes = {
  modern: {
    name: "modern",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#0284c7",
        secondary: "#075985",
        text: {
          primary: "#1f2937",
          secondary: "#4b5563",
          accent: "#0284c7"
        },
        background: {
          primary: "#ffffff",
          secondary: "#f8fafc",
          accent: "#f0f9ff"
        },
        border: "#e2e8f0"
      },
      spacing: {
        section: "2rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  classic: {
    name: "classic",
    styles: {
      fontFamily: {
        heading: "Merriweather, serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#1e40af",
        secondary: "#1e3a8a",
        text: {
          primary: "#111827",
          secondary: "#374151",
          accent: "#1e40af"
        },
        background: {
          primary: "#ffffff",
          secondary: "#f9fafb",
          accent: "#eff6ff"
        },
        border: "#e5e7eb"
      },
      spacing: {
        section: "2.5rem",
        item: "1.75rem"
      },
      fontSize: {
        name: "2.5rem",
        title: "1.75rem",
        subtitle: "1.375rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  minimal: {
    name: "minimal",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#18181b",
        secondary: "#27272a",
        text: {
          primary: "#18181b",
          secondary: "#52525b",
          accent: "#18181b"
        },
        background: {
          primary: "#ffffff",
          secondary: "#fafafa",
          accent: "#f4f4f5"
        },
        border: "#e4e4e7"
      },
      spacing: {
        section: "2rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  creative: {
    name: "creative",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#6d28d9",
        secondary: "#5b21b6",
        text: {
          primary: "#1f2937",
          secondary: "#4b5563",
          accent: "#6d28d9"
        },
        background: {
          primary: "#ffffff",
          secondary: "#f5f3ff",
          accent: "#ede9fe"
        },
        border: "#e5e7eb"
      },
      spacing: {
        section: "2.25rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.625rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  },

  professional: {
    name: "professional",
    styles: {
      fontFamily: {
        heading: "Inter, sans-serif",
        body: "Inter, sans-serif"
      },
      colors: {
        primary: "#047857",
        secondary: "#065f46",
        text: {
          primary: "#1f2937",
          secondary: "#374151",
          accent: "#047857"
        },
        background: {
          primary: "#ffffff",
          secondary: "#f0fdfa",
          accent: "#ccfbf1"
        },
        border: "#e2e8f0"
      },
      spacing: {
        section: "2.25rem",
        item: "1.5rem"
      },
      fontSize: {
        name: "2.25rem",
        title: "1.5rem",
        subtitle: "1.25rem",
        body: "1rem",
        small: "0.875rem"
      }
    }
  }
};

// Helper function to get theme by name
export const getThemeByName = (themeName) => {
  return resumeThemes[themeName] || resumeThemes.modern;
};

// Helper function to get all theme names
export const getAllThemeNames = () => {
  return Object.keys(resumeThemes);
};

// Helper function to get theme preview colors
export const getThemePreviewColors = (themeName) => {
  const theme = resumeThemes[themeName] || resumeThemes.modern;
  return {
    primary: theme.styles.colors.primary,
    secondary: theme.styles.colors.secondary,
    background: theme.styles.colors.background.primary,
    accent: theme.styles.colors.background.accent
  };
};

// Helper function to generate CSS variables for a theme
export const generateThemeVariables = (themeName) => {
  const theme = resumeThemes[themeName] || resumeThemes.modern;
  return {
    "--theme-primary": theme.styles.colors.primary,
    "--theme-secondary": theme.styles.colors.secondary,
    "--theme-text-primary": theme.styles.colors.text.primary,
    "--theme-text-secondary": theme.styles.colors.text.secondary,
    "--theme-text-accent": theme.styles.colors.text.accent,
    "--theme-bg-primary": theme.styles.colors.background.primary,
    "--theme-bg-secondary": theme.styles.colors.background.secondary,
    "--theme-bg-accent": theme.styles.colors.background.accent,
    "--theme-border": theme.styles.colors.border,
    "--theme-spacing-section": theme.styles.spacing.section,
    "--theme-spacing-item": theme.styles.spacing.item,
    "--theme-font-heading": theme.styles.fontFamily.heading,
    "--theme-font-body": theme.styles.fontFamily.body,
    "--theme-font-size-name": theme.styles.fontSize.name,
    "--theme-font-size-title": theme.styles.fontSize.title,
    "--theme-font-size-subtitle": theme.styles.fontSize.subtitle,
    "--theme-font-size-body": theme.styles.fontSize.body,
    "--theme-font-size-small": theme.styles.fontSize.small
  };
};

export default resumeThemes;