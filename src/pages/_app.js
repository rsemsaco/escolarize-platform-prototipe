import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = require('react').useState(false);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events?.on('routeChangeStart', handleStart);
        router.events?.on('routeChangeComplete', handleComplete);
        router.events?.on('routeChangeError', handleComplete);

        return () => {
            router.events?.off('routeChangeStart', handleStart);
            router.events?.off('routeChangeComplete', handleComplete);
            router.events?.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return (
        <>
            {isLoading && <div className="sb-page-loading" />}
            <div className={`sb-page-content ${isLoading ? 'sb-page-fade-out' : 'sb-page-fade-in'}`}>
                <Component {...pageProps} />
            </div>
        </>
    );
}
