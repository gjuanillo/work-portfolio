import { forwardRef, useRef, useEffect } from "react";
import gsap from "gsap";
import type { SectionProps } from "./types/types";

const Contact = forwardRef<HTMLElement, SectionProps>(({ language, isActive }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!isActive || !formRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                formRef.current!.children,
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
            className="min-h-screen snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden"
        >
            <div className="w-full max-w-4xl text-white">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-wide mb-2">
                        {language === "JP" ? "お問い合わせ" : "Contact"}
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">
                        {language === "JP"
                            ? "ご質問やご相談があれば、お気軽にご連絡ください。"
                            : "Feel free to reach out with any questions or inquiries."}
                    </p>
                </div>

                <form
                    ref={formRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white"
                >
                    <input
                        type="text"
                        placeholder={language === "JP" ? "お名前" : "Name"}
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60"
                    />
                    <input
                        type="email"
                        placeholder={language === "JP" ? "メールアドレス" : "Email"}
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60"
                    />
                    <input
                        type="text"
                        placeholder={language === "JP" ? "件名" : "Subject"}
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 focus:outline-none placeholder-white/60 sm:col-span-2"
                    />
                    <textarea
                        rows={4}
                        placeholder={language === "JP" ? "メッセージ" : "Message"}
                        className="bg-transparent border-b border-cyan-400 px-4 py-2 resize-none focus:outline-none placeholder-white/60 sm:col-span-2"
                    />
                    <button
                        type="submit"
                        className="sm:col-span-2 mt-4 w-fit px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all"
                    >
                        {language === "JP" ? "送信" : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
});

export default Contact;
