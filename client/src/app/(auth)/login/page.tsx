"use client";
import { Button, Typography, Link, Box } from "@mui/material";
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
          <Link href="/">
            <Image src="/logo/axis42.svg" alt="Axis42" width={24} height={24} />
          </Link>
        </div>

        {/* 中央のコンテンツ */}
        <div className="flex flex-col justify-center items-center min-h-screen px-8">
          <div className="w-full max-w-lg text-center">
            <Box>
              <Typography
                variant="h3"
                fontWeight={700}
                fontFamily="var(--font-inter)"
              >
                Welcome to Axis42
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                fontFamily="var(--font-inter)"
              >
                Vertical Product Management AI Agent
              </Typography>
            </Box>

            {/* Googleログインボタン */}
            <Box mt={2}>
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
            </Box>

            {/* 利用規約などのリンク */}
            <Box textAlign="center" mt={2}>
              続行することにより、
              <Link href="/terms">利用規約</Link>
              および
              <Link href="/privacy">プライバシーポリシー</Link>
              <br />
              に同意したものとみなされます。
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
