// mdx-components.tsx - Global MDX components for Nextra 4
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: any) {
  return {
    ...docsComponents,
    ...components
    // Add your custom components here
  }
}
