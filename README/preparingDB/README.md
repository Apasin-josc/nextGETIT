# PostgresSQL- SQL DB 🐘#

Using PostgreSQL with Docker 🐳
[docker-compose.yml]

<!-- version: "3.8"

services:
  postgres-db:
    image: postgres:15.3
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - ./postgres:/var/lib/postgresql/data
    ports:
      - 5432:5432
 -->

### Connecting to the DB - Table Plus 🐘

download table plus
[https://tableplus.com/]

click on the + symbol and put the credentials of

```
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
```

### Configuring **PRISMA CLIENT** 📐

```
npm install prisma --save-dev
```

to initialize our prisma we need to run also the next command

```
npx prisma init --datasource-provider PostgreSQL
```

once that we run this command it's going to appear all this label

<!-- PS C:\Users\Omar.Sanchez\next-level-up> npx prisma init --datasource-provider PostgreSQL

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Run prisma db pull to turn your database schema into a Prisma schema.
3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started -->

it's going to generate this .env variable
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

here is where we need to change this environment variable for this
DATABASE_URL="postgresql://postgres:123456@localhost:5432/teslo-shop?schema=public"

### Building our SCHEMA 📃

after finishing building our schema we can run

```
npx prisma migrate dev --name init
```

1. we can go to tablePlus and rightclick over the root IDE and `create a new table`

start making a simple table with a new row with a name/age : varchar/int2 keys/values

if we go back to our terminal in the root project we can run
`npx prisma db pull`

prisma\schema.prisma

<!--
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model MyTable {
  id   Int     @id @default(autoincrement())
  name String? @db.VarChar
  age  Int?    @db.SmallInt
}
 -->

but well, this is the case if we have a already configured database in postgreSQl,
in my case im going to do all the schema from our VS-CODE PRISMA, just like this:

<!-- generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Size {
  XS
  S
  M
  L
  XL
  XXL
  XXXL
}

enum Gender {
  men
  women
  kid
  unisex
}

model Category {
  id   String @id @default(uuid())
  name String @unique
  //???
}

model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  inStock     Int
  price       Float    @default(0)
  sizes       Size[]   @default([])
  slug        String   @unique
  tags        String[] @default([])
  gender      Gender

  @@index([gender])
}
 -->

to have our first relation (e.x our product should have a relation with the category)
to achieve this we can add the next code:

<!-- model Category {
  id      String    @id @default(uuid())
  name    String    @unique
  !!!!!!!!!!!!!!!!!
  Product Product[]
}

model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  inStock     Int
  price       Float    @default(0)
  sizes       Size[]   @default([])
  slug        String   @unique
  tags        String[] @default([])
  gender      Gender

  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId String

  @@index([gender])
} -->

we are adding a category type Category relation between our Product model and the Category model with the categoryId, using as reference the id from the category, prisma created us that Product Product[], is just stablishing the relation

to make the migration we need tu run

` npx prisma migrate dev --name ProductCategory`

we are going to see all this label

<!-- PS C:\Users\Omar.Sanchez\next-level-up> npx prisma migrate dev --name ProductCategory                                       ction pool
Environment variables loaded from .env                        s://pris.l
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "teslo-shop", schema "public" at "localhost:5432"

Applying migration `20250320074227_product_category`

The following migration(s) have been created and applied from
new schema changes:

migrations/
  └─ 20250320074227_product_category/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)

✔ Generated Prisma Client (v6.5.0) to .\node_modules\@prisma\client in 637ms -->

if we go back to tablePlus we are going to see that we have our prisma_migrations, and prisma created for us the **Category table** and the **Product table**

to handle the images from our product we can also create a new table

<!-- model Product {
  id          String   @id @default(uuid())
  title       String
  description String
  inStock     Int
  price       Float    @default(0)
  sizes       Size[]   @default([])
  slug        String   @unique
  tags        String[] @default([])
  gender      Gender

  category     Category       @relation(fields: [categoryId], references: [id])
  categoryId   String
  ProductImage ProductImage[]

  @@index([gender])
}

model ProductImage {
  id  Int    @id @default(autoincrement())
  url String

  //??? relation with the Product Id with reference with the id of the Product
  product   Product @relation(fields: [productId], references: [id])
  productId String
} -->

<!-- PS C:\Users\Omar.Sanchez\next-level-up> npx prisma migrate dev --name ProductImage
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "teslo-shop", schema "public" at "localhost:5432"

Applying migration `20250320075014_product_image`

The following migration(s) have been created and applied from
new schema changes:

migrations/
  └─ 20250320075014_product_image/
    └─ migration.sql

Your database is now in sync with your schema.

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
✔ Generated Prisma Client (v6.5.0) to .\node_modules\@prisma\client in 207ms
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


PS C:\Users\Omar.Sanchez\next-level-up>  -->

this message of generated prisma client means that we can start working with this models

### BASE **SEED** 🌱

[src\seed\seed.ts] instead of having this hardcoded seed.ts

we can make a routine in dev development that loads our data
(src\seed\seed-database.ts)

<!-- async function main() {
  console.log(`Seed Executed`);
}

(() => {
  main();
})(); -->

to auto run this file instead of making a node src/seed/seed-database.ts we can

```
npm install -D ts-node
```

now we're going to be able to run the seed-database.ts using nodeJs BUTTTTTTTTTTTT

<!-- import { initialData } from "./seed";

async function main() {
  console.log(`Seed Executed`);
  console.log(initialData);
}

(() => {
  main();
})(); -->

instead of running all that on the CLI we can go into our
[.package.json]

and create this new script

<!-- "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    "seed": "ts-node src/seed/seed-database.ts"
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }, -->

```
npm run seed
```

BUT SURPRISE IS NOT WORKING YET CHICO

<!-- PS C:\Users\Omar.Sanchez\next-level-up> npm run seed

> next-level-up@0.1.0 seed
> ts-node src/seed/seed-database.ts

TypeError: Unknown file extension ".ts" for C:\Users\Omar.Sanchez\next-level-up\src\seed\seed-database.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:219:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:245:36)
    at defaultLoad (node:internal/modules/esm/load:120:22)
    at async ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:514:32)
    at async ModuleJob._link (node:internal/modules/esm/module_job:115:19) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
PS C:\Users\Omar.Sanchez\next-level-up>  -->

to make it work we can just go into cd src/seed

<!-- PS C:\Users\Omar.Sanchez\next-level-up> cd .\src\seed\
PS C:\Users\Omar.Sanchez\next-level-up\src\seed> npx tsc --init -->

and it's going to create us a ts config file on our seed folder
[src\seed\tsconfig.json]

NOW if we run `npm run seed` we are going to be able to see the console.log of our seed file data

### Prisma Client - deleting the table contents

`npx prisma generate`

[src\lib\prisma.ts]
[https://www.prisma.io/docs/getting-started/quickstart-sqlite]

<!-- import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} -->

now we can delete all the tables

<!-- import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //deleting all the data from the database
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

   console.log(`seed executed successfully 🌱`);
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})(); -->

### primsa client adding categories, relation between products and categories, products, images

<!-- import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //deleting all the data from the database
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;

  //generate categories
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  //creating a relation between products and categories
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>

  //generating products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log(`seed executed successfully 🌱`);
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})(); -->
