import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PatrolPost {
    id: number;
    name: string;
    description: string;
    status: string;
}

interface Attendance {
    id: number;
    scanned_at: string;
    patrol_status: string;
    patrol_post: PatrolPost;
}

interface Props {
    posts: PatrolPost[];
    todayAttendances: Attendance[];
    [key: string]: unknown;
}

export default function PatrolIndex({ posts, todayAttendances }: Props) {
    return (
        <AppShell>
            <Head title="Patrol Dashboard" />
            
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🛡️ Patrol Dashboard</h1>
                        <p className="text-gray-600">Scan QR codes at patrol posts to log attendance</p>
                    </div>
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/patrol/scanner">
                            📱 Open Scanner
                        </Link>
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Today's Activity */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Today's Patrol Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {todayAttendances.length > 0 ? (
                                    <div className="space-y-4">
                                        {todayAttendances.map((attendance) => (
                                            <div key={attendance.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <div>
                                                    <h4 className="font-semibold text-green-900">
                                                        ✅ {attendance.patrol_post.name}
                                                    </h4>
                                                    <p className="text-sm text-green-700">
                                                        Scanned at {new Date(attendance.scanned_at).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                        {attendance.patrol_status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📋</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No scans today</h3>
                                        <p className="text-gray-600 mb-6">Start your patrol by scanning QR codes at patrol posts</p>
                                        <Button asChild>
                                            <Link href="/patrol/scanner">Start Scanning</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Patrol Posts */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Patrol Posts ({posts.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {posts.map((post) => {
                                        const isScannedToday = todayAttendances.some(
                                            attendance => attendance.patrol_post.id === post.id
                                        );
                                        
                                        return (
                                            <div 
                                                key={post.id} 
                                                className={`p-3 rounded-lg border ${
                                                    isScannedToday 
                                                        ? 'bg-green-50 border-green-200' 
                                                        : 'bg-gray-50 border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {isScannedToday ? '✅' : '📍'} {post.name}
                                                        </h4>
                                                        {post.description && (
                                                            <p className="text-sm text-gray-600">{post.description}</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {isScannedToday ? (
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                                                DONE
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                                                PENDING
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-3">
                                            Progress: {todayAttendances.length} of {posts.length} posts visited
                                        </p>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                                style={{ width: `${posts.length > 0 ? (todayAttendances.length / posts.length) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}