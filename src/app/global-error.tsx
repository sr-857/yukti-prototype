"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { SDGLogo } from "@/components/logos/SDGLogo";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="min-h-screen bg-background font-sans antialiased text-foreground">
                <div className="flex min-h-screen flex-col items-center justify-center p-4">
                    <Card className="max-w-md w-full border-2 border-destructive/20 shadow-xl overflow-hidden">
                        <div className="h-2 bg-destructive shadow-sm" />
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                                <AlertCircle className="h-10 w-10 text-destructive" />
                            </div>
                            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                                Critical System Error
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                YUKTI encountered an unexpected issue while processing your request. Our team has been notified.
                            </p>

                            <div className="grid grid-cols-1 gap-3 pt-4">
                                <Button
                                    onClick={() => reset()}
                                    variant="default"
                                    className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <RefreshCcw className="mr-2 h-5 w-5" />
                                    Try Again
                                </Button>

                                <Link href="/" className="w-full">
                                    <Button
                                        variant="outline"
                                        className="w-full h-11 text-base font-semibold border-2 transition-all hover:bg-muted"
                                    >
                                        <Home className="mr-2 h-5 w-5" />
                                        Return to Dashboard
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center justify-center pt-8 border-t border-muted/50">
                                <SDGLogo className="h-12 w-auto opacity-70 transition-opacity hover:opacity-100" />
                            </div>
                        </CardContent>
                    </Card>

                    <p className="mt-8 text-sm text-muted-foreground/60 font-medium tracking-wide">
                        © 2026 Guwahati Municipal Corporation • YUKTI v1.0
                    </p>
                </div>
            </body>
        </html>
    );
}
