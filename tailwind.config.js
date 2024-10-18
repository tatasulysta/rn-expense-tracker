module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            borderWidth: {
                '0': '0',
                '1': "1px",
                '2': '2px',
                '3': '3px',
                '4': '4px',
                '6': '6px',
                '8': '8px',
            },
            maxWidth: {
                50: "50px",
                60: "60px"
            }
        },
    },
    plugins: [],
}