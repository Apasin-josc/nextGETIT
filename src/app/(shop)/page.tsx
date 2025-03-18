import { montserratAlternates } from "@/config/fonts";

export default function Home() {
  return (
    <div className="App">
      <h1> Hola Mundo</h1>
      <h1 className={`${montserratAlternates.className} font-bold`}>Hola Mundo</h1>
    </div>
  );
}
