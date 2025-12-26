import EmailCapture from "@/components/EmailCapture";

export const metadata = {
  title: "Subscribe to the Pro-Workflow Hub",
  description: "Get weekly tech stack teardowns and verified SaaS deals.",
};

export default function NewsletterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-20 text-center">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-4xl font-extrabold text-white">
          Join the Inner Circle
        </h1>
        <p className="mb-10 text-lg text-slate-400">
          Get our proven tech stack checklists, exclusive software deals, and unbiased reviews delivered to your inbox every Tuesday.
        </p>
        
        <div className="mx-auto w-full max-w-md">
           <EmailCapture source="newsletter_page" />
        </div>

        <p className="mt-8 text-sm text-slate-600">
          No spam. Unsubscribe with one click.
        </p>
      </div>
    </div>
  );
}