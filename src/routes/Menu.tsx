import { Link } from 'react-router'
import { Card, List, Typography } from 'antd'

// プラクティスを増やすときはここに1件足す
const items = [
  {
    to: '/practices/select-list-height',
    title: 'Select List Height',
    description: '<Select /> の選択肢の範囲の表示',
  }
]

function MenuPage() {
  return (
    <div>
      <Typography.Title level={2}>検証</Typography.Title>
      <Typography.Paragraph type="secondary">
        Ant Design のコンポーネントの検証
      </Typography.Paragraph>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <Link to={item.to}>
              <Card hoverable title={item.title}>
                {item.description}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export default MenuPage
