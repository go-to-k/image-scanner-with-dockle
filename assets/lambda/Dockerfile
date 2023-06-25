# ------------------------------------------------------------#
# Dockle Install Layer
# ------------------------------------------------------------#
FROM arm64v8/alpine:3.18 AS dockle

WORKDIR /

RUN mkdir -p /dockle

RUN apk --update add --no-cache curl 

# See https://github.com/goodwithtech/dockle#installation
RUN \
    VERSION=$( \
    curl --silent "https://api.github.com/repos/goodwithtech/dockle/releases/latest" | \
    grep '"tag_name":' | \
    sed -E 's/.*"v([^"]+)".*/\1/' \
    ) && curl -L -o dockle_${VERSION}_Linux-ARM64.tar.gz https://github.com/goodwithtech/dockle/releases/download/v${VERSION}/dockle_${VERSION}_Linux-ARM64.tar.gz \
    && tar zxf dockle_${VERSION}_Linux-ARM64.tar.gz -C /dockle \
    && rm dockle_${VERSION}_Linux-ARM64.tar.gz

# ------------------------------------------------------------#
# Run Layer
# ------------------------------------------------------------#
FROM public.ecr.aws/lambda/nodejs:18-arm64

WORKDIR /

COPY dist/index.js /var/task/index.js

# Including LICENSE and README.md
COPY --from=dockle /dockle /opt/dockle

CMD ["index.handler"]
