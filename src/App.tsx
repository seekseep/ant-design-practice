import { createHashRouter, RouterProvider } from 'react-router'
import { ConfigProvider, App as AntdApp } from 'antd'
import RootLayout from './routes/RootLayout.tsx'
import MenuPage from './routes/Menu.tsx'
import SelectListHeightPractice from './routes/practices/SelectListHeight.tsx'
import StaticModalConfigProviderPractice from './routes/practices/StaticModalConfigProvider.tsx'

// プラクティスを増やすときはここに1行ルートを足す（import と children の2箇所）
// GitHub Pages は SPA のディープリンクを 404 にするため HashRouter を使う。
// basename は不要（ハッシュより前は Vite の base がそのまま効く）。
const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <MenuPage /> },
      { path: 'practices/select-list-height', element: <SelectListHeightPractice /> },
      {
        path: 'practices/static-modal-config-provider',
        element: <StaticModalConfigProviderPractice />,
      },
    ],
  },
])

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
