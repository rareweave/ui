module.exports = {
    plugins: [require('daisyui')],
    content: ["./components/**/*.{vue,css}", "./pages/**/*.{vue,css}", "./layouts/**/*.{vue,css}", "./assets/**/*.{vue,css}"],
    theme: {
        fontFamily: {
            'sans': ['Nunito Sans', 'sans-serif'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['Iosevka', 'monospace'],
            'display': ['Oswald'],
            'body': ['"Open Sans"'],
        }
    }
};
