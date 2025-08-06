import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Scanner(): React.ReactElement {
    const [qrCode, setQrCode] = useState('');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [locationError, setLocationError] = useState('');

    const getCurrentLocation = () => {
        setLocationError('');
        
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError('Location access denied. Please enable location services.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        setLocationError('Location request timed out.');
                        break;
                    default:
                        setLocationError('An unknown error occurred while retrieving location.');
                        break;
                }
            }
        );
    };

    const handleScan = () => {
        if (!qrCode.trim()) {
            alert('Please enter a QR code');
            return;
        }

        setIsScanning(true);
        
        const data = {
            qr_code_token: qrCode.trim(),
            notes: notes.trim(),
            latitude: location?.latitude,
            longitude: location?.longitude,
        };

        router.post('/attendances', data, {
            preserveState: false,
            onSuccess: () => {
                // Will redirect to success page
            },
            onError: (errors) => {
                console.error('Scan error:', errors);
                alert('Invalid QR code or scanning error. Please try again.');
                setIsScanning(false);
            }
        });
    };

    return (
        <AppShell>
            <Head title="QR Code Scanner" />
            
            <div className="p-6 max-w-2xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">📱 QR Code Scanner</h1>
                    <p className="text-gray-600">Scan patrol post QR codes to log your attendance</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Scan Patrol Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* QR Code Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                QR Code / Token
                            </label>
                            <Input
                                value={qrCode}
                                onChange={(e) => setQrCode(e.target.value)}
                                placeholder="Enter QR code or scan with camera"
                                className="text-lg"
                                disabled={isScanning}
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Type or paste the QR code token from the patrol post
                            </p>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Location
                            </label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    onClick={getCurrentLocation}
                                    variant="outline"
                                    disabled={isScanning}
                                >
                                    📍 Get Location
                                </Button>
                                {location && (
                                    <div className="text-sm text-green-600">
                                        ✅ Location captured ({location.latitude.toFixed(6)}, {location.longitude.toFixed(6)})
                                    </div>
                                )}
                            </div>
                            {locationError && (
                                <p className="text-sm text-red-600 mt-1">{locationError}</p>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Notes (Optional)
                            </label>
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add any notes about this patrol checkpoint..."
                                rows={3}
                                disabled={isScanning}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleScan}
                                disabled={isScanning || !qrCode.trim()}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                size="lg"
                            >
                                {isScanning ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Processing Scan...
                                    </>
                                ) : (
                                    <>
                                        ✅ Submit Attendance
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Instructions */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>1. Find the QR code at your patrol post</li>
                                <li>2. Enter or scan the QR code token</li>
                                <li>3. Click "Get Location" to capture your GPS coordinates</li>
                                <li>4. Add any relevant notes about the checkpoint</li>
                                <li>5. Submit to log your patrol attendance</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}