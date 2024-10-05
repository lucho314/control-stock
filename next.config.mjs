/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'imgs.search.brave.com',
            },
        ],
    },

    // Personalización de Webpack
    webpack: (config, { isServer }) => {
        // Si estamos en el lado del servidor, agregar '@sparticuz/chromium' a externals
        if (isServer) {
            config.externals = [
                '@sparticuz/chromium', // Agregar a externals
                ...(config.externals || []), // Extender cualquier otra configuración de externals
            ];
        }

        return config; // Devolver la configuración modificada
    },
};

export default nextConfig;
