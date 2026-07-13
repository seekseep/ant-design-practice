# Select の listHeight を「選択肢5個分」の高さにする

## やりたいこと

antd の `Select` のドロップダウン表示領域（`listHeight`）を、**ちょうど選択肢5個分の高さ**にしたい。

素朴には `listItemHeight={32}` と `listHeight={32 * 5}` のように1項目の高さ（32px）をハードコードするが、この `32` はテーマトークン`controlHeight` に由来する値なので、**マジックナンバーを書かずにトークンから取り出せる**。

## 結論の実装例

```tsx
import { Flex, Select, theme } from "antd";

export default function SelectListHeightPractice () {
  const { token } = theme.useToken()

  return (
    <Flex orientation="vertical" style={{ maxWidth: 640 }}>
      <Select
        listHeight={token.controlHeight * 5}
        options={[
          { label: '選択肢1', value: 'option-1' },
          // ...
        ]}
      />
    </Flex>
  )
}
```

ポイント:

- **`listItemHeight` は指定しない。** 未指定の場合、antd 内部で自動的に `token.controlHeight` が使われる（後述）。ので渡す必要がない。
- **`listHeight`** だけは「5個分」という意図を込めて計算したいので、`theme.useToken()` から取り出した `token.controlHeight * 5` を渡す。
- これで「1項目の実際の高さ」と「`listHeight` の計算基準」が同じトークン `controlHeight` に揃う。

### 1. `listItemHeight` のデフォルトが `token.controlHeight`

`listItemHeight`（仮想スクロールが1項目の高さとして扱う値）を渡さないと、`token.controlHeight` が使われる。

```ts
const listItemHeight = customListItemHeight ?? token?.controlHeight;
```

→ [components/select/index.tsx#L237](https://github.com/ant-design/ant-design/blob/6.5.0/components/select/index.tsx#L237)

### 2. オプション項目の高さトークン `optionHeight` が `controlHeight`

ドロップダウンの1項目に使われる `optionHeight` トークンは`controlHeight` そのもの。上下 padding も「文字の高さ + 上下 padding = controlHeight」になるよう逆算されている。

```ts
// Item height default use `controlHeight - 2 * paddingXXS`,
optionPadding: `${(controlHeight - fontSize * lineHeight) / 2}px ${controlPaddingHorizontal}px`,
optionFontSize: fontSize,
optionLineHeight: lineHeight,
optionHeight: controlHeight,
```

→ [components/select/style/token.ts#L204-L207](https://github.com/ant-design/ant-design/blob/6.5.0/components/select/style/token.ts#L204-L207)

### 3. 実際の CSS で項目に `minHeight: optionHeight` が当たる

上記 `optionHeight`（= `controlHeight`）が、実際のオプション要素の`minHeight` として適用される。

```ts
const { optionHeight, optionFontSize, optionLineHeight, optionPadding } = token;
// ...
  minHeight: optionHeight,
  padding: optionPadding,
```

→ [components/select/style/dropdown.ts#L16-L22](https://github.com/ant-design/ant-design/blob/6.5.0/components/select/style/dropdown.ts#L16-L22)

### まとめ

| 観点 | 値 |
| --- | --- |
| 仮想スクロールの1項目想定高さ（`listItemHeight` 既定値） | `controlHeight` |
| 実際の項目の見た目の高さ（`minHeight`） | `controlHeight` |

両方が `controlHeight`（デフォルトテーマで 32px）に揃っているため、
`listHeight = controlHeight * 5` とすれば「選択肢5個分」の高さになる。

## size を受け取る場合

`Select` に `size="small"` / `size="large"` を渡すケースについて。

### 結論: `listHeight` の基準は `size` に関わらず `controlHeight` のまま

直感的には「small なら項目も小さくなるから `controlHeightSM * 5` にすべき」と思いがちだが、**それは不要**。antd 6 では `size` を変えても**ドロップダウンの項目高さは変わらない**（`controlHeight` のまま）ため、`listHeight={token.controlHeight * 5}` を書き換える必要はない。

```tsx
// size を受け取っても listHeight の計算は変えない
<Select
  size={size}
  listHeight={token.controlHeight * 5}   // ← size に依存しない
  options={options}
/>
```

### 根拠: `size` が効くのは「閉じているセレクタ本体」だけ

`size` は閉じた状態のセレクタ（コントロール）の高さを `controlHeightSM` / `controlHeightLG` に切り替えるが、この分岐はセレクタ本体のスタイルにしか存在しない。

```ts
// small のときだけ height トークンを差し替える（＝セレクタ本体の話）
[varName('height')]: token.controlHeightSM,
// large
[varName('height')]: token.controlHeightLG,
```

→ [components/select/style/select-input.ts](https://github.com/ant-design/ant-design/blob/6.5.0/components/select/style/select-input.ts)

一方、ドロップダウン項目側（前章 2, 3）では:

- `optionHeight: controlHeight` … `size` 変数を参照していない（固定）
- `minHeight: optionHeight` … 同上
- `listItemHeight = customListItemHeight ?? token?.controlHeight` … `size` を参照していない

いずれも `size` に依存しない。したがって**ドロップダウンを開いたときの1項目の高さは常に `controlHeight`**。

### まとめ

| 対象 | `size` の影響 | 高さの基準 |
| --- | --- | --- |
| 閉じているセレクタ本体 | 受ける | `controlHeightSM` / `controlHeight` / `controlHeightLG` |
| ドロップダウンの1項目 | **受けない** | 常に `controlHeight` |

そのため `listHeight` は `size` を意識せず `controlHeight * 5` で固定してよい。
