// Local implementation of class-variance-authority to avoid package resolution issues
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type VariantProps<T extends (...args: any) => any> = Omit<Parameters<T>[0], "class" | "className">

type ConfigSchema = Record<string, Record<string, ClassValue>>
type ConfigVariants<T extends ConfigSchema> = {
  [Variant in keyof T]?: keyof T[Variant]
}

interface Config<T extends ConfigSchema> {
  variants?: T
  defaultVariants?: ConfigVariants<T>
  compoundVariants?: Array<ConfigVariants<T> & { class?: ClassValue; className?: ClassValue }>
}

export function cva<T extends ConfigSchema>(base?: ClassValue, config?: Config<T>) {
  return (props?: ConfigVariants<T> & { class?: ClassValue; className?: ClassValue }) => {
    if (!config?.variants) {
      return twMerge(clsx(base, props?.class, props?.className))
    }

    const { variants, defaultVariants, compoundVariants } = config

    const getVariantClassNames = Object.keys(variants).map((variant: keyof typeof variants) => {
      const variantProp = props?.[variant as keyof typeof props]
      const defaultVariantProp = defaultVariants?.[variant]

      const variantKey = (variantProp ?? defaultVariantProp) as keyof (typeof variants)[typeof variant] | undefined

      if (variantKey) {
        return variants[variant][variantKey]
      }
      return null
    })

    const compoundVariantClassNames = compoundVariants?.reduce(
      (acc, { class: cvClass, className: cvClassName, ...cvConfig }) => {
        const isMatch = Object.entries(cvConfig).every(([key, value]) => {
          const propValue = props?.[key as keyof typeof props] ?? defaultVariants?.[key as keyof typeof defaultVariants]
          return propValue === value
        })

        if (isMatch) {
          acc.push(cvClass, cvClassName)
        }

        return acc
      },
      [] as ClassValue[],
    )

    return twMerge(clsx(base, getVariantClassNames, compoundVariantClassNames, props?.class, props?.className))
  }
}
