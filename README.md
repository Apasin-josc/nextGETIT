# **NEXT.JS 15.2.3 GUIDE**

### **NEXT JS Fonts**

src\config\fonts.ts
to change the fonts from next.js I'm going to create a new folder [config] and a new file named **fonts.ts**

src\config\fonts.ts

<!-- import { Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
variable: "--font-geist-sans",
subsets: ["latin"],
});

export const geistMono = Geist_Mono({
variable: "--font-geist-mono",
subsets: ["latin"],
}); -->

now we can import this file in the layout.tsx (src\app\layout.tsx) || if we want to add a new font to the project we can just go again into our (src\config\fonts.ts)

<!-- export const montserratAlternates = Montserrat_Alternates({
variable: "--font-montserrat-alternates",
subsets: ["latin"],
weight: ["500", "700"],
}); -->

and use it on a new page.tsx file like this:

<!-- import { montserratAlternates } from "@/config/fonts";

export default function Home() {
return (

<div className="App">
<h1> Hola Mundo</h1>
<h1 className={montserratAlternates.className}>Hola Mundo</h1>
</div>
);
} -->

### **Directory structure and first pages**

📂 src
├── 📂 app
│ ├── 📂 (shop)
│ ├── 📂 auth
│ ├── 🌟 favicon.ico
│ ├── 🎨 globals.css
│ ├── 🏗️ layout.tsx
│
├── 📂 components
│ ├── 🛒 cart
│ ├── 📦 product
│ ├── 📦 products
│ ├── 🎨 ui
│ │ ├── 📄 index.ts
│
├── ⚙️ config
├── 📂 interfaces
├── 🌱 seed
│ ├── 📄 seed.ts
│
└── 🏪 store

### **adding a TopMenu**

1. first we're goign to create the component under (src\components\ui\top-menu\TopMenu.tsx)

# **SNIPPETS IN NEXTJS**

1. to create a layout root component

```
lrc
```

<!-- export default function ShopLayout({
children
}: {
children: React.ReactNode;
}) {
return (

<div>
<h1>Hello Root Layout Shop</h1>
</div>
);
} -->

2. to create a page component

```
pcr
```

<!-- export default function CartPage() {
    return (
        <div>
            <h1>Category Page</h1>
        </div>
    );
} -->

3. to create a react arrow function component

```
rafc
```

# **libraries used**

1. npm install react-icons --save
