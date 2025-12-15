import NextAuthProvider from "./_components/next-auth.providers";
import ReactQueryProvider from "./_components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextAuthProvider>
  );
}
