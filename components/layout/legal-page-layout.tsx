import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  breadcrumbLabel: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  breadcrumbLabel,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Hero Section with gradient background - full width */}
      <div className="relative w-full bg-linear-to-b from-[#0F1419] via-[#0A1628] to-[#0F1419] border-b border-gray-800/50 shadow-xl">
        <div className="content-width pt-24 md:pt-32 pb-16 md:pb-20">
          {/* Breadcrumbs */}
          <nav className="mb-8 md:mb-10 text-s" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Početna
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="text-gray-400">{breadcrumbLabel}</li>
            </ol>
          </nav>

          {/* Title */}
          <header>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-gray-500 text-sm">
              Zadnje ažurirano: {lastUpdated}
            </p>
          </header>
        </div>
      </div>

      {/* Content - clearly separated */}
      <div className="content-width py-16 md:py-20">
        <div className="max-w-3xl legal-page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
