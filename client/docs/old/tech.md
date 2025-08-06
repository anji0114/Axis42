# 🚀 **Project 技術スタック & アーキテクチャ整理**

## ✅ 技術スタック

### フロントエンド

- **Next.js**（Vercelデプロイ）
- TypeScript
- React Query
- Tailwind CSS

### バックエンド

- **Nest.js**
- TypeScript
- REST API
- Prisma (ORM)
- JWT (アクセストークン/リフレッシュトークン)
- bcrypt（パスワードハッシュ化）
- SendMail（メール認証・パスワードリセット用）

### データベース

- PostgreSQL（初期は Supabase DB、将来的に AWS RDS/Aurora へ移行可能）
- Supabase CLI でローカル再現

### ストレージ

- AWS S3（必要に応じて CloudFront）

---

## ✅ インフラ構成

- **Next.js** → Vercel
- **Nest.js** → Railway（将来的に AWS ECS/Fargate に移行）
- **DB** → Supabase（初期）、AWS RDS（将来）
- **ファイル** → S3

---

## ✅ 認証設計

### 認証方式
- **Email + パスワード認証のみ**（Google認証は廃止）
- メールアドレス確認機能あり

### 実装詳細
- **JWT ベース認証**
  - アクセストークン（15分有効）
  - リフレッシュトークン（7日有効、DBで管理）
- **パスワード管理**
  - bcryptでハッシュ化して保存
  - パスワードリセット機能（メール送信）
- **セキュリティ**
  - HTTPOnly Cookie推奨（XSS対策）
  - リフレッシュトークンはハッシュ化してDB保存
  - トークン失効機能（ログアウト時）

---

## ✅ 型共有方針

- Prisma 型は Nest.js 内限定
- フロントは **Swagger (OpenAPI) から型自動生成**
    - ツール: [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
- DTO を Nest.js 側で定義して Swagger スキーマ生成

---

## ✅ ディレクトリ構成（提案）

```
/
├── client/            # Next.js (Vercel)
│   ├── src/
│   ├── pages/
│   ├── tsconfig.json
│   └── package.json
├── api/               # Nest.js (API)
│   ├── src/
│   │    ├── dto/    # APIレスポンス用DTO
│   │    └── ...
│   ├── prisma/    # Prisma schema & generated client
│   ├── tsconfig.json
│   └── package.json
├── supabase/          # Supabase CLI関連（DBスキーマ管理）
│   ├── migrations/
│   ├── config.toml
│   └── .env
├── .gitignore
├── package.json       # 共通スクリプトある場合のみ

```

---

## ✅ その他ポイント

- メールは SendMail（例: nodemailer + SMTP or SES）
- Prisma migration & seeding は Nest.js 内で管理
- 初期コストは月 $10〜$60 程度に抑制可能
- 途中で AWS に移行可能（特にDBとAPI）