import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Đảm bảo có dòng src/app này
    "./src/**/*.{js,ts,jsx,tsx,mdx}",     // Thêm dòng này "gom" tất cả thư mục src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;