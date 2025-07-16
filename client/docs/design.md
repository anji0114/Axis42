# AIプロトタイピングアプリ - 設計ドキュメント

## 概要

AIを活用して超高速で「触れるプロトタイプ」を生成することに特化したアプリケーション。スタートアップの営業提案、投資家デモ、チーム内での意思決定加速を目的とする。

## システム要件と設計方針

### 基本方針
- MVPは「一発生成 → 即プレビュー → 必要なら作り直し」というシンプルなフローに集中
- 初期生成は最小限のHTML/CSS/JSに限定し、軽量かつ即動くものを重視
- 将来的にReact/Next.js等のフレームワークに対応可能な拡張性を持つ設計

### 権限管理
- 現段階では作成者のみがアクセス可能
- 共有機能は後回し（将来的にチーム機能として実装予定）

### AI生成とコード管理
- プロンプトや設定は紐づくファンクションまたはバリエーションに保存
- bolt.newやv0を参考にしたファイルベースのコード管理
- 初期は共通実行環境、将来的に独立環境へ移行可能な設計
- **AI API**: Claude APIを使用（Anthropic）
- **レート制御**: ユーザーごとの生成回数制限とキューイング機能

### ファイルストレージ
- **ハイブリッドストレージアプローチ**を採用
- 小さなテキストファイル（HTML/CSS/JS）: DBに直接保存
- 大きなファイルや画像: S3に保存し、URLをDBに記録
- 閾値: 1MB以上のファイルはS3へ
- プレビュー用の静的ファイル: S3 + CloudFront CDN

### プレビュー実装
- **iframe サンドボックス方式**を採用
- 生成されたコードを安全に実行するため、iframeでサンドボックス化
- srcdoc属性を使用してHTML/CSS/JSを直接埋め込み（小さいファイル）
- 大きなファイルはS3からCDN経由で配信
- CSP（Content Security Policy）で安全性を確保

### 認証設計

#### 認証方式の選定
シンプルなJWT方式を採用：複雑性を避けるためNextAuth.jsは使用せず、Next.jsフロントエンドとNest.js APIで役割を分担。

#### 認証フロー
1. **初回ログイン**
   - Next.jsフロントエンドからGoogle OAuth認証画面へリダイレクト
   - Google認証成功後、Nest.js APIの`/auth/google/callback`へリダイレクト
   - Nest.js側でユーザー作成/更新、JWT（Access Token）とRefresh Token発行
   - JWTをHttpOnly Cookieに設定してフロントエンドへリダイレクト
   - Refresh TokenはDBに暗号化して保存

2. **API認証**
   - すべてのAPI呼び出しでHttpOnly CookieのJWTを自動送信
   - Nest.js側でJWT検証ミドルウェアが認証
   - 有効期限切れの場合はRefresh Tokenで新しいJWTを発行

3. **トークン管理**
   - Access Token: HttpOnly Cookieで管理（ブラウザ側）
   - Refresh Token: DBにハッシュ化して保存（サーバー側）
   - ログアウト時はCookieクリアとDBのRefresh Token削除

#### セキュリティ考慮事項
- Refresh Tokenはハッシュ化してDBに保存（復元不可）
- JWTの有効期限は短め（15分）に設定
- HttpOnly Cookie使用でXSS対策
- SameSite Cookie属性でCSRF対策
- HTTPS通信の強制
- Refresh Token無効化機能（ログアウト時）

## データモデル設計

### エンティティ構造

```
User（ユーザー）
├── RefreshToken（リフレッシュトークン）
├── Project（プロジェクト）
│   ├── Module（モジュール - 将来実装）
│   └── Function（機能・UIコンポーネント）
│       ├── ModuleFunction（モジュールとの関連 - 将来実装）
│       └── Variation（バリエーション・提案パターン）
│           ├── GeneratedFile（生成ファイル）
│           └── PreviewConfig（プレビュー設定）
└── ApiUsage（API使用状況 - レート制御用）
```

### テーブル設計

#### User（ユーザー）
- id: 一意識別子
- email: メールアドレス（ユニーク）
- name: 名前
- googleId: Google OAuth ID（ユニーク）
- profileImageUrl: プロフィール画像URL
- lastLoginAt: 最終ログイン日時
- isActive: アカウント有効フラグ
- createdAt/updatedAt: タイムスタンプ

#### RefreshToken（リフレッシュトークン管理）
- id: 一意識別子
- userId: ユーザーID（Userへの外部キー）
- tokenHash: リフレッシュトークン（ハッシュ化）
- isRevoked: 無効化フラグ
- expiresAt: 有効期限
- userAgent: ユーザーエージェント
- ipAddress: IPアドレス
- createdAt/updatedAt: タイムスタンプ

