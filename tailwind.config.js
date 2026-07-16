/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // ĐÁNH TRÁO MÀU: Ép các màu Claude hay dùng về chung một hệ màu Indigo
          blue: {
            50: '#e0e7ff',  // Thực chất là màu indigo nhạt
            100: '#c7d2fe',
            500: '#6366f1',
            600: '#4f46e5', // Màu Indigo chủ đạo của bạn
            700: '#4338ca',
          },
          indigo: {
            DEFAULT: "#4f46e5",
            dark: "#4338ca",
            light: "#e0e7ff"
          },
          // Nếu file nào của Claude dùng màu tím (purple), nó cũng sẽ biến thành màu Indigo
          purple: {
            50: '#e0e7ff',
            100: '#c7d2fe',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
          }
        },
        // ĐỒNG BỘ BO GÓC: Ép tất cả các kiểu bo góc (nhỏ, vừa, lớn) về một chuẩn duy nhất
        borderRadius: {
          sm: "0.375rem",
          md: "0.5rem",   // Bo góc vừa
          lg: "0.75rem",  // Bo góc lớn cho Card
          xl: "0.75rem",  // Lỡ Claude có viết rounded-xl thì vẫn đồng bộ
        }
      },
    },
    plugins: [],
  }