import { Provider } from "@/components/ui/provider"
import { Metadata } from "next";
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: '공부를 함께, 이끌',
  description: '대치동, 목동 등 학군지의 원장님과 자녀 수학 교육 컨설팅이 필요한 학부모를 연결합니다.',
};


export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    
    <html suppressHydrationWarning>
      <body style={{ backgroundColor: "#FFFFFF" }}
      className={`${pretendard.variable} font-pretendard`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}