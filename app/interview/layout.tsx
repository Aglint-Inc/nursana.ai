export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Add any common layout elements here */}
      {children}
    </div>
  );
}
