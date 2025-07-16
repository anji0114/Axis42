# 🚀 **Project 技術スタック & アーキテクチャ整理**

## ✅ 技術スタック

### フロントエンド

- **Next.js**（Vercelデプロイ）
- TypeScript
- React Query
- Tailwind CSS
- Google OAuth (Only)

### バックエンド

- **Nest.js**
- TypeScript
- REST API
- Prisma (ORM)
- Google OAuth（Passport.js + Google Strategy）
- SendMail（通知メールのみ、ユーザー管理には使わない）

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

- Google OAuth のみ（メール・パスワード登録なし）
- Nest.js 側で Passport.js + Google Strategy を使い、JWT 発行
- フロントは JWT を Cookie または localStorage に保存

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
│   │    ├── auth/   # Google Strategy & Passport
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