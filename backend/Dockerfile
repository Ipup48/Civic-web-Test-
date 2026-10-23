FROM node:20-alpine

WORKDIR /app

# คัดลอก package.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# ถ้ามี Prisma ให้ generate client ก่อน build
# RUN npx prisma generate

# Build โค้ด (ถ้าใช้ TypeScript)
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]