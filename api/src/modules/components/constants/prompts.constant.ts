/**
 * AIプロンプトテンプレート定数
 */
export const PROMPT_TEMPLATES = {
  /**
   * コンポーネント更新用プロンプト
   */
  UPDATE_COMPONENT: (
    prompt: string,
    currentContent: string,
    framework: string,
  ) => `以下のHTMLコードを修正してください：

修正要求：${prompt}

現在のコード：
${currentContent}

フレームワーク: ${framework}

注意：HTMLコード以外は一切出力しないでください。`,

  /**
   * 空のコンポーネント用デフォルトHTML
   */
  DEFAULT_HTML:
    '<html><head><title>New Component</title></head><body></body></html>',
} as const;
