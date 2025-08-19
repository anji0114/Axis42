"use client";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Button,
  IconButton,
  Fab,
} from "@mui/material";

import {
  TrendingUp,
  Schedule,
  Assessment,
  Add,
  PriorityHigh,
  BusinessCenter,
  Refresh,
} from "@mui/icons-material";

export default function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: "grey.50" }}>
      {/* ヘッダーセクション */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🌌 Axis42 ダッシュボード
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          意思決定を高速化し、意義ある事業計画を立てるPDM専用OS
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* KPIカード */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">予想ARR影響</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                +2,400万円
              </Typography>
              <Typography variant="body2" color="text.secondary">
                今月のVOC分析結果
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Assessment color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">処理済みVOC</Typography>
              </Box>
              <Typography variant="h4" color="secondary">
                127件
              </Typography>
              <Typography variant="body2" color="text.secondary">
                今週の収集数
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Schedule color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">高優先度案件</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                8件
              </Typography>
              <Typography variant="body2" color="text.secondary">
                アクション待ち
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <BusinessCenter color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">実装完了</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                23件
              </Typography>
              <Typography variant="body2" color="text.secondary">
                今四半期
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* VOC収集セクション */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="📝 VOC収集"
              subheader="顧客の声を収集・整理"
              action={
                <Button variant="contained" startIcon={<Add />} size="small">
                  新規追加
                </Button>
              }
            />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  最新のVOC
                </Typography>
                {[
                  {
                    source: "営業ミーティング",
                    content: "API連携機能の要望（大手クライアント）",
                    impact: "高",
                    date: "2時間前",
                  },
                  {
                    source: "CS問い合わせ",
                    content: "レポート出力の改善要求",
                    impact: "中",
                    date: "5時間前",
                  },
                  {
                    source: "ユーザーインタビュー",
                    content: "モバイル対応の必要性",
                    impact: "高",
                    date: "1日前",
                  },
                ].map((voc, index) => (
                  <Paper
                    key={index}
                    sx={{ p: 2, mb: 1, backgroundColor: "grey.50" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" fontWeight="medium">
                        {voc.content}
                      </Typography>
                      <Chip
                        label={voc.impact}
                        size="small"
                        color={
                          voc.impact === "高"
                            ? "error"
                            : voc.impact === "中"
                            ? "warning"
                            : "default"
                        }
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {voc.source} • {voc.date}
                    </Typography>
                  </Paper>
                ))}
              </Box>
              <Button variant="outlined" fullWidth>
                すべてのVOCを見る
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* インパクトマップセクション */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="📊 インパクトマップ"
              subheader="Impact × Effort 二軸分析"
              action={
                <IconButton size="small">
                  <Refresh />
                </IconButton>
              }
            />
            <CardContent>
              <Box
                sx={{
                  height: 300,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                  p: 2,
                  position: "relative",
                  border: "1px solid",
                  borderColor: "grey.300",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  高インパクト
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  低インパクト
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%) rotate(-90deg)",
                  }}
                >
                  低コスト
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%) rotate(90deg)",
                  }}
                >
                  高コスト
                </Typography>

                {/* サンプルプロット */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    left: "25%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Chip
                    label="API連携"
                    size="small"
                    color="error"
                    icon={<PriorityHigh />}
                  />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: "70%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Chip label="モバイル対応" size="small" color="warning" />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "70%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Chip label="レポート改善" size="small" color="info" />
                </Box>
              </Box>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                詳細マップを開く
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* アクション化セクション */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardHeader
              title="🚀 アクション化"
              subheader="高優先度案件の次のステップ"
            />
            <CardContent>
              <Grid container spacing={2}>
                {[
                  {
                    title: "API連携機能の実装",
                    description: "大手クライアント向けAPI連携機能",
                    impact: "+1,200万円 ARR",
                    effort: "4週間",
                    status: "要件定義中",
                    priority: "最高",
                  },
                  {
                    title: "レポート機能強化",
                    description: "CSからの改善要求対応",
                    impact: "+300万円 ARR",
                    effort: "2週間",
                    status: "開発準備完了",
                    priority: "高",
                  },
                  {
                    title: "モバイル対応",
                    description: "スマホ・タブレット最適化",
                    impact: "+800万円 ARR",
                    effort: "6週間",
                    status: "設計検討中",
                    priority: "中",
                  },
                ].map((action, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        border: "1px solid",
                        borderColor:
                          action.priority === "最高"
                            ? "error.main"
                            : action.priority === "高"
                            ? "warning.main"
                            : "grey.300",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h6" component="h3">
                          {action.title}
                        </Typography>
                        <Chip
                          label={action.priority}
                          size="small"
                          color={
                            action.priority === "最高"
                              ? "error"
                              : action.priority === "高"
                              ? "warning"
                              : "default"
                          }
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {action.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="medium">
                          予想インパクト: {action.impact}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          実装期間: {action.effort}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          状況: {action.status}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        disabled={action.status === "要件定義中"}
                      >
                        {action.status === "開発準備完了"
                          ? "チケット作成"
                          : "詳細を見る"}
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* フローティングアクションボタン */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Add />
      </Fab>
    </Container>
  );
}
