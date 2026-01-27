# sil-web

Web site for Social Intelligence Laboratory

## コーディングルール

### 変数にはキャメルケースを採用

`coding rule`という変数を作る場合、`codingRule`という記述になる。

> キャメルケース：変数の最初の文字は小文字で"\_"を使わずに単語を繋ぐ。各単語の頭を大文字、他を小文字。

### 定数にはアッパースネークケースを採用

`教授名：村上陽平`といった定数を作る場合、`PROFESSOR_NAME`:村上陽平といった記述になる

> アッパースネークケース：全ての文字を大文字で、単語間を"\_"を使って繋ぐ。

### フォーマット

フォーマットの自動調整として、VSCodeの拡張機能で`Prettier`を採用。

> 設定方法：VSCodeの拡張機能で`Prettier`をインストール。VSCodeの`Settings`->`Format On Save`にチェック、`Default Formatter`を`Prettier`に変更。

## Git ブランチ

### 役割

| ブランチ名         | 内容                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `master`           | 親のブランチ。（このブランチには原則pushしない）                                                                                                  |
| `refactoring/main` | 現在、リファクタリングを行っているmainブランチ。（このブランチにも原則pushしない）                                                                |
| `その他のブランチ` | 子ブランチ。（作業を行う場合、子ブランチを作成し、マージしてほしいブランチにPull Requestを作成する。例:`feature/hoge` -> `refactoring/main`にPR） |

### 命名規則

ブランチの命名規則は原則として、`目的/内容名`とする。

> 例：`feature/hoge`

`目的`には以下のような単語を推奨
|単語|意味|
| --- | --- |
|`feature`|新機能を追加する|
|`fix`|バグの解消|
|`docs`|ReadMeなどドキュメント関連の作業|
|`refactor`|改善・リファクタリング|

## Quick Start

1. `git`, `docker`, `Docker Desktop`を自環境にインストール

2. 以下のコマンドでクローン

   > $ `git clone https://github.com/si-ritsumei/labweb.git`

3. Docker Desktopを起動

4. 以下のコマンドでdockerを立ち上げる

   > $ cd [`labwebをインストールしたローカルのディレクトリのパス`]/labweb

   > $ docker compose up -d

5. ブラウザで`http://localhost:4232`にアクセス
