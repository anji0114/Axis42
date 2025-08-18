import { BackToTopButton } from "@/features/marketing/components/BackToTopButton";
import { Box, Typography } from "@mui/material";

export default function TermsPage() {
  return (
    <Box bgcolor="background.default" pt={5}>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第1条（適用）
              </h2>
              <p>
                この利用規約（以下「本規約」）は、当社が提供するサービス（以下「本サービス」）の利用条件を定めるものです。
                登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第2条（利用登録）
              </h2>
              <p>
                本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、
                当社がこれを承認することによって、利用登録が完了するものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第3条（ユーザーIDおよびパスワードの管理）
              </h2>
              <p>
                ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、
                もしくは第三者と共用することはできません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第4条（利用料金および支払方法）
              </h2>
              <p>
                ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、
                当社が指定する方法により支払うものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第5条（禁止事項）
              </h2>
              <p>
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>
                  当社、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第6条（本サービスの提供の停止等）
              </h2>
              <p>
                当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第7条（保証の否認および免責事項）
              </h2>
              <p>
                当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、
                セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第8条（サービス内容の変更等）
              </h2>
              <p>
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、
                これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第9条（利用規約の変更）
              </h2>
              <p>
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
                なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                第10条（準拠法・裁判管轄）
              </h2>
              <p>
                本規約の解釈にあたっては、日本法を準拠法とします。
                本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Typography color="text.secondary">
              最終更新日: 2024年1月1日
            </Typography>
          </div>

          <BackToTopButton />
        </div>
      </div>
    </Box>
  );
}
