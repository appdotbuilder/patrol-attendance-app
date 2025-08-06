import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Role {
    id: number;
    name: string;
    display_name: string;
}

interface SecurityOfficer {
    id: number;
    name: string;
    email: string;
    employee_id: string;
    status: string;
    role: Role;
    created_at: string;
}

interface PaginatedData {
    data: SecurityOfficer[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    officers: PaginatedData;
    [key: string]: unknown;
}

export default function SecurityOfficersIndex({ officers }: Props) {
    return (
        <AppShell>
            <Head title="Security Officers" />
            
            <div className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👮 Security Officers</h1>
                        <p className="text-gray-600">Manage security officer profiles and QR codes</p>
                    </div>
                    <Button asChild>
                        <Link href="/security-officers/create">
                            ➕ Add New Officer
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Officers ({officers.total})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {officers.data.length > 0 ? (
                            <div className="space-y-4">
                                {officers.data.map((officer) => (
                                    <div key={officer.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{officer.name}</h3>
                                            <p className="text-sm text-gray-600">{officer.email}</p>
                                            <p className="text-sm text-gray-500">ID: {officer.employee_id}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                officer.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {officer.status.toUpperCase()}
                                            </span>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/security-officers/${officer.id}`}>
                                                    View Details
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👮</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No security officers</h3>
                                <p className="text-gray-600 mb-6">Add security officers to start managing patrol attendance</p>
                                <Button asChild>
                                    <Link href="/security-officers/create">Add First Officer</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}