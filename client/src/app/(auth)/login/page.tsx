import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">
              ログイン
            </h1>
            <p className="text-stone-600">
              アカウントにログインしてVulcanを利用しましょう
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                placeholder="your-email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                placeholder="パスワードを入力"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-3 px-4 rounded-md hover:bg-stone-800 transition-colors font-medium"
            >
              ログイン
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-stone-600 hover:text-stone-900 hover:underline">
              パスワードを忘れた方はこちら
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center">
            <p className="text-sm text-stone-600">
              アカウントをお持ちでない方は
              <Link
                href="/signup"
                className="text-stone-900 hover:underline ml-1"
              >
                サインアップ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
