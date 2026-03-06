import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata = {
  title: "Workspace – Room Booking",
  description: "Book your perfect meeting room or workspace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
