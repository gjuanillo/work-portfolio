import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import type { SectionProps } from "./types/types";

const Contact = forwardRef<HTMLElement, SectionProps>(({ language, isActive }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                formRef.current?.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );
        }, formRef);

        return () => ctx.revert();
    }, [isActive]);

    return (
        <section
            ref={ref}
            className="min-h-screen snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 relative overflow-hidden bg-transparent"
        >
            <div className="w-full max-w-4xl text-white">
                <div className="flex justify-between text-center items-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center tracking-wide">
                        文章の構成
                    </h2>
                    <p className="max-w-2/5">文字の流れを確認するためだけに使用されるため、
                        読者が内容に注意を向けることはありません。</p>
                </div>

                <form
                    ref={formRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white"
                >
                    <input
                        type="text"
                        placeholder="名前"
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60"
                    />
                    <input
                        type="text"
                        placeholder="名前"
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60"
                    />
                    <input
                        type="text"
                        placeholder="名前"
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60"
                    />
                    <textarea
                        rows={4}
                        placeholder="名前"
                        className="sm:col-span-2 bg-transparent border-b border-cyan-400 px-4 py-2 resize-none focus:outline-none placeholder-white/60"
                    />
                    <button
                        type="submit"
                        className="sm:col-span-2 mt-4 w-fit px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all"
                    >
                        ボタン
                    </button>
                </form>
            </div>
        </section>
    );
});

export default Contact;
