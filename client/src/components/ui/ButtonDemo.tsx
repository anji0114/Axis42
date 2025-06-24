import React from "react";
import { Button } from "./Button";

/**
 * ボタンコンポーネントの使用例を示すデモコンポーネント
 */
export const ButtonDemo: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">バリアント</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">プライマリボタン</Button>
          <Button variant="secondary">セカンダリボタン</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">サイズ</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">丸みを帯びた形状</h2>
        <div className="flex flex-wrap gap-4">
          <Button rounded>丸みを帯びたボタン</Button>
          <Button variant="secondary" rounded>
            丸みを帯びたボタン
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">無効状態</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>無効状態</Button>
          <Button variant="secondary" disabled>
            無効状態
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">アイコン付き</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            }
          >
            前方アイコン
          </Button>
          <Button
            variant="secondary"
            endIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            }
          >
            後方アイコン
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">リンクボタン</h2>
        <div className="flex flex-wrap gap-4">
          <Button href="#">リンクボタン</Button>
          <Button variant="secondary" href="#">
            リンクボタン
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">幅いっぱい</h2>
        <Button fullWidth>幅いっぱいのボタン</Button>
        <Button variant="secondary" fullWidth>
          幅いっぱいのボタン
        </Button>
      </div>
    </div>
  );
};

export default ButtonDemo;
