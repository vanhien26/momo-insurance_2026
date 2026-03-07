"use client";

import { useState } from "react";
import type { FAQ } from "@/types/insurance";

interface FAQAccordionProps {
  faqs: FAQ[];
  productName?: string;
}

export function FAQAccordion({ faqs, productName }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-content mb-8 md:mb-12">
          Câu hỏi thường gặp{productName ? ` về ${productName}` : ""}
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 md:py-6 text-left hover:bg-surface-secondary active:bg-gray-50 transition-colors group"
              >
                <span className="font-semibold text-content pr-4 group-hover:text-momo-600 transition-colors">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-content-tertiary flex-shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-content-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
