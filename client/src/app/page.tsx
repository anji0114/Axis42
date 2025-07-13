import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-sky-600">AI Support</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
            >
              サインアップ
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  return (
    <section className="bg-white pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            カスタマーサポートの未来を
            <span className="text-sky-600 block mt-2">AIと共に創る</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            最新のAI技術で、お客様の問い合わせに24時間365日対応。
            サポート業務の効率化と顧客満足度の向上を実現します。
          </p>
          <button className="bg-sky-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-700 transition-colors shadow-lg">
            無料で試してみる
          </button>
        </div>
      </div>
    </section>
  );
};

const ChallengesSection = () => {
  const challenges = [
    {
      title: "24時間対応の実現",
      description:
        "深夜や休日でも、AIエージェントが即座に対応。お客様を待たせません。",
      icon: "🕐",
    },
    {
      title: "対応品質の均一化",
      description:
        "AIによる一貫した高品質な対応で、サービスレベルを保証します。",
      icon: "✨",
    },
    {
      title: "コスト削減",
      description: "人件費を大幅に削減しながら、サポート体制を強化できます。",
      icon: "💰",
    },
    {
      title: "多言語対応",
      description:
        "日本語はもちろん、英語・中国語など多言語でのサポートが可能です。",
      icon: "🌍",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            こんな課題を解決します
          </h2>
          <p className="text-lg text-gray-600">
            AIエージェントが、カスタマーサポートの様々な課題を解決します
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{challenge.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {challenge.title}
              </h3>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="bg-sky-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          今すぐAIカスタマーサポートを始めましょう
        </h2>
        <p className="text-xl text-sky-100 mb-8">
          14日間の無料トライアルで、AIの力を体験してください
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            無料トライアルを開始
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors">
            資料請求
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              AI Support
            </h3>
            <p className="text-sm">
              次世代のカスタマーサポートを AIテクノロジーで実現
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">製品</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  機能一覧
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  料金プラン
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  導入事例
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">サポート</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ヘルプセンター
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">会社情報</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  採用情報
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2024 AI Support. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ChallengesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
