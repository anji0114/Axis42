import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-stone-900">Vulcan</div>
            <div className="flex gap-4">
              <Link href="/login" className="px-4 py-2 text-stone-900 hover:text-stone-700 transition-colors">
                ログイン
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors">
                会員登録
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-stone-900 mb-6">
            AIで超高速プロトタイプ生成
          </h1>
          <p className="text-xl text-stone-700 mb-8">
            アイデアを数分で触れるプロトタイプに変換。チームの意思決定を加速させます。
          </p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-stone-900 text-white text-lg rounded-md hover:bg-stone-800 transition-colors">
            無料で始める
          </Link>
        </div>
      </section>

      {/* 価値提案セクション */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">
            Vulcanの3つの価値
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-4">最速生成</h3>
              <p className="text-stone-700">
                プロンプト入力から数分で、実際に動作するプロトタイプを自動生成
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-4">即座に共有</h3>
              <p className="text-stone-700">
                URLひとつでチームメンバーや顧客と共有。リアルタイムで議論可能
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-stone-900 mb-4">簡単切り替え</h3>
              <p className="text-stone-700">
                複数のデザインパターンを瞬時に切り替えて、最適な案を発見
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ターゲット別メリット */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">
            あらゆるチームの課題を解決
          </h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">スタートアップ</h3>
                <p className="text-stone-700">
                  投資家向けデモを即座に作成。アイデアを形にして資金調達を加速
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">営業チーム</h3>
                <p className="text-stone-700">
                  顧客提案を視覚化して受注率向上。その場でカスタマイズも可能
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">企画チーム</h3>
                <p className="text-stone-700">
                  アイデアを形にして意思決定を加速。社内合意をスムーズに
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-12">
            強力な機能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900 mb-4">AI生成</h3>
              <p className="text-stone-700">
                プロンプトから即座にプロトタイプ生成
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900 mb-4">モジュール管理</h3>
              <p className="text-stone-700">
                機能単位で再利用・改善
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-stone-900 mb-4">パターン比較</h3>
              <p className="text-stone-700">
                複数案を並べて最適解を発見
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-8">
            今すぐプロトタイプ作成を始めましょう
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-4 bg-stone-900 text-white text-lg rounded-md hover:bg-stone-800 transition-colors text-center">
              無料で始める
            </Link>
            <Link href="/login" className="px-8 py-4 border-2 border-stone-900 text-stone-900 text-lg rounded-md hover:bg-stone-100 transition-colors text-center">
              ログイン
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-stone-600">
              © 2024 Vulcan. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-stone-600 hover:text-stone-900 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-stone-600 hover:text-stone-900 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
