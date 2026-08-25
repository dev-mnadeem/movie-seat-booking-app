FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 app \
 && chown -R app:nodejs /app
USER app

EXPOSE 3000
CMD ["node", "app.js"]
