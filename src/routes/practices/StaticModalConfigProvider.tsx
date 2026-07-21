import { useState } from 'react'
import { App, Alert, Button, ConfigProvider, Flex, Modal, Space, Typography } from 'antd'
import jaJP from 'antd/locale/ja_JP'

// このプラクティス専用のテーマ。既定値から大きく外して、
// 反映されているかどうかが一目で分かるようにする。
const theme = {
  token: {
    colorPrimary: '#eb2f96',
    borderRadius: 16,
    fontSize: 16,
  },
}

// ConfigProvider の内側に置くデモ本体。
// ここで参照できる Context は theme = ピンク / locale = ja_JP。
function Demo() {
  const [open, setOpen] = useState(false)

  // App.useApp() 版。contextHolder は <App> が現在のツリーに埋め込むので Context が効く。
  const { modal } = App.useApp()

  // Modal.useModal() 版。自前で contextHolder をレンダリングする必要がある。
  const [hookModal, contextHolder] = Modal.useModal()

  return (
    <Flex vertical gap={16}>
      {contextHolder}

      <Typography.Title level={4}>1. 静的メソッド（NG）</Typography.Title>
      <Typography.Paragraph type="secondary">
        <Typography.Text code>{`import { Modal } from 'antd'`}</Typography.Text> して{' '}
        <Typography.Text code>Modal.confirm()</Typography.Text> を呼ぶ。ボタンの色が既定の青のまま、
        文言も英語（OK / Cancel）のまま。開発ビルドではコンソールに
        <Typography.Text code>
          Static function can not consume context like dynamic theme.
        </Typography.Text>
        の warning が出る。
      </Typography.Paragraph>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: 'Modal.confirm（静的メソッド）',
              content: 'ConfigProvider の theme / locale が反映されていない',
            })
          }}
        >
          Modal.confirm
        </Button>
      </Space>

      <Typography.Title level={4}>2. App.useApp() の modal（OK）</Typography.Title>
      <Typography.Paragraph type="secondary">
        <Typography.Text code>{`const { modal } = App.useApp()`}</Typography.Text>。
        <Typography.Text code>{'<App />'}</Typography.Text> が contextHolder を
        ConfigProvider の内側にレンダリングするので、theme も locale も効く。
      </Typography.Paragraph>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            modal.confirm({
              title: 'App.useApp().modal.confirm',
              content: 'ConfigProvider の theme / locale が反映されている',
            })
          }}
        >
          App.useApp().modal.confirm
        </Button>
      </Space>

      <Typography.Title level={4}>3. Modal.useModal()（OK）</Typography.Title>
      <Typography.Paragraph type="secondary">
        <Typography.Text code>{`const [modal, contextHolder] = Modal.useModal()`}</Typography.Text>
        。返ってきた contextHolder を自分で描画すれば同様に Context を拾える。
      </Typography.Paragraph>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            hookModal.confirm({
              title: 'Modal.useModal().confirm',
              content: 'ConfigProvider の theme / locale が反映されている',
            })
          }}
        >
          Modal.useModal().confirm
        </Button>
      </Space>

      <Typography.Title level={4}>4. コンポーネントとしての {'<Modal />'}（OK）</Typography.Title>
      <Typography.Paragraph type="secondary">
        同じ <Typography.Text code>{`import { Modal } from 'antd'`}</Typography.Text> でも、
        JSX として書けば通常の React ツリーに載るので Context は効く。
        「import の仕方」ではなく「静的メソッド呼び出しかどうか」が分かれ目。
      </Typography.Paragraph>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>
          {'<Modal />'} を開く
        </Button>
      </Space>
      <Modal
        open={open}
        title="<Modal /> コンポーネント"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        ConfigProvider の theme / locale が反映されている
      </Modal>
    </Flex>
  )
}

export default function StaticModalConfigProviderPractice() {
  return (
    <Flex vertical gap={24} style={{ maxWidth: 720 }}>
      <div>
        <Typography.Title level={2}>Static Modal と ConfigProvider</Typography.Title>
        <Typography.Paragraph type="secondary">
          <Typography.Text code>Modal.confirm()</Typography.Text> のような静的メソッドは、
          呼び出し時に React ツリーの外へ独立してマウントされるため、React Context である
          ConfigProvider の設定（theme / locale / prefixCls など）を読めない。
          下の 4 つのボタンで挙動を見比べる。
        </Typography.Paragraph>
      </div>

      <Alert
        type="info"
        showIcon
        title="このセクション全体を theme（colorPrimary: ピンク / borderRadius: 16）と locale（ja_JP）付きの ConfigProvider で包んでいる"
      />

      <ConfigProvider theme={theme} locale={jaJP}>
        <App>
          <Demo />
        </App>
      </ConfigProvider>
    </Flex>
  )
}
