# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# 依存インストール（lockfile を用いた再現性の高いインストール）
COPY package.json package-lock.json ./
RUN npm ci

# ソースをコピーして本番ビルド
COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine AS serve

# SPA 用の Nginx 設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ビルド成果物を配信ディレクトリへ
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
