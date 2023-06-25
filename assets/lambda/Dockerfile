FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /

COPY dist/index.js /var/task/index.js

RUN \
    VERSION=$( \
    curl --silent "https://api.github.com/repos/goodwithtech/dockle/releases/latest" | \
    grep '"tag_name":' | \
    sed -E 's/.*"v([^"]+)".*/\1/' \
    ) && rpm -ivh https://github.com/goodwithtech/dockle/releases/download/v${VERSION}/dockle_${VERSION}_Linux-ARM64.rpm

CMD ["index.handler"]
