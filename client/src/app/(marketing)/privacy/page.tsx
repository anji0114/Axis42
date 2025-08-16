import { BackToTopButton } from "@/features/marketing/components/BackToTopButton";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            プライバシーポリシー
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                1. 個人情報の収集について
              </h2>
              <p>
                当サービスでは、サービスの提供及び向上のために必要な範囲で個人情報を収集いたします。
                収集する個人情報は、利用者様が当サービスを利用する際に提供いただく情報です。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. 収集する情報の種類
              </h2>
              <p>当サービスでは以下の情報を収集する場合があります：</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>利用履歴</li>
                <li>アクセス情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. 個人情報の利用目的
              </h2>
              <p>収集した個人情報は、以下の目的で利用いたします：</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>サービスの提供・運営のため</li>
                <li>ユーザーサポートのため</li>
                <li>サービスの改善・開発のため</li>
                <li>重要なお知らせの配信のため</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. 個人情報の第三者提供
              </h2>
              <p>
                当サービスは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. 個人情報の保護
              </h2>
              <p>
                当サービスは、個人情報の漏洩、滅失、毀損を防止するため、適切な安全管理措置を講じます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Cookie（クッキー）の使用
              </h2>
              <p>
                当サービスでは、サービスの利便性向上のためCookieを使用する場合があります。
                Cookieの設定は、ブラウザの設定により無効にすることが可能です。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. 個人情報の開示・訂正・削除
              </h2>
              <p>
                ご本人から個人情報の開示・訂正・削除等の申し出があった場合、
                本人確認を行った上で適切に対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. プライバシーポリシーの変更
              </h2>
              <p>
                当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. お問い合わせ
              </h2>
              <p>
                本プライバシーポリシーに関するお問い合わせは、当サービスの問い合わせ窓口までご連絡ください。
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">最終更新: 2024年11月</p>
          </div>

          <BackToTopButton />
        </div>
      </div>
    </div>
  );
}
