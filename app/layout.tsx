// app/layout.tsx - Main layout for Nextra 4 documentation site
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    default: 'Nextra 4 Documentation',
    template: '%s | Nextra 4'
  },
  description: 'Beautiful documentation site built with Nextra 4 and Next.js 15',
  openGraph: {
    title: 'Nextra 4 Documentation',
    description: 'Beautiful documentation site built with Nextra 4 and Next.js 15',
    url: 'https://nextra-4-docs.vercel.app',
    siteName: 'Nextra 4 Docs',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nextra 4 Documentation',
    description: 'Beautiful documentation site built with Nextra 4 and Next.js 15'
  }
}

const banner = (
  <Banner storageKey="nextra-4-banner">
    🎉 Welcome to Nextra 4! Built with Next.js 15 and App Router.
  </Banner>
)

const navbar = (
  <Navbar 
    logo={<strong>Nextra 4 Docs</strong>} 
    projectLink="https://github.com/shuding/nextra"
  />
)

const footer = (
  <Footer className="flex-col items-center md:items-start">
    MIT {new Date().getFullYear()} © Nextra.
  </Footer>
)

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html 
      lang="en" 
      dir="ltr" 
      suppressHydrationWarning
    >
      <Head 
        backgroundColor={{
          dark: 'rgb(15, 23, 42)',
          light: 'rgb(254, 252, 232)'
        }}
        color={{
          hue: { dark: 120, light: 0 },
          saturation: { dark: 100, light: 100 }
        }}
      />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
          search={
            <Search 
              placeholder="Search documentation..."
              emptyResult="No results found."
              errorText="Failed to load search index."
              loading="Loading..."
            />
          }
          themeSwitch={{
            dark: 'Dark',
            light: 'Light',
            system: 'System'
          }}
          toc={{
            backToTop: 'Back to top',
            title: 'On this page'
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
