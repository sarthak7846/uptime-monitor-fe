const Button = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <button
      type="submit"
      className="flex h-10 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {isSignUp ? "Create account" : "Sign in"}
    </button>
  );
};

export default Button;
