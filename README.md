## 설치 설명서

git clone https://github.com/kingchobo2022/vproject.git

cd vproject

mv .env.example .env

npm install

npx prisma init --datasource-provider sqlite

npx prisma migrate dev --name init

npx prisma generate

