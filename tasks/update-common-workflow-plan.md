# update-common ワークフロー計画

このドキュメントは、共通ワークフローの更新計画について説明します。

## 概要

sample ブランチに push があった際に、master ブランチへ自動でプルリクエストを作成する GitHub Actions ワークフロー（.github/workflows/update-common.yml）を作成します。

## ワークフロートリガー

sample ブランチへの push イベントでワークフローがトリガーされます。

## プルリクエスト作成

ワークフローは master ブランチをターゲットにプルリクエストを作成します。
プルリクエストのブランチ名は、作成日時のタイムスタンプを含む "feature/update-common-YYYYMMDD-HHMMSS" の形式とします。

## 除外事項

ワークフロー自身のファイル（.github/workflows/update-common.yml）はプルリクエストの変更から除外されます。つまり、このファイルへの変更は PR に含まれません。

## 追加の詳細

ワークフローは GitHub Actions の公式 API とアクションを使用してプルリクエストを作成します。
ワークフローは冪等性を確保し、エラーを適切に処理します。

## 参考情報

GitHub Actions 公式ドキュメント: https://docs.github.com/ja/actions

## 注意事項

このドキュメントは計画および設計のためのものであり、実装や実際の PR 作成は別の issue で行います。

## 実装例

以下は、GitHub Actions ワークフローの実装例です。

```yaml
name: Update Common Workflow

on:
  push:
    branches:
      - sample

jobs:
  create-pr:
    runs-on: ubuntu-latest
    steps:
      - name: AWS CLI install
        run: |
          curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
          unzip awscliv2.zip
          sudo ./aws/install --update
          aws --version
      
      - name: AWS set Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}
      
      - name: Get Secrets from AWS SecretsManager
        uses: aws-actions/aws-secretsmanager-get-secrets@v2
        with:
          secret-ids: |
            GitHub
          parse-json-secrets: true

      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Git
        run: |
          git config user.name "${{ env.GITHUB_USERNAME }}"
          git config user.email "${{ env.GITHUB_EMAIL }}"

      - name: Create branch
        run: |
          BRANCH_NAME="feature/update-common-$(date +'%Y%m%d-%H%M%S')"
          git checkout -b $BRANCH_NAME

      - name: Remove update-common.yml from changes
        run: |
          git reset .github/workflows/update-common.yml

      - name: Commit changes
        run: |
          git commit -am "Update common workflow"
          git push origin HEAD:$BRANCH_NAME

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ env.GITHUB_PERSONAL_ACCESS_TOKEN }}
          base: master
          head: ${{ github.ref }}
          title: "Update common workflow"
          body: "Auto-generated PR to update common workflow from sample branch."
          draft: false
```

この例では、sample ブランチへの push をトリガーに、master ブランチへ向けたプルリクエストを作成します。
update-common.yml ファイルはコミットから除外されます。

必要に応じて調整してください。

