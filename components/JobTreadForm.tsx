"use client";

import { useEffect } from "react";

const remodelTypes = [
  "Full Remodel",
  "Addition",
  "Basement",
  "Bathroom",
  "Kitchen",
  "Garage",
  "Home Exterior",
  "Roof",
  "Patio",
  "Porch",
  "Deck",
  "Landscape",
  "Restoration",
];

const leadSources = [
  "Angi",
  "Facebook",
  "Google",
  "Home Advisor",
  "Instagram",
  "Insurance",
  "Internet Search",
  "Referral",
  "Trade Show",
  "Website",
];

export default function JobTreadForm() {
  useEffect(() => {
    if (document.querySelector('script[src="https://app.jobtread.com/web-form.js"]')) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://app.jobtread.com/web-form.js";
    document.body.appendChild(script);
  }, []);

  return (
    <form
      className="jtwf relative z-30 mx-auto max-w-xl space-y-5 rounded-2xl bg-white p-5 text-neutral-950 shadow-2xl sm:p-6"
      data-jobtread-web-form="true"
      data-key="22TPuCQjvEkf4ED4mhngeTv9rVnQTPyhcC"
      data-success-message="Thank you for reaching out to Groovy Builds. We’ve successfully received your project inquiry and appreciate you considering us for your space. A member of our team will review the details provided and follow up shortly to discuss your project, scheduling, and next steps."
      data-success-url="https://groovybuilds.com"
    >
      <div className="text-center">
        <img
          className="mx-auto max-h-24 max-w-full"
          src="https://cdn.jobtread.com/G1QAaBwHdkw8xHbou6bdef37pW1qdtwehyInjygPeaQOS1-JvLUiAlmUlRydhPI1zO3aA9KBIp7FoZAqQhYAptaOJYqF80uhjg7ZGM0Z.NxJON_UoRKIB0FW83PLMk6Rl7q_bLOCwQWuEcPw9_BM?size=1024"
          alt="Groovy Builds"
        />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Name *</span>
        <input
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
          type="text"
          name="contact.name"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Email</span>
          <input
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
            type="email"
            name="contact.custom.22PX3XQN5fVw"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Phone</span>
          <input
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
            type="tel"
            name="contact.custom.22PX3XQN6nCp"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Address *</span>
        <textarea
          className="min-h-24 w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
          name="location.address"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Lead Source</span>
        <select
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-neutral-900"
          name="account.custom.22PX3XQN35Dj"
          defaultValue=""
        >
          <option value="" />
          {leadSources.map((source) => (
            <option key={source}>{source}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Remodel Type</legend>
        <div className="grid gap-2 rounded-lg border border-neutral-300 p-3 sm:grid-cols-2">
          {remodelTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="job.custom.22PX3XQN7XzQ"
                value={type}
                className="size-4"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Description *</span>
        <textarea
          className="min-h-28 w-full rounded-lg border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
          name="job.description"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold">Files & Photos</span>
        <input
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm"
          type="file"
          name="account.files"
          multiple
        />
      </label>

      <button
        className="w-full rounded-xl bg-[#a8c6fe] px-5 py-3 text-sm font-semibold text-[#323b4c] transition hover:brightness-95"
        type="submit"
        data-submit-button="true"
      >
        Submit
      </button>
    </form>
  );
}
