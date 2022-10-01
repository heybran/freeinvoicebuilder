FROM denoland/deno:1.26.0

EXPOSE 8080

WORKDIR /app
USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .
RUN deno cache app.ts

CMD ["run", "--allow-env", "--allow-net", "server.ts"]