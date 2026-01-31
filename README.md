# Street Fight：ストレス解消型インタラクティブ・ボクシングゲーム
street fightをボクシングゲームに変身
## 概要 | Project Overview
期末試験や課題でストレスを抱える学生のために設計された、対戦型インタラクティブ・ボクシングゲームです。『ストリートファイター』にインスパイアを受け、従来のボタン操作を「パンチングミット」に置き換えることで、物理的な衝撃をゲーム内の攻撃に変換する体験を提供します。
- **Web版ゲーム画面**:(https://editor.p5js.org/chenyi200310/full/WKL6sqiI1m)
- **デモ動画**:(https://youtu.be/mXTjdG1zGjU)
## インタラクションフロー | Interaction Flow
2人のプレイヤーがそれぞれパンチングミットを叩くことで対戦します。
  1. **物理入力**: パンチングミット内部に搭載された圧力センサーが衝撃を検知
  2. **データ送信**: ESP32を介して、衝撃の数値を Firebase Realtime Database にリアルタイム送信
  3. **ゲーム反映**: p5.jsがデータベースを監視し、衝撃に応じて対戦相手のHP（体力）を減算
  4. **結果表示**: どちらかのHPがゼロになると、勝敗結果を表示
## 技術スタック | Tech Stack
- **Frontend**: p5.js (ゲームロジック・グラフィック)
- **Backend**: Firebase Realtime Database (リアルタイム同期)
- **Hardware**: ESP32, 圧力センサー (Keyes Thin-film Pressure Sensor)
- **Communication**: Wi-Fi 経由の Firebase 連携
## システム実装の詳細 | Technical Implementation
1. **ハードウェアとクラウドの連携**<br>
  2台の ESP32 を使用し、それぞれの圧力センサーの値を独立して取得。Wi-Fi経由で Firebase Realtime Database上の特定のvalueを更新する仕組みを構築しました
2. **リアルタイム通信の最適化**<br>
  p5.js 側で Firebase のリスナーを実装し、データベースの更新を即座にゲーム内の HP バーのアニメーションに反映させました
## 課題と今後の展望 | Challenges & Future Work
- **精度の向上**: 現状、圧力センサーの感知範囲が限定的であるため、ヒット判定の正確性に課題が残っています。今後はセンサーの配置最適化や、複数のセンサーを組み合わせたマトリックス構造への改良を検討しています
- **物理フィードバック**: パンチの強さに応じて、画面上のエフェクトや音響をよりダイナミックに変化させる予定です。
## 実際プレー
<p align="center">
  <img src="/docs/01-play.png" width="35%" />
  <img src="/docs/02-play.png" width="35%" />
</p>
