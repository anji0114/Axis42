"use client";
import { Button, Typography, Link } from "@mui/material";
import Image from "next/image";

const SignupPage = () => {
  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3300/api/auth/google";
  };

  return (
    <div className="min-h-screen flex">
      {/* 左側のコンテンツ */}
      <div className="flex-1 relative">
        {/* サイトアイコン - ヘッダーとして左上に配置 */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <Image src="/logo/axis42.svg" alt="Axis42" width={24} height={23} />
          </div>
        </div>

        {/* 中央のコンテンツ */}
        <div className="flex flex-col justify-center items-center min-h-screen px-8">
          <div className="w-full max-w-md text-center">
            {/* Welcome メッセージ */}
            <div className="mb-8">
              <Typography variant="h3" fontFamily="var(--font-roboto)">
                Welcome to Axis42
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontFamily="var(--font-roboto)"
              >
                Vertical Product Management AI Agent
              </Typography>
            </div>

            {/* Googleログインボタン */}
            <div className="mb-8">
              <Button
                variant="outlined"
                fullWidth
                size="large"
                sx={{
                  gap: 1,
                  fontWeight: 600,
                }}
                onClick={handleGoogleSignup}
              >
                <Image
                  src="/logo/google.svg"
                  alt="Google"
                  width={24}
                  height={24}
                />
                Googleでログイン
              </Button>
            </div>

            {/* 利用規約などのリンク */}
            <div className="text-center text-sm text-gray-600 leading-relaxed">
              続行することにより、
              <Link href="/terms">利用規約</Link>
              および
              <Link href="/privacy">プライバシーポリシー</Link>
              <br />
              に同意したものとみなされます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
