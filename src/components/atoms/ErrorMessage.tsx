type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-center text-red-500 pt-40">
      <p>{message}</p>
    </div>
  );
}
