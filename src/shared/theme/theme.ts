import { colors } from "./colors";

export const designTokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
  },
} as const;

export const antdTheme = {
  token: {
    colorPrimary: colors.primary[500],
    colorSuccess: colors.semantic.success,
    colorWarning: colors.semantic.warning,
    colorError: colors.semantic.error,
    colorInfo: colors.semantic.info,

    colorBgBase: colors.background.primary,
    colorBgContainer: colors.background.primary,
    colorBgElevated: colors.background.primary,

    colorText: colors.text.primary,
    colorTextSecondary: colors.text.secondary,
    colorTextTertiary: colors.text.tertiary,
    colorTextDisabled: colors.text.disabled,

    colorBorder: colors.neutral[300],
    colorBorderSecondary: colors.neutral[200],

    borderRadius: designTokens.borderRadius.md,
    borderRadiusSM: designTokens.borderRadius.sm,
    borderRadiusLG: designTokens.borderRadius.lg,

    padding: designTokens.spacing.md,
    paddingXS: designTokens.spacing.xs,
    paddingSM: designTokens.spacing.sm,
    paddingLG: designTokens.spacing.lg,
    paddingXL: designTokens.spacing.xl,
  },
} as const;
