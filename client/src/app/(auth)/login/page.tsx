import Link from "next/link";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Link href="/" className="bg-sky-500 py-2 px-4 text-white rounded">
        AI Support
      </Link>
      <Link
        href="/generate"
        className="bg-sky-500 py-2 px-4 text-white rounded"
      >
        Generate
      </Link>
      <Link href="/login" className="bg-sky-500 py-2 px-4 text-white rounded">
        Login
      </Link>
      <Link href="/signup" className="bg-sky-500 py-2 px-4 text-white rounded">
        Signup
      </Link>
    </div>
  );
};

export default Login;
