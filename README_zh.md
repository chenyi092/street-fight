[繁體中文](./README_zh.md) | [日本語](./README.md)
# Street Fight：發洩壓力！互動拳擊遊戲
將快打旋風轉換為拳擊遊戲
## 概要 | Project Overview
這是一款專為因期末考與作業而壓力沉重的學生所設計的「對戰型互動擊拳遊戲」。<br>
本作受到《快打旋風》的啟發，將傳統的按鈕操作替換為實體的「拳擊手靶」，提供一種能將真實物理衝擊轉化為遊戲內攻擊動作的沉浸式體驗。
- **網頁版遊戲畫面**:(https://editor.p5js.org/chenyi200310/full/WKL6sqiI1m)
- **demo影片**:(https://youtu.be/mXTjdG1zGjU)
## 互動流程 | Interaction Flow
兩名玩家透過打擊各自的拳擊靶進行對戰。
  1. **物理輸入**: 內嵌於拳擊手靶內部的壓力感測器會偵測物理衝擊
  2. **資料傳輸**: 透過 ESP32，將感測器數值即時傳送至 Firebase Realtime Database
  3. **同步遊戲**: 由 p5.js 監測資料庫狀態，並根據感測器數值扣對手的 HP 值
  4. **結果呈現**: 當其中一方的 HP（生命值）歸零時，系統將顯示勝負結果
## 使用技術 | Tech Stack
- **Frontend**: p5.js (遊戲邏輯、影像視覺)
- **Backend**: Firebase Realtime Database (即時同步)
- **Hardware**: ESP32, 壓力感測器 (Keyes Thin-film Pressure Sensor)
- **Communication**: 透過 Wi-Fi 實現 Firebase 資料連動
## 系統開發細節 | Technical Implementation
1. **硬體與雲端的整合**<br>
  使用兩台 ESP32 分別獨立取得各自壓力感測器的數值。並建構了一套經由 Wi-Fi 即時更新 Firebase Realtime Database 上特定值的機制。
2. **即時通訊優化**<br>
  在 p5.js 端實作了 Firebase 監聽器，將資料庫的更新即時反映在遊戲內的 HP 血量條動畫上。
## 現有挑戰與未來展望 | Challenges & Future Work
- **精確度改良**: 目前由於壓力感測器的感應範圍有限，在打擊判斷的準確度上仍存在挑戰。未來計畫透過優化感測器佈局，或改用多組感測器組合成「矩陣結構」等方式進行改良。
- **物理回饋**: 計畫根據擊拳力道的大小，讓畫面上的特效與音效產生更具動態感的變化。
## 實際遊玩
<p align="center">
  <img src="/docs/01-play.png" width="35%" />
  <img src="/docs/02-play.png" width="35%" />
</p>
