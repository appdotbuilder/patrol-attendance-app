import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    canLogin?: boolean;
    canRegister?: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <>
            <Head title="Security Patrol Attendance System" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                {/* Navigation */}
                <nav className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🛡️</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">SecurePatrol</span>
                    </div>
                    
                    {canLogin && (
                        <div className="space-x-4">
                            <Link
                                href="/login"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Login
                            </Link>
                            {canRegister && (
                                <Button asChild>
                                    <Link href="/register">Get Started</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <main className="flex-1 flex items-center justify-center px-6">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                🛡️ Security Patrol Attendance System
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                                Modern QR code-based attendance tracking for security officers and patrol management. 
                                Keep your security operations organized and monitored with real-time location tracking.
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">QR Code Login</h3>
                                <p className="text-gray-600">
                                    Security officers can log in instantly using their personal QR codes - no passwords needed.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Patrol Tracking</h3>
                                <p className="text-gray-600">
                                    Scan QR codes at designated patrol posts to automatically log attendance with GPS coordinates.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin Dashboard</h3>
                                <p className="text-gray-600">
                                    Manage officers, create patrol posts, set schedules, and export comprehensive reports.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">🗓️</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Schedule Management</h3>
                                <p className="text-gray-600">
                                    Set working days, holidays, and shifts for each security officer with flexible scheduling.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">GPS Coordinates</h3>
                                <p className="text-gray-600">
                                    Automatically capture and record exact location coordinates when officers scan patrol posts.
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excel Reports</h3>
                                <p className="text-gray-600">
                                    Generate and export detailed attendance reports with officer details, timestamps, and locations.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Ready to modernize your security operations?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Join thousands of security teams using our patrol attendance system to improve accountability and operational efficiency.
                            </p>
                            {canLogin ? (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="px-8">
                                        <Link href="/login">Login to Dashboard</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild variant="outline" size="lg" className="px-8">
                                            <Link href="/register">Create Account</Link>
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <Button asChild size="lg" className="px-8">
                                    <Link href="/dashboard">Go to Dashboard</Link>
                                </Button>
                            )}
                        </div>

                        {/* System Overview */}
                        <div className="mt-16 bg-blue-50 p-8 rounded-xl border border-blue-200">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-2">👮 For Security Officers:</h4>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Use personal QR code for instant login</li>
                                        <li>• Access patrol menu to view assigned posts</li>
                                        <li>• Scan QR codes at each patrol checkpoint</li>
                                        <li>• GPS coordinates sent automatically</li>
                                        <li>• Real-time patrol status updates</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-2">👨‍💼 For Administrators:</h4>
                                    <ul className="text-gray-700 space-y-1">
                                        <li>• Manage security officer profiles</li>
                                        <li>• Generate QR codes for officers and posts</li>
                                        <li>• Create and manage patrol post locations</li>
                                        <li>• Set work schedules and holidays</li>
                                        <li>• Export detailed Excel reports</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="py-8 text-center text-gray-600 border-t border-gray-200 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <p>&copy; {new Date().getFullYear()} SecurePatrol Attendance System. Professional security patrol management.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}