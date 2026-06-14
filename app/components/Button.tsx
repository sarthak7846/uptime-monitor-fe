const Button = ({ isSignUp }: { isSignUp: boolean }) => {
  return (
    <button
      type="submit"
      className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex h-10 w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {isSignUp ? "Create account" : "Sign in"}
    </button>
  );
};

export default Button;
