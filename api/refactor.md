# Google認証リファクタリング計画

  ## 現在の課題

  1. **ディレクトリ構造の問題**
     - user関連の処理がauth配下にある
     - auth/profileエンドポイントが意味的に不適切

  2. **責務の分離不足**
     - UserServiceがauth配下にある
     - 認証と認可の処理が混在

  3. **型定義の散在**
     - JWTペイロードの型が統一されていない
     - req.userの型が曖昧

  ## リファクタリング計画

  ### 1. ディレクトリ構造の再編成

  src/
  ├── auth/                    # 認証関連のみ
  │   ├── auth.module.ts
  │   ├── auth.controller.ts   # /auth/google, /auth/google/callback, /auth/logout
  │   ├── auth.service.ts      # JWT生成のみ
  │   └── strategies/
  │       ├── google.strategy.ts
  │       └── jwt.strategy.ts
  │
  ├── users/                   # ユーザー関連
  │   ├── users.module.ts
  │   ├── users.controller.ts  # /users/me（旧/auth/profile）
  │   └── users.service.ts     # findOrCreateUser, findById
  │
  ├── common/                  # 共通部分
  │   ├── guards/
  │   │   └── jwt-auth.guard.ts
  │   ├── decorators/
  │   │   └── current-user.decorator.ts
  │   └── types/
  │       └── auth.types.ts    # JwtPayload, AuthRequest等
  │
  └── config/
      └── jwt.config.ts        # JWT設定の一元管理

  ### 2. エンドポイントの整理

  **Before:**
  - GET /api/auth/google - Google認証開始
  - GET /api/auth/google/callback - コールバック
  - GET /api/auth/profile - ユーザー情報取得
  - GET /api/auth/logout - ログアウト

  **After:**
  - GET /api/auth/google - Google認証開始
  - GET /api/auth/google/callback - コールバック
  - GET /api/auth/logout - ログアウト
  - GET /api/users/me - 現在のユーザー情報取得 ✨NEW

  ### 3. 型定義の統一

  **src/common/types/auth.types.ts:**
  ```typescript
  export interface JwtPayload {
    sub: string;    // userId
    email: string;
    name: string;
  }

  export interface AuthRequest extends Request {
    user: {
      userId: string;
      email: string;
      name: string;
    };
  }

  4. カスタムデコレーターの追加

  src/common/decorators/current-user.decorator.ts:
  import { createParamDecorator, ExecutionContext } from '@nestjs/common';

  export const CurrentUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      if (data) {
        return request.user[data];
      }
      return request.user;
    },
  );

  使用例：
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: JwtPayload) {
    // req.userを直接触らずに済む
  }

  5. JWTガードの共通化

  src/common/guards/jwt-auth.guard.ts:
  import { Injectable } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';

  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {}

  6. 設定の一元管理

  src/config/jwt.config.ts:
  export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  };

  実装順序

  1. Phase 1: 新しいモジュール作成
    - users.module.ts, users.controller.ts, users.service.ts作成
    - 既存のUserService機能を移行
  2. Phase 2: 共通部分の切り出し
    - common/types, guards, decorators作成
    - 型定義を統一
  3. Phase 3: 既存コードの更新
    - AuthModuleからユーザー関連を削除
    - importパスの更新
    - エンドポイントのテスト
  4. Phase 4: クリーンアップ
    - 不要なファイルの削除
    - ドキュメントの更新

  期待される効果

  1. 責務の明確化: 認証は認証、ユーザー管理はユーザー管理
  2. 再利用性の向上: ガードやデコレーターの共通化
  3. 保守性の向上: 型安全性の確保
  4. 拡張性: 将来的な機能追加が容易に