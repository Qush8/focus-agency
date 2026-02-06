import { PageEntrance } from "@/components/layout/PageEntrance";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <PageEntrance>{children}</PageEntrance>
      <Footer />
    </SmoothScroll>
  );
}
