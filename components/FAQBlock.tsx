interface FAQ {
  question: string;
  answer: string;
}

export default function FAQBlock({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="border rounded-lg p-4"
          >
            <summary className="font-medium cursor-pointer">
              {faq.question}
            </summary>
            <p className="mt-2 text-gray-700">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
