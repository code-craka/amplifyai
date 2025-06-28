import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "AmplifyAI - AI-Powered Social Media Content Platform",
	description:
		"Transform your social media strategy with AI that creates engaging content campaigns in minutes, not hours. Professional-quality posts across all platforms.",
	keywords:
		"AI content generation, social media marketing, content creation, artificial intelligence, social media automation, brand management",
	authors: [
		{ name: "Sayem Abdullah Rihan", url: "https://github.com/code-craka" },
	],
	openGraph: {
		title: "AmplifyAI - AI-Powered Social Media Content Platform",
		description:
			"Transform your social media strategy with AI that creates engaging content campaigns in minutes, not hours.",
		type: "website",
		locale: "en_US",
		siteName: "AmplifyAI",
	},
	twitter: {
		card: "summary_large_image",
		title: "AmplifyAI - AI-Powered Social Media Content Platform",
		description:
			"Transform your social media strategy with AI that creates engaging content campaigns in minutes, not hours.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
				<meta name="theme-color" content="#3b82f6" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</head>
			<body
				className="bg-background text-foreground antialiased"
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position="top-right" richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
