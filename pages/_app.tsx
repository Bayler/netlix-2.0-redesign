import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AuthProvider } from '../hooks/useAuth'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </RecoilRoot>
  )
}
