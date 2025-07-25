# Nest.jsでGoogle認証を実装する完全ガイド

## 🎯 このドキュメントの目的
このドキュメントでは、Nest.jsでGoogle OAuth 2.0認証を実装する方法を、フロントエンドエンジニアにもわかりやすく解説します。
実装を通して、Nest.jsの基本的な構造とパターンを理解できます。

## 📚 目次
1. [認証フローの全体像](#認証フローの全体像)
2. [Nest.jsの基本構造](#nestjsの基本構造)
3. [実装の詳細](#実装の詳細)
4. [環境設定](#環境設定)
5. [動作確認](#動作確認)

## 認証フローの全体像

### 🔄 Google認証の流れ

```mermaid
sequenceDiagram
    participant Browser as ブラウザ
    participant API as Nest.js API
    participant Google as Google
    participant DB as データベース

    Browser->>API: GET /api/auth/google
    API->>Browser: Googleログイン画面へリダイレクト
    Browser->>Google: ユーザーがログイン
    Google->>API: 認証情報を返す
    API->>DB: ユーザー情報を保存/更新
    API->>Browser: Cookieをセットしてフロントへリダイレクト
```

### 🍪 JWT + Cookie認証の仕組み

1. **AccessToken（15分）**: API認証用の短命トークン
2. **RefreshToken（7日）**: AccessToken更新用の長命トークン

両方ともhttpOnly Cookieで管理し、XSS攻撃を防ぎます。

## Nest.jsの基本構造

### 📁 ディレクトリ構成

```
src/
├── auth/                      # 認証関連
│   ├── auth.module.ts        # モジュール定義
│   ├── auth.controller.ts    # ルート定義
│   ├── auth.service.ts       # ビジネスロジック
│   ├── strategies/           # 認証戦略
│   ├── guards/               # ルート保護
│   ├── interfaces/           # 型定義
│   └── dto/                  # データ転送オブジェクト
├── users/                     # ユーザー管理
├── common/                    # 共通コンポーネント
│   └── decorators/           # カスタムデコレータ
└── prisma/                    # DB接続
```

### 🧩 Nest.jsの主要コンポーネント

#### 1. Module（モジュール）
機能をまとめる単位。依存関係を管理します。

```typescript
@Module({
  imports: [...],      // 他のモジュール
  controllers: [...],  // コントローラー
  providers: [...],    // サービス等
  exports: [...]       // 他モジュールに公開
})
```

#### 2. Controller（コントローラー）
HTTPリクエストを受け取り、レスポンスを返します。

```typescript
@Controller('auth')
export class AuthController {
  @Get('google')  // GET /api/auth/google
  async googleAuth() { }
}
```

#### 3. Service（サービス）
ビジネスロジックを実装します。

#### 4. Guard（ガード）
ルートへのアクセスを制御します。

#### 5. Strategy（戦略）
Passportの認証方法を定義します。

## 実装の詳細

### 1️⃣ Google OAuth Strategy

```typescript
// auth/strategies/google.strategy.ts
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Googleから取得したユーザー情報を処理
    return this.authService.validateGoogleUser(profile, accessToken, refreshToken);
  }
}
```

**ポイント**:
- `PassportStrategy`を継承してGoogle認証を実装
- `validate`メソッドでユーザー情報を処理

### 2️⃣ JWT Strategy（Cookie認証）

```typescript
// auth/strategies/jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => req?.cookies?.accessToken,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

**ポイント**:
- CookieからJWTトークンを取得
- トークンを検証してユーザー情報を返す

### 3️⃣ Guards（ルート保護）

```typescript
// auth/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
```

**ポイント**:
- `@Public()`デコレータで公開ルートを指定
- それ以外は認証が必要

### 4️⃣ Auth Controller（エンドポイント）

```typescript
@Controller('auth')
export class AuthController {
  @Public()
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    // Googleへリダイレクト
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res) {
    // 認証成功後の処理
    const tokens = await this.authService.generateTokens(user.id, user.email);
    this.authService.setTokenCookies(res, tokens);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }

  @Post('logout')
  async logout(@CurrentUser() user, @Res() res) {
    // ログアウト処理
  }
}
```

### 5️⃣ カスタムデコレータ

```typescript
// common/decorators/current-user.decorator.ts
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

**使い方**:
```typescript
@Get('me')
async getMe(@CurrentUser() user: { userId: string }) {
  // userにはJWT Strategyで返したユーザー情報が入る
}
```

### 6️⃣ グローバル設定

```typescript
// app.module.ts
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,  // 全ルートに認証を適用
    },
  ],
})
```

## 環境設定

### 📝 必要な環境変数（.env）

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# JWT
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Frontend
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### 📦 必要なパッケージ

```bash
pnpm add @nestjs/passport passport passport-google-oauth20 
pnpm add @nestjs/jwt passport-jwt cookie-parser bcrypt
pnpm add @nestjs/config class-validator class-transformer
```

## 動作確認

### 🧪 認証フローのテスト

1. **Google認証開始**
   ```
   GET http://localhost:3000/api/auth/google
   → Googleログイン画面にリダイレクト
   ```

2. **認証後のコールバック**
   ```
   Googleログイン成功
   → Cookie設定
   → フロントエンドへリダイレクト
   ```

3. **認証が必要なAPIアクセス**
   ```
   GET http://localhost:3000/api/users/me
   → Cookieの認証情報でユーザー情報取得
   ```

### 🐛 よくある問題と解決方法

#### 1. "Unauthorized"エラー
- Cookieが正しく設定されているか確認
- CORS設定で`credentials: true`になっているか確認

#### 2. Google認証でエラー
- Google Cloud ConsoleでリダイレクトURIが設定されているか確認
- 環境変数が正しく設定されているか確認

#### 3. Cookieが保存されない
- フロントエンドで`credentials: 'include'`を設定
- `sameSite`と`secure`の設定を確認

## 🎓 学習のポイント

### 1. デコレータパターン
Nest.jsは`@`で始まるデコレータを多用します。これらは：
- **クラスデコレータ**: `@Module()`, `@Controller()`, `@Injectable()`
- **メソッドデコレータ**: `@Get()`, `@Post()`, `@UseGuards()`
- **パラメータデコレータ**: `@Req()`, `@Res()`, `@CurrentUser()`

### 2. 依存性注入（DI）
サービスはコンストラクタで注入されます：
```typescript
constructor(private authService: AuthService) {}
```

### 3. モジュール設計
機能ごとにモジュールを分割し、必要な部分だけexportします。

### 4. 認証フローの理解
- **認証（Authentication）**: ユーザーが誰かを確認
- **認可（Authorization）**: アクセス権限を確認

## 🚀 次のステップ

1. **リフレッシュトークンの実装**
   - トークン期限切れ時の自動更新

2. **エラーハンドリング**
   - グローバルエラーフィルターの追加

3. **ロギング**
   - Winston等でログ管理

4. **テスト**
   - Jest でユニットテスト・E2Eテスト

## まとめ

このドキュメントで学んだこと：
- ✅ Nest.jsの基本的な構造（Module, Controller, Service）
- ✅ Passport.jsを使った認証実装
- ✅ JWTトークンとCookieの管理
- ✅ Guardによるルート保護
- ✅ カスタムデコレータの作成

これらの知識があれば、他の認証プロバイダー（GitHub、Twitter等）の追加も簡単に実装できます！