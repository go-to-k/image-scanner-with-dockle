FROM public.ecr.aws/lambda/nodejs:18-arm64

WORKDIR /

COPY dist/index.js /var/task/index.js

COPY --from=goodwithtech/dockle:latest /usr/bin/dockle /opt

CMD ["index.handler"]
