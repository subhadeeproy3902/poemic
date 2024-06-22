
import { InputBox } from "./InputBox";

export function Hero() {
  return (
    <div className="flex flex-col overflow-x-hidden mt-16 sm:mt-8">
      <div className="w-full flex flex-col items-center pt-5 overflow-hidden">
        <article className="rounded-full p-[1px] mb-4 text-base bg-gradient-to-tr from-orange-900 to-orange-500 font-semibold hover:-rotate-2 hover:scale-110 transition-all duration-500 ease-in-out">
          <div className="rounded-full mx-auto px-5 py-1 bg-slate-200 literata">
            Image&apos;s say ✨
          </div>
        </article>
        <h1 className="md:text-9xl text-8xl lg:text-[9rem] font-bold text-center text-fore relative z-20 playfair bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-transparent bg-clip-text drop-shadow-lg">
          Poemic
        </h1>

        <div className="w-[42rem] h-5 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[2px] w-3/4 blur-sm  animate-pulse" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-[6px] w-1/4 blur-sm  animate-pulse" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent h-px w-1/4" />
        </div>
        <p className="text-center text-sm md:text-lg font-medium relative z-20 bg-neutral-700 text-transparent bg-clip-text max-w-prose p-4 literata">
          A place where images speak and words are heard. Add your images and
          let it tell you its verse with poemic.
        </p>
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#ff7a0573,rgba(255,255,255,0))] z-[45] md:opacity-100 opacity-50"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#ff7a0573,rgba(255,255,255,0))] z-[45] md:opacity-100 opacity-0"></div>
      </div>

      <InputBox />

    </div>
  );
}
