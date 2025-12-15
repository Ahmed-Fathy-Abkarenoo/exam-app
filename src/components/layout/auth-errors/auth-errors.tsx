export default function AuthErrors({ authError }: { authError: ErrorResponse }) {
  return <p className="w-full text-red-600 text-center border border-red-600 mt-1">{authError.message}</p>;
}
