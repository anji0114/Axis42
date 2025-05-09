import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white dark:bg-[#0a0a0a] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/inspectNote-logo.svg"
              alt="InspectNote Logo"
              width={180}
              height={45}
              priority
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-[var(--primary)]">
              機能
            </a>
            <a href="#benefits" className="hover:text-[var(--primary)]">
              メリット
            </a>
            <a href="#case-studies" className="hover:text-[var(--primary)]">
              導入事例
            </a>
            <a href="#contact" className="hover:text-[var(--primary)]">
              お問い合わせ
            </a>
          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="hero-section py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                製造業の検査プロセスを
                <br />
                デジタル化する
              </h1>
              <p className="text-xl mb-8">
                InspectNoteは日本の製造業向けに開発された
                <br />
                検査プロセスのDXソリューションです。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="primary-button px-8 py-3 rounded-full text-center font-bold"
                >
                  無料デモを依頼する
                </a>
                <a
                  href="#features"
                  className="secondary-button px-8 py-3 rounded-full text-center font-bold"
                >
                  詳細を見る
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/digital-inspection.svg"
                alt="デジタル検査のイラスト"
                width={500}
                height={375}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 課題セクション */}
      <section className="py-16 bg-[var(--gray-light)]">
        <div className="container mx-auto px-4">
          <h2 className="section-title centered text-3xl font-bold text-center mb-12">
            製造業が抱える検査の課題
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <div className="text-4xl text-[var(--primary)] mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">紙ベースの非効率な検査</h3>
              <p>
                紙の検査票による手作業の記録は時間がかかり、データの再利用や分析が困難です。
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <div className="text-4xl text-[var(--primary)] mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">
                ヒューマンエラーのリスク
              </h3>
              <p>
                手動での検査記録は転記ミスや記入漏れなどのヒューマンエラーが発生しやすい環境です。
              </p>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-md">
              <div className="text-4xl text-[var(--primary)] mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">データ活用の限界</h3>
              <p>
                蓄積された検査データを分析し、品質向上や工程改善に活かすことが困難な状況です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title centered text-3xl font-bold text-center mb-12">
            InspectNoteの主な機能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 feature-grid">
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                デジタル検査票
              </h3>
              <p className="text-center">
                紙の検査票をデジタル化し、タブレットやスマートフォンから簡単に入力できます。検査項目のカスタマイズも可能です。
              </p>
            </div>
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                写真・動画記録
              </h3>
              <p className="text-center">
                検査時の状態を写真や動画で記録し、テキストだけでは伝わりにくい情報も正確に残すことができます。
              </p>
            </div>
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">データ分析</h3>
              <p className="text-center">
                蓄積された検査データをリアルタイムで分析し、品質傾向の可視化や異常の早期発見を支援します。
              </p>
            </div>
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                ユーザー管理
              </h3>
              <p className="text-center">
                検査担当者ごとに権限を設定し、適切なアクセス制御を実現。責任の所在も明確になります。
              </p>
            </div>
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                レポート自動生成
              </h3>
              <p className="text-center">
                検査データから必要なレポートを自動生成。PDF出力や関係者への共有も簡単に行えます。
              </p>
            </div>
            <div className="feature-card bg-white dark:bg-[#1a1a1a] p-6 rounded-lg">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">
                セキュリティ対策
              </h3>
              <p className="text-center">
                重要な検査データを暗号化して保存。厳格なアクセス制御により情報漏洩リスクを最小化します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* メリットセクション */}
      <section id="benefits" className="py-16 bg-[var(--gray-light)]">
        <div className="container mx-auto px-4">
          <h2 className="section-title centered text-3xl font-bold text-center mb-12">
            導入のメリット
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/factory.svg"
                  alt="工場のイラスト"
                  width={200}
                  height={150}
                  className="w-full md:w-auto h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  業務効率の大幅な向上
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>検査時間を最大50%削減</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>紙の使用量を削減し、環境負荷を軽減</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>検査データの検索・参照が瞬時に可能</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/data-analytics.svg"
                  alt="データ分析のイラスト"
                  width={200}
                  height={150}
                  className="w-full md:w-auto h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">品質管理の強化</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>不良率の低減と早期発見</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>データに基づく継続的な改善活動の実現</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>トレーサビリティの向上</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 導入事例セクション */}
      <section id="case-studies" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title centered text-3xl font-bold text-center mb-12">
            導入事例
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-[var(--gray)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-sm text-[var(--primary)] font-bold mb-2">
                  自動車部品メーカー
                </div>
                <h3 className="text-xl font-bold mb-3">A社様</h3>
                <p className="mb-4">
                  検査工程のデジタル化により、月間の不良率を3.2%から1.5%に削減。作業効率も向上し、検査時間を40%短縮しました。
                </p>
                <div className="flex justify-between text-sm">
                  <span>導入規模: 5工場</span>
                  <span>導入期間: 3ヶ月</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-[var(--gray)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-sm text-[var(--primary)] font-bold mb-2">
                  電子機器メーカー
                </div>
                <h3 className="text-xl font-bold mb-3">B社様</h3>
                <p className="mb-4">
                  検査データの分析により、製品不良の原因を特定。改善策の実施後、顧客クレームが60%減少しました。
                </p>
                <div className="flex justify-between text-sm">
                  <span>導入規模: 2工場</span>
                  <span>導入期間: 2ヶ月</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-[var(--gray)] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <div className="p-6">
                <div className="text-sm text-[var(--primary)] font-bold mb-2">
                  精密機械メーカー
                </div>
                <h3 className="text-xl font-bold mb-3">C社様</h3>
                <p className="mb-4">
                  検査レポートの自動生成により、月間40時間の事務作業を削減。データの正確性も向上しました。
                </p>
                <div className="flex justify-between text-sm">
                  <span>導入規模: 1工場</span>
                  <span>導入期間: 1ヶ月</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section className="py-16 bg-[var(--gray-light)]">
        <div className="container mx-auto px-4">
          <h2 className="section-title centered text-3xl font-bold text-center mb-12">
            料金プラン
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md">
              <div className="p-6 bg-[var(--primary)] text-white text-center">
                <h3 className="text-2xl font-bold">スタータープラン</h3>
                <div className="text-3xl font-bold mt-2">
                  ¥50,000<span className="text-sm font-normal">/月</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>ユーザー数: 10名まで</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>検査データ保存: 10GB</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>基本機能のみ</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>メールサポート</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a
                    href="#contact"
                    className="block w-full py-3 text-center rounded-full primary-button font-bold"
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transform scale-105 z-10">
              <div className="p-6 bg-[var(--secondary)] text-white text-center">
                <h3 className="text-2xl font-bold">ビジネスプラン</h3>
                <div className="text-3xl font-bold mt-2">
                  ¥100,000<span className="text-sm font-normal">/月</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>ユーザー数: 30名まで</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>検査データ保存: 50GB</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-[var(--secondary)] mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>全機能利用可能</span>
                  </li>
                  <li className="flex items-start"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
