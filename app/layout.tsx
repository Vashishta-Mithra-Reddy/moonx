import "../styles/index.css";

export const metadata = {
  title: "Moon",
  description: "The Moon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
