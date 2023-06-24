# React + MSW + Storybook で始めるフロントエンドテスト

1. [はじめに](#intro)
1. [環境構築](#environment)
1. [Storybook Play function を使ってユーザー操作をテスト](#work1)
1. [MSW を使って Web API のレスポンスをモック](#work2)
1. [@mswjs/data を使ってデータの永続化](#work3)

<a id="intro" ></a>

## はじめに

本ハンズオンでは、MSW + Storybook を使った Integration Test の書き方を解説します。<br />
Integration Test とは「コンポーネントを組み合わせて操作したときに想定した通りに動作するか」を確認するテストです。<br />
詳細は以下の記事が見てみましょう。

> https://qiita.com/noah-dev/items/3fd211deb8711fae8204

具体的にどんなことをテストするの？は以下の記事が参考になります。

> https://engineering.mercari.com/blog/entry/20211208-test-automation-policy-in-merpay-frontend/

<br />

<a id="environment" ></a>

## 環境構築

本リポジトリでは環境構築済みなので、`yarn && yarn storybook || npm install && npm run storybook` で Storybook を立ち上げてください。<br />
各ツールのイントール方法は公式ドキュメントを参照ください。

- [Storybook](https://storybook.js.org/docs/react/get-started/install/)
- [MSW](https://mswjs.io/docs/getting-started/install)
- [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)

<br />

<a id="work1" ></a>

## Storybook Play function を使ってユーザー操作をテスト

以下のファイルを参照してください

```
src/components/Work1/index.stories.tsx
```

> **復習するときの参考情報**
>
> - [Storybook Interaction tests](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
>   - 本項の内容がまとまっています
>   - 復習するときはとりあえずこれから見てください
> - [Testing Library - About Queries](https://testing-library.com/docs/queries/about)
>   - Testing Libray の使い方がまとまっている
>   - とにかく[Priority](https://testing-library.com/docs/queries/about/#priority)を読むべし最重要
> - [await しているのにテストが成功しない](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor)
>   - `waitFor`を使いましょう
> - [アクセシビリティについてふんわり知りたい](https://www.youtube.com/watch?v=ZLL0_W5w1vo&t=782s)
>   - WAI-ARIA 勉強会の動画
>   - とっかかりとしてとても参考になると思います

<br />

<a id="work2" ></a>

## MSW を使って Web API のレスポンスをモック

以下のファイルを参照してください

```
src/components/Work2/index.stories.tsx
src/components/Work2/mocks/handler.ts
```

> **復習するときの参考情報**
>
> - [msw-storybook-addon](https://storybook.js.org/addons/msw-storybook-addon)
>   - Storybook と MSW を連携する拡張機能
>   - MSW の具体的な使い方もこのページにまとまってます

<br />

<a id="work3" ></a>

## MSW を使って Web API のレスポンスをモック

以下のファイルを参照してください

```
src/components/Work3/index.stories.tsx
src/components/Work3/mocks/handler.ts
```

> **復習するときの参考情報**
>
> - [@mswjs/data](https://github.com/mswjs/data)
>   - MSW でデータを永続化するためのライブラリ
>   - より発展的な内容は[こちら](https://zenn.dev/takepepe/articles/msw-data-userflow-testing)をご覧ください
