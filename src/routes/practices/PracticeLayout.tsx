import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Breadcrumb, Space, Typography } from 'antd'

type Props = {
  /** 見出し・パンくずに表示する名前 */
  title: string
  children: ReactNode
}

/** 各プラクティスページ共通のパンくず + 見出しの枠 */
function PracticeLayout({ title, children }: Props) {
  return (
    <Space orientation='vertical' size="large" style={{ width: '100%' }}>
      <Breadcrumb
        items={[{ title: <Link to="/">メニュー</Link> }, { title }]}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      {children}
    </Space>
  )
}

export default PracticeLayout
