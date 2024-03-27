/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fb483a" // Thay đổi 'blue' thành màu chủ đạo bạn muốn sử dụng
      },
      screens: {
        table: "1024px" // Thêm kích thước màn hình 'table' với độ rộng 1200px
      }
    }
  },
  plugins: []
};
