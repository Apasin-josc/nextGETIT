### Commands to run the project **DEV**

1. clone the repo [https://github.com/Apasin-josc/nextGETIT]
2. Create a copy of the [.env.template] and rename it to [.env]
3. instalar dependencies `npm install`
4. run a `docker compose up-d` to run the DB (be sure of having docker-desktop running)
5. run the prisma migrations `npx prisma migrate dev`
6. execute seed `npm run seed`
7. run the project `npm run dev`

### Commands to run the project in **PROD**
