import { Link, Outlet } from 'react-router'
import { Layout, Typography } from 'antd'

const { Header, Content } = Layout

function RootLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff' }}>
          <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
            Ant Design Practice
          </Typography.Title>
        </Link>
      </Header>
      <Content style={{ padding: 24, maxWidth: 960, width: '100%', margin: '0 auto' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default RootLayout
