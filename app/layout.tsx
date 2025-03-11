import "../styles/index.css";

export const metadata = {
  title: "Moon Experience",
  description: "Interactive 3D Moon Experience",
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
