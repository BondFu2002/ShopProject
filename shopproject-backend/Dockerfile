# 使用 Node.js 官方镜像作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 复制项目文件，包括 prisma 文件夹
COPY prisma/schema.prisma ./prisma/schema.prisma

# 安装依赖
RUN npm install

# 生成 Prisma Client
RUN npx prisma generate

# 打印 Node.js 版本
RUN node -v

# 复制项目文件
COPY . .

# 构建项目（如果是 TypeScript 项目）
RUN npm run build

# 暴露端口（假设你的应用运行在 5000 端口）
EXPOSE 5000

# 启动应用
CMD ["npm", "run", "start:prod"]
