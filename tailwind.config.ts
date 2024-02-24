/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins"],
      },
      colors: {
        "gofleet-primary": "#0E5A81",
        "gofleet-secondary": "#42A3E1",
        "gofleet-secondary-2": "#E9E7FD",
        "gofleet-secondary-3": "#074B6E",
        "gofleet-red-primary": "#D12953",
        "gofleet-red-secondary": "#FAF0F2",
        "gofleet-border-primary": "#C2E5FF",
        "gofleet-border-secondary": "#AEDCFF",
      },
    },
  },
  plugins: [],
};
