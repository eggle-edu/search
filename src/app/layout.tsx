import { Provider } from "@/components/ui/provider"
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body className={`${pretendard.variable} font-pretendard`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}