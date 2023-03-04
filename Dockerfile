FROM node:18.13.0-bullseye AS build
ENV TZ Asia/Tokyo
ENV NODE_ENV development

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init sqlite3
RUN npm install -g pnpm
RUN mkdir /app
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json tsconfig.build.json vite.config.ts index.html .npmrc /app/
COPY databases/ /app/databases/
COPY public/ /app/public/
COPY tools/ /app/tools/
COPY src/ /app/src/
RUN pnpm install
RUN pnpm build

########################################################################

FROM node:18.13.0-alpine
ENV TZ Asia/Tokyo
ENV NODE_ENV production

COPY --from=build /usr/bin/sqlite3 /usr/bin/sqlite3
COPY --from=build --chown=node:node /app /app

WORKDIR /app
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /usr/local/bin/dumb-init
RUN apk update && apk upgrade && apk add --no-cache sqlite
RUN rm -rf node_modules && npm install -g pnpm && pnpm install

USER node
CMD ["dumb-init", "node", "--max-old-space-size=192", "./dist/server/server/index.js"]
