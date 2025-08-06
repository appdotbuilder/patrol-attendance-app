import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard(): React.ReactElement {
    return (
        <AppShell>
            <Head title="Administrator Dashboard" />
            
            <div className="p-6 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">👨‍💼 Administrator Dashboard</h1>
                    <p className="text-gray-600">Manage security officers, patrol posts, and attendance reports</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Security Officers</p>
                                    <p className="text-2xl font-bold text-blue-600">12</p>
                                </div>
                                <div className="text-3xl">👮</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Patrol Posts</p>
                                    <p className="text-2xl font-bold text-green-600">7</p>
                                </div>
                                <div className="text-3xl">📍</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Today's Scans</p>
                                    <p className="text-2xl font-bold text-purple-600">84</p>
                                </div>
                                <div className="text-3xl">📱</div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Patrols</p>
                                    <p className="text-2xl font-bold text-orange-600">5</p>
                                </div>
                                <div className="text-3xl">🛡️</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Management Sections */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Security Officers */}
                    <Card>
                        <CardHeader>
                            <CardTitle>👮 Security Officers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Manage security officer profiles, generate QR codes for login, and track their patrol activity.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full justify-start">
                                    <Link href="/security-officers">
                                        📋 View All Officers
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/security-officers/create">
                                        ➕ Add New Officer
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Patrol Posts */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📍 Patrol Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Create and manage patrol checkpoint locations with unique QR codes for scanning.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full justify-start">
                                    <Link href="/patrol-posts">
                                        🎯 View All Posts
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/patrol-posts/create">
                                        ➕ Add New Post
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reports and Schedules */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Work Schedules */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🗓️ Work Schedules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Set working days, holidays, and shift schedules for each security officer.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full justify-start">
                                    <Link href="/work-schedules">
                                        📅 Manage Schedules
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/work-schedules/create">
                                        ➕ Create Schedule
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Attendance Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📊 Attendance Reports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                View detailed attendance records with timestamps, locations, and export to Excel.
                            </p>
                            <div className="space-y-3">
                                <Button asChild className="w-full justify-start">
                                    <Link href="/attendances">
                                        📈 View Reports
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/attendances?export=excel">
                                        📄 Export to Excel
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>📱 Recent Patrol Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600">✅</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Security Officer 1</p>
                                        <p className="text-sm text-gray-600">Scanned Main Gate - 2 minutes ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-green-600 font-medium">ON PATROL</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600">📍</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Security Officer 2</p>
                                        <p className="text-sm text-gray-600">Scanned Parking Lot A - 5 minutes ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-blue-600 font-medium">ON PATROL</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600">🔄</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Security Officer 3</p>
                                        <p className="text-sm text-gray-600">Completed patrol cycle - 15 minutes ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-purple-600 font-medium">COMPLETED</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Button asChild variant="outline">
                                <Link href="/attendances">View All Activity</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}