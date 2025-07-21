import { forwardRef } from "react";
import type { SectionProps } from "./types/types";

const Contact = forwardRef<HTMLElement, SectionProps>(({ language, isActive }, ref) => {
    return (
        <section
            ref={ref}
            className="min-h-screen snap-start flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0 relative overflow-hidden"
        >
            {/* Your contact content here */}
        </section>
    );
});

export default Contact;
