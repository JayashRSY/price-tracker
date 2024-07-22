import "@/styles/globals.css";
import Nav from "@/components/Nav";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Prompt Pedia",
  description: "Discover & Share AI Prompts",
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body>
      <StoreProvider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;
