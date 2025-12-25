import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQBlock({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16">
      {/* Optional: Header is usually handled by the parent, but can be kept here if standalone */}
      {/* <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white">
        <HelpCircle className="text-indigo-500" /> Frequently Asked Questions
      </h2> */}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:bg-slate-900 open:border-indigo-500/30 open:bg-slate-900"
          >
            <summary className="flex cursor-pointer items-center justify-between p-5 font-semibold text-slate-200 outline-none transition marker:content-none hover:text-indigo-400">
              <span className="text-lg leading-snug">{faq.question}</span>
              <ChevronDown 
                size={20} 
                className="shrink-0 text-slate-500 transition-transform duration-300 group-open:rotate-180 group-hover:text-indigo-400" 
              />
            </summary>
            
            <div className="border-t border-slate-800/50 px-5 pb-6 pt-2">
              <p className="leading-relaxed text-slate-400">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}