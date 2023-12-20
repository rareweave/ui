module.exports = {
    plugins: [
        require('daisyui')
    ],
    content: [
        "./components/**/*.{vue,css}", 
        "./pages/**/*.{vue,css}", 
        "./layouts/**/*.{vue,css}", 
        "./assets/**/*.{vue,css}"
    ],
    theme: {
        fontFamily: {
            'sans': ['Nunito Sans', 'sans-serif'],
            'serif': ['ui-serif', 'Georgia'],
            'mono': ['Iosevka Aile Web', 'monospace'],
            'display': ['Oswald'],
            'body': ['"Open Sans"'],
        },
        extend: {
            colors: {
                rwpurple: {
                    50: 'rgba(189, 136, 234, 0.05)',
                    100: 'rgba(189, 136, 234, 0.1)',
                    200: 'rgba(189, 136, 234, 0.2)',
                    300: 'rgba(189, 136, 234, 0.3)',
                    400: 'rgba(189, 136, 234, 0.4)',
                    500: 'rgba(189, 136, 234, 0.5)',
                    600: 'rgba(189, 136, 234, 0.6)',
                    700: 'rgba(189, 136, 234, 0.7)',
                    800: 'rgba(189, 136, 234, 0.8)',
                    900: 'rgba(189, 136, 234, 0.9)',
                    DEFAULT: 'rgba(189, 136, 234, 1)',
                },
                rwpeach: {
                    50: 'rgba(208, 135, 112, 0.05)',
                    100: 'rgba(208, 135, 112, 0.1)',
                    200: 'rgba(208, 135, 112, 0.2)',
                    300: 'rgba(208, 135, 112, 0.3)',
                    400: 'rgba(208, 135, 112, 0.4)',
                    500: 'rgba(208, 135, 112, 0.5)',
                    600: 'rgba(208, 135, 112, 0.6)',
                    700: 'rgba(208, 135, 112, 0.7)',
                    800: 'rgba(208, 135, 112, 0.8)',
                    900: 'rgba(208, 135, 112, 0.9)',
                    DEFAULT: 'rgba(208, 135, 112, 1)',
                }
            }
        }
    },
    daisyui: {
        themes: [
            'dark'
        ]
    }
};