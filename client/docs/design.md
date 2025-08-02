model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String?
  profileImageUrl String?
  lastLoginAt     DateTime?
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // リレーション
  projects        Project[]
  refreshTokens   RefreshToken[]  // 長期ログイン維持用
  apiUsages       ApiUsage[]
  oauthAccounts   OAuthAccount[]  // 複数OAuth対応
  
  @@map("users")
}

// OAuth アカウント管理（複数プロバイダー対応）
model OAuthAccount {
  id           String   @id @default(cuid())
  userId       String
  provider     String   // "google" | "github" | "discord" etc
  providerId   String   // プロバイダー側のユーザーID
  email        String?  // プロバイダーから取得したメール
  username     String?  // GitHub username等
  accessToken  String?  @db.Text // 必要に応じて暗号化
  refreshToken String?  @db.Text
  expiresAt    DateTime?
  scope        String?  // 取得した権限スコープ
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerId])
  @@unique([userId, provider])  // 1ユーザーにつき1プロバイダー1アカウント
  @@index([userId])
  @@index([provider, email])
  @@map("oauth_accounts")
}

// JWTのリフレッシュトークン管理
model RefreshToken {
  id          String    @id @default(cuid())
  userId      String
  tokenHash   String    @unique // ハッシュ化して保存
  isRevoked   Boolean   @default(false)
  expiresAt   DateTime  // 7日後
  userAgent   String?
  ipAddress   String?
  lastUsedAt  DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, expiresAt])
  @@index([expiresAt])
  @@map("refresh_tokens")
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