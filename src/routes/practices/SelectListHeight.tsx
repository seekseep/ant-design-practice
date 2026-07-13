import { Flex, Select, theme } from "antd";

export default function SelectListHeightPractice () {
  const { token } = theme.useToken()

  return (
    <Flex orientation="vertical" style={{ maxWidth: 640 }}>
      <Select
        listHeight={token.controlHeight * 5}
        placeholder="画家を選んでください"
        options={[{
          label: 'ロダン',
          value: 'Rodin'
        }, {
          label: 'ダリ',
          value: 'Dari'
        }, {
          label: 'パブロ・ディエゴ・ホセ・フランシスコ・デ・パウラ・ファン・ネポムセーノ・マリア・デ・ロス・レメディオス・クリスピン・クリスピアーノ・デ・ラ・サンティシマ・トリニダード・ルイス・イ・ピカソ',
          value: 'ablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'
        }, {
          label: 'ミケランジェロ',
          value: 'Michelangelo'
        }, {
          label: 'レオナルド・ダ・ヴィンチ',
          value: 'Leonardo da Vinci'
        }, {
          label: 'ラファエロ',
          value: 'Raffaello'
        }, {
          label: 'モネ',
          value: 'Monet'
        }, {
          label: 'ルノワール',
          value: 'Renoir'
        }, {
          label: 'セザンヌ',
          value: 'Cezanne'
        }, {
          label: 'ゴッホ',
          value: 'Van Gogh'
        }, {
          label: 'ゴーギャン',
          value: 'Gauguin'
        }, {
          label: 'マティス',
          value: 'Matisse'
        }, {
          label: 'クリムト',
          value: 'Klimt'
        }, {
          label: 'ムンク',
          value: 'Munch'
        }, {
          label: 'カンディンスキー',
          value: 'Kandinsky'
        }, {
          label: 'ミロ',
          value: 'Miro'
        }, {
          label: 'マグリット',
          value: 'Magritte'
        }, {
          label: 'ウォーホル',
          value: 'Warhol'
        }, {
          label: 'フェルメール',
          value: 'Vermeer'
        }, {
          label: 'レンブラント',
          value: 'Rembrandt'
        }]}
        />
    </Flex>
  )
}
