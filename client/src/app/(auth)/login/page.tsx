import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              Vulcanへログイン
            </h1>
            <p className="text-stone-600">
              アカウントを作成してプロトタイプ作成を始めましょう。
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-stone-700 font-medium">Googleでログイン</span>
          </button>

          <div className="mt-6 text-center text-sm text-stone-600">
            アカウント登録またはログインにより、
            <Link href="/terms" className="text-stone-900 hover:underline">
              利用規約
            </Link>
            および
            <Link href="/privacy" className="text-stone-900 hover:underline">
              プライバシーポリシー
            </Link>
            に同意したものとみなされます。
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-sm text-stone-600">
              すでにアカウントをお持ちの方は
              <Link
                href="/signup"
                className="text-stone-900 hover:underline ml-1"
              >
                アカウントを作成
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
