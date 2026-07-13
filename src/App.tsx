import { createBrowserRouter, RouterProvider } from 'react-router'
import { ConfigProvider, App as AntdApp } from 'antd'
import RootLayout from './routes/RootLayout.tsx'
import MenuPage from './routes/Menu.tsx'
import SelectListHeightPractice from './routes/practices/SelectListHeight.tsx'

// プラクティスを増やすときはここに1行ルートを足す（import と children の2箇所）
const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { index: true, element: <MenuPage /> },
        { path: 'practices/select-list-height', element: <SelectListHeightPractice /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

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