#### ApiUsage（API使用状況）
- id: 一意識別子
- userId: ユーザーID（Userへの外部キー）
- endpoint: APIエンドポイント（例: "/ai/generate"）
- count: 使用回数
- windowStart: ウィンドウ開始時刻
- windowEnd: ウィンドウ終了時刻
- createdAt/updatedAt: タイムスタンプ

#### Project（プロジェクト）
- id: 一意識別子
- name: プロジェクト名
- description: 説明
- userId: 所有者（Userへの外部キー）
- createdAt/updatedAt: タイムスタンプ

#### Function（機能）
- id: 一意識別子
- name: 機能名
- description: 説明
- projectId: 所属プロジェクト（Projectへの外部キー）
- createdAt/updatedAt: タイムスタンプ

#### Variation（バリエーション）
- id: 一意識別子
- name: バリエーション名
- description: 説明
- functionId: 所属機能（Functionへの外部キー）
- prompt: AI生成に使用したプロンプト
- aiModel: 使用したAIモデル
- framework: フレームワーク（vanilla/react/nextjs等）
- isActive: 有効フラグ
- createdAt/updatedAt: タイムスタンプ

#### GeneratedFile（生成ファイル）
- id: 一意識別子
- variationId: 所属バリエーション（Variationへの外部キー）
- filePath: ファイルパス（例: "index.html", "components/Button.tsx"）
- fileName: ファイル名
- content: ファイル内容（1MB未満の場合）
- s3Key: S3のキー（1MB以上の場合）
- fileSize: ファイルサイズ（バイト）
- mimeType: MIMEタイプ（text/html, text/css等）
- storageType: ストレージタイプ（"db" or "s3"）
- createdAt/updatedAt: タイムスタンプ

#### PreviewConfig（プレビュー設定）
- id: 一意識別子
- variationId: 所属バリエーション（Variationへの外部キー、ユニーク）
- entryPoint: エントリーポイント（デフォルト: "index.html"）
- buildCommand: ビルドコマンド（将来用）
- dependencies: 依存関係JSON（将来用）
- envVariables: 環境変数JSON（将来用）
- createdAt/updatedAt: タイムスタンプ

#### GenerationHistory（AI生成履歴）
- id: 一意識別子
- variationId: 所属バリエーション（Variationへの外部キー）
- prompt: 使用したプロンプト
- requestTokens: リクエストトークン数
- responseTokens: レスポンストークン数
- status: 生成ステータス（success/failed/cancelled）
- error: エラーメッセージ（失敗時）
- createdAt: 生成日時

## 技術スタック

### フロントエンド
- Next.js（Vercelデプロイ）
- TypeScript
- React Query / TanStack Query
- Tailwind CSS
- axios（HTTP クライアント、Cookie対応）

### バックエンド
- Nest.js
- TypeScript
- REST API
- Prisma ORM
- JWT認証（@nestjs/jwt）
- Passport.js + Google Strategy（OAuth）
- crypto（トークン暗号化）
- Bull（ジョブキューイング - レート制御用）
- Claude API SDK（@anthropic-ai/sdk）

### データベース・インフラ
- PostgreSQL（初期はSupabase、将来的にAWS RDS/Aurora）
- AWS S3（ストレージ）
- Railway（Nest.js、将来的にAWS ECS/Fargate）

## 拡張性の考慮事項

1. **フレームワーク対応**
   - frameworkフィールドで将来のReact/Next.js対応を準備
   - ファイルベース管理により複数ファイルの生成に対応

2. **実行環境の分離**
   - PreviewConfigで将来の独立環境への移行を準備
   - dependencies、buildCommand、envVariablesを予約

3. **チーム機能**
   - 現在は個人利用のみだが、テーブル構造は将来の拡張を考慮
   - プロジェクトレベルでの権限管理を追加可能

4. **モジュール機能（将来実装）**
   - Module、ModuleFunctionテーブルの追加で対応可能
   - 複数のファンクションをグループ化
   - 再利用可能なコンポーネントライブラリとして機能

## MVP実装優先順位

1. Google OAuth認証（Nest.js Passport + JWT）
2. 基本的なCRUD機能（Project/Function/Variation）
3. AI生成機能（Claude API、HTML/CSS/JS）
4. ファイル保存・管理（ハイブリッドストレージ）
5. プレビュー機能（共通環境）
6. レート制御機能（API使用制限）

## 将来の拡張計画

