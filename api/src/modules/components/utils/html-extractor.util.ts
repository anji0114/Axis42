/**
 * AIレスポンスからHTMLタグのみを抽出するユーティリティ関数
 * <html>...</html>部分のみを取得し、それ以外の説明文やマークダウンを除去
 */
export const extractHtmlContent = (aiResponse: string): string => {
  // <html>タグの開始位置を検索
  const htmlStartMatch = aiResponse.match(/<html[^>]*>/i);
  if (!htmlStartMatch) {
    // <html>タグがない場合は空文字を返す
    return '';
  }

  const htmlStartIndex = htmlStartMatch.index!;

  // </html>タグの終了位置を検索
  const htmlEndMatch = aiResponse.match(/<\/html>/i);
  if (!htmlEndMatch) {
    // 閉じタグがない場合は開始タグから最後まで
    return aiResponse.substring(htmlStartIndex);
  }

  const htmlEndIndex = htmlEndMatch.index! + htmlEndMatch[0].length;

  // <html>から</html>までを抽出
  return aiResponse.substring(htmlStartIndex, htmlEndIndex);
};
