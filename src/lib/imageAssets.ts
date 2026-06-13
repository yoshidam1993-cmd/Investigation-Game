/**
 * Game Image Assets
 * 漏水探偵ゲーム用の画像アセットURL管理
 * 将来的にAI画像への差し替え可能な構造
 */

export const gameImages = {
  // オープニング演出
  mansionExterior: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-mansion-exterior-hPA9vX4M7Ad66X2gHft6Pb.webp",
  waterLeakRoom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-water-leak-room-MSadCW3iuK9gAQKCKbeQtf.webp",
  worriedResident: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-worried-resident-kpK3opeZaZdFVynj5yuje7.webp",

  // STEP演出
  interviewScene: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-interview-scene-2G4VCd3DAQjrGkmBHUdHno.webp",
  upstairsInterview: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-upstairs-interview-jFQFY4pHVt8aMarfHRjKa2.webp",

  // 調査演出
  pressureTest: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-pressure-test-CVH6ihS7sgHxD4YuroJfag.webp",
  failedDemolition: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-failed-demolition-jHagRY8uoNev8boUtQwQuC.webp",
  causeIdentified: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-cause-identified-HLzxckLQXkS9vcJm5khzhe.webp",

  // エンディング
  endingSuccess: "https://d2xsxph8kpxj0f.cloudfront.net/310519663745228853/BabAf8SNGGTSZotMSbNyn2/case001-ending-success-fHmoyagaWoQh9z8KFKaosD.webp",
};

/**
 * シナリオデータ内で使用する画像キーの型定義
 * JSONシナリオから参照される
 */
export type ImageKey = keyof typeof gameImages;

/**
 * 画像キーから画像URLを取得
 * @param key 画像キー
 * @returns 画像URL
 */
export function getImageUrl(key: ImageKey): string {
  return gameImages[key];
}