- コード編集機能（Monaco Editor等）
- チーム・権限管理
- React/Vue/Next.js対応
- 独立実行環境
- MCP連携
- AIチューニング機能

## Prismaスキーマ定義

```prisma
// ユーザー管理
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  googleId        String    @unique
  profileImageUrl String?
  lastLoginAt     DateTime?
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  projects        Project[]
  refreshTokens   RefreshToken[]
  apiUsages       ApiUsage[]
}

// リフレッシュトークン管理
model RefreshToken {
  id          String    @id @default(cuid())
  userId      String
  tokenHash   String    @unique // ハッシュ化して保存
  isRevoked   Boolean   @default(false) // 無効化フラグ
  expiresAt   DateTime
  userAgent   String?
  ipAddress   String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, expiresAt])
}

// API使用状況（レート制御用）
model ApiUsage {
  id          String    @id @default(cuid())
  userId      String
  endpoint    String    // 例: "/ai/generate"
  count       Int       @default(1)
  windowStart DateTime  // ウィンドウ開始時刻
  windowEnd   DateTime  // ウィンドウ終了時刻
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, endpoint, windowStart])
  @@index([userId, windowStart])
  @@index([windowEnd]) // 期限切れレコードの削除用
}

// プロジェクト
model Project {
  id          String    @id @default(cuid())
  name        String
  description String?
  userId      String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  functions   Function[]
  
  @@index([userId, createdAt]) // ユーザーのプロジェクト一覧取得用
}

// ファンクション（機能）
model Function {
  id          String    @id @default(cuid())
  name        String
  description String?
  projectId   String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  project     Project     @relation(fields: [projectId], references: [id], onDelete: Cascade)
  variations  Variation[]
}

// バリエーション
model Variation {
  id            String    @id @default(cuid())
  name          String
  description   String?
  functionId    String
  prompt        String    @db.Text
  aiModel       String?
  framework     String    @default("vanilla")
  isActive      Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  function      Function  @relation(fields: [functionId], references: [id], onDelete: Cascade)
  files         GeneratedFile[]
  previewConfig PreviewConfig?
  generations   GenerationHistory[]
  
  @@index([functionId, isActive]) // アクティブなバリエーション検索用
}

// 生成ファイル
model GeneratedFile {
  id          String    @id @default(cuid())
  variationId String
  filePath    String
  fileName    String    
  content     String?   @db.Text // 1MB未満の場合のみ使用
  s3Key       String?   // S3のキー（1MB以上の場合）
  fileSize    Int       // ファイルサイズ（バイト）
  mimeType    String    // MIMEタイプ（text/html, text/css等）
  storageType String    @default("db") // "db" or "s3"
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  variation   Variation @relation(fields: [variationId], references: [id], onDelete: Cascade)
  
  @@unique([variationId, filePath]) // 重複防止
  @@index([variationId, filePath])
}

// プレビュー設定
model PreviewConfig {
  id            String    @id @default(cuid())
  variationId   String    @unique
  entryPoint    String    @default("index.html")
  buildCommand  String?
  dependencies  Json?
  envVariables  Json?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  variation     Variation @relation(fields: [variationId], references: [id], onDelete: Cascade)
}

// AI生成履歴
model GenerationHistory {
  id            String    @id @default(cuid())
  variationId   String
  prompt        String    @db.Text
  requestTokens Int       // リクエストトークン数
  responseTokens Int      // レスポンストークン数
  status        String    @default("success") // success, failed, cancelled
  error         String?   @db.Text
  createdAt     DateTime  @default(now())
  
  variation     Variation @relation(fields: [variationId], references: [id], onDelete: Cascade)
  
  @@index([variationId, createdAt])
}

// === 将来実装予定のテーブル ===

// モジュール（複数のファンクションをグループ化）
// model Module {
//   id          String    @id @default(cuid())
//   projectId   String
//   name        String
//   description String?
//   createdAt   DateTime  @default(now())
//   updatedAt   DateTime  @updatedAt
//   
//   project     Project    @relation(fields: [projectId], references: [id], onDelete: Cascade)
//   functions   ModuleFunction[]
// }

// モジュールとファンクションの関連
// model ModuleFunction {
//   id         String    @id @default(cuid())
//   moduleId   String
//   functionId String
//   order      Int       // 表示順序
//   createdAt  DateTime  @default(now())
//   
//   module     Module    @relation(fields: [moduleId], references: [id], onDelete: Cascade)
//   function   Function  @relation(fields: [functionId], references: [id], onDelete: Cascade)
//   
//   @@unique([moduleId, functionId])
// }
```