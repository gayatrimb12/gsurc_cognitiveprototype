export const metadata = {
  title: "GSURC Cognitive Prototype",
  description: "Cognitive-Aware Adaptive Interface prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
