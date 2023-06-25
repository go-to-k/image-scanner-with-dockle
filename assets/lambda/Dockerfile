# ------------------------------------------------------------#
# Build Layer
# ------------------------------------------------------------#
FROM public.ecr.aws/lambda/nodejs:18 AS build

WORKDIR /app

COPY ./ ./
RUN npm install -g yarn
RUN yarn install --non-interactive --frozen-lockfile && yarn build

# ------------------------------------------------------------#
# Dockle Install Layer
# ------------------------------------------------------------#
FROM alpine:3.18 AS dockle

RUN apk --update add --no-cache curl 

# See https://github.com/goodwithtech/dockle#installation
RUN \
    VERSION=$( \
    curl --silent "https://api.github.com/repos/goodwithtech/dockle/releases/latest" | \
    grep '"tag_name":' | \
    sed -E 's/.*"v([^"]+)".*/\1/' \
    ) && curl -L -o dockle_${VERSION}_Linux-ARM64.tar.gz https://github.com/goodwithtech/dockle/releases/download/v${VERSION}/dockle_${VERSION}_Linux-ARM64.tar.gz \
    && tar zxf dockle_${VERSION}_Linux-ARM64.tar.gz \
    && rm dockle_${VERSION}_Linux-ARM64.tar.gz

# ------------------------------------------------------------#
# Run Layer
# ------------------------------------------------------------#
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /

COPY --from=dockle /dockle /opt/dockle
COPY --from=build /app/dist/index.js /var/task/index.js

CMD ["index.handler"]
