import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PatrolPost {
    id: number;
    name: string;
    description: string;
}

interface Attendance {
    id: number;
    scanned_at: string;
    latitude: number | null;
    longitude: number | null;
    patrol_status: string;
    notes: string | null;
    patrol_post: PatrolPost;
}

interface Props {
    attendance: Attendance;
    post: PatrolPost;
    [key: string]: unknown;
}

export default function ScanSuccess({ attendance, post }: Props) {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        };
    };

    const { date, time } = formatDateTime(attendance.scanned_at);

    return (
        <AppShell>
            <Head title="Scan Successful" />
            
            <div className="p-6 max-w-2xl mx-auto">
                <Card className="border-green-200 bg-green-50">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <div className="text-3xl">✅</div>
                        </div>
                        <CardTitle className="text-2xl text-green-900">Attendance Recorded!</CardTitle>
                        <p className="text-green-700">Your patrol attendance has been successfully logged</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Post Information */}
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-gray-900 mb-2">Patrol Post</h3>
                            <div className="text-lg font-medium text-blue-600">📍 {post.name}</div>
                            {post.description && (
                                <p className="text-gray-600 mt-1">{post.description}</p>
                            )}
                        </div>

                        {/* Attendance Details */}
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-gray-900 mb-3">Attendance Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Date:</span>
                                    <div className="font-medium">{date}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Time:</span>
                                    <div className="font-medium">{time}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Status:</span>
                                    <div className="font-medium capitalize text-green-600">
                                        {attendance.patrol_status.replace('_', ' ')}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Attendance ID:</span>
                                    <div className="font-medium">#{attendance.id}</div>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        {attendance.latitude && attendance.longitude && (
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h3 className="font-semibold text-gray-900 mb-2">GPS Coordinates</h3>
                                <div className="text-sm text-gray-600">
                                    <div>Latitude: {attendance.latitude.toFixed(6)}</div>
                                    <div>Longitude: {attendance.longitude.toFixed(6)}</div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {attendance.notes && (
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                                <p className="text-gray-700">{attendance.notes}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button asChild className="flex-1" size="lg">
                                <Link href="/patrol/scanner">
                                    📱 Scan Another Post
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="flex-1" size="lg">
                                <Link href="/patrol">
                                    📋 Back to Dashboard
                                </Link>
                            </Button>
                        </div>

                        {/* Success Message */}
                        <div className="text-center pt-4">
                            <p className="text-green-700">
                                🎉 Great job! Keep up the excellent patrol work.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}