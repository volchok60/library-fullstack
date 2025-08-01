import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}