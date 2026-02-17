/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent-primary': '#00f2ff',
                'accent-secondary': '#7000ff',
            }
        },
    },
    plugins: [],
}
