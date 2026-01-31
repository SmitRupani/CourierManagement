import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Package, 
    User, 
    MapPin, 
    Truck, 
    ArrowRight, 
    CheckCircle, 
    AlertCircle,
    Info,
    Calendar,
    Weight,
    DollarSign,
    Loader2,
    Check
} from 'lucide-react';
import { packageService } from '../services/api';

const CreateShipment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [priceLoading, setPriceLoading] = useState(false);
    const [priceDetails, setPriceDetails] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        sender: {
            name: '',
            phone: '',
            email: '',
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                country: '',
                pincode: ''
            }
        },
        receiver: {
            name: '',
            phone: '',
            email: '',
            address: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                country: '',
                pincode: ''
            }
        },
        packageType: 'NORMAL_POST',
        weight: '',
        description: ''
    });

    const packageTypes = [
        { id: 'NORMAL_POST', label: 'Normal Post', icon: Package, desc: 'Cost-effective, 5-7 days' },
        { id: 'SPEED_POST', label: 'Speed Post', icon: Truck, desc: 'Fast delivery, 2-3 days' },
        { id: 'EXPRESS', label: 'Express', icon: Truck, desc: 'Priority handling, 1-2 days' },
        { id: 'OVERNIGHT', label: 'Overnight', icon: Calendar, desc: 'Next morning delivery' }
    ];

    const handleInputChange = (section, field, value, subfield = null) => {
        if (subfield) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    address: {
                        ...prev[section].address,
                        [subfield]: value
                    }
                }
            }));
        } else if (section === 'root') {
            setFormData(prev => ({ ...prev, [field]: value }));
        } else {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        }
    };

    const fetchPrice = async () => {
        if (!formData.weight || isNaN(formData.weight)) return;
        setPriceLoading(true);
        try {
            const res = await packageService.calculatePrice({
                weight: parseFloat(formData.weight),
                packageType: formData.packageType
            });
            setPriceDetails(res.data);
        } catch (err) {
            console.error("Price calc error", err);
        } finally {
            setPriceLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPrice();
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.weight, formData.packageType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Fill default state/country
            const dataToSubmit = { ...formData };
            dataToSubmit.sender.address.state = dataToSubmit.sender.address.state || "Maharashtra";
            dataToSubmit.sender.address.country = dataToSubmit.sender.address.country || "India";
            dataToSubmit.receiver.address.state = dataToSubmit.receiver.address.state || "Delhi";
            dataToSubmit.receiver.address.country = dataToSubmit.receiver.address.country || "India";
            
            const res = await packageService.createPackage(dataToSubmit);
            setSuccess(true);
            setTimeout(() => {
                navigate(`/tracking-internal?id=${res.data.trackingNumber}`);
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create shipment. Please check all fields.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="glass p-12 rounded-3xl text-center max-w-md w-full animate-fade-in shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Shipment Booked!</h2>
                    <p className="text-gray-400 mb-8">Redirecting to tracking details...</p>
                    <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto pb-20">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold text-white">Book New Shipment</h1>
                <p className="text-gray-500">Fill in the details to generate your tracking ID and label.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-shake">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Forms */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Sender Details */}
                    <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Sender Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Enter sender name"
                                    value={formData.sender.name}
                                    onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                <input 
                                    type="tel" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="+91 98765 43210"
                                    value={formData.sender.phone}
                                    onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Line 1</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="House No, Street, Area"
                                    value={formData.sender.address.line1}
                                    onChange={(e) => handleInputChange('sender', 'address', e.target.value, 'line1')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Mumbai"
                                    value={formData.sender.address.city}
                                    onChange={(e) => handleInputChange('sender', 'address', e.target.value, 'city')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pincode</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="400001"
                                    value={formData.sender.address.pincode}
                                    onChange={(e) => handleInputChange('sender', 'address', e.target.value, 'pincode')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Receiver Details */}
                    <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-purple-500/10 transition-colors"></div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                <MapPin size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Receiver Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recipient Name</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Enter receiver name"
                                    value={formData.receiver.name}
                                    onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Receiver Phone</label>
                                <input 
                                    type="tel" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="+91 99887 76655"
                                    value={formData.receiver.phone}
                                    onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Destination Address</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Apartment, Street, Landmark"
                                    value={formData.receiver.address.line1}
                                    onChange={(e) => handleInputChange('receiver', 'address', e.target.value, 'line1')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Delhi"
                                    value={formData.receiver.address.city}
                                    onChange={(e) => handleInputChange('receiver', 'address', e.target.value, 'city')}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pincode</label>
                                <input 
                                    type="text" required
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="110001"
                                    value={formData.receiver.address.pincode}
                                    onChange={(e) => handleInputChange('receiver', 'address', e.target.value, 'pincode')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Package Info */}
                    <div className="glass p-6 md:p-8 rounded-2xl">
                         <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                                <Package size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Item Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-4">Service Type</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                    {packageTypes.map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => handleInputChange('root', 'packageType', type.id)}
                                            className={`p-4 rounded-xl border text-left transition-all ${
                                                formData.packageType === type.id 
                                                ? 'bg-yellow-500/10 border-yellow-500 text-white shadow-lg shadow-yellow-500/10' 
                                                : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                                            }`}
                                        >
                                            <type.icon className={`mb-3 ${formData.packageType === type.id ? 'text-yellow-500' : ''}`} size={24} />
                                            <div className="font-bold text-sm mb-1">{type.label}</div>
                                            <div className="text-[10px] opacity-60 leading-tight">{type.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                    Total Weight (kg) <Info size={14} className="opacity-40" />
                                </label>
                                <div className="relative">
                                    <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                    <input 
                                        type="number" step="0.1" required
                                        className="input w-full bg-white/5 border-white/10 pl-12"
                                        placeholder="0.0"
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange('root', 'weight', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description (Optional)</label>
                                <input 
                                    type="text"
                                    className="input w-full bg-white/5 border-white/10"
                                    placeholder="Fragile, Electronic, etc."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('root', 'description', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Price & Summary */}
                <div className="lg:col-span-4">
                    <div className="sticky top-8 space-y-6">
                        <div className="glass p-8 rounded-2xl relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-200"></div>
                             <h3 className="text-xl font-bold text-white mb-6">Price Summary</h3>
                             
                             <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Base Fare</span>
                                    <span className="text-white font-mono">${priceDetails?.basePrice?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Weight Charge</span>
                                    <span className="text-white font-mono">${priceDetails?.weightCharge?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="h-px bg-white/5 my-2"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Amount</span>
                                    <div className="text-3xl font-bold text-yellow-500 font-mono">
                                        {priceLoading ? (
                                            <Loader2 className="w-6 h-6 animate-spin inline-block" />
                                        ) : (
                                            `$${priceDetails?.totalAmount?.toFixed(2) || '0.00'}`
                                        )}
                                    </div>
                                </div>
                             </div>

                             <div className="space-y-3">
                                <div className="flex gap-2 text-[10px] text-gray-500 items-start">
                                    <Info size={14} className="shrink-0 mt-0.5" />
                                    <p>By clicking book shipment, you agree to our terms of luggage handling and insurance policy.</p>
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loading || !priceDetails}
                                    className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg transition-all shadow-xl shadow-yellow-500/20 disabled:opacity-50 disabled:scale-100 active:scale-95 flex items-center justify-center gap-3 group"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            Book Shipment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                             </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                             <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" /> Guaranteed Delivery
                             </h4>
                             <ul className="space-y-3">
                                {[
                                    'Real-time tracking notifications',
                                    'Secure digital OTP verification',
                                    'Damage protection insurance',
                                    'Priority support access'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-xs text-gray-500">
                                        <div className="w-1 h-1 rounded-full bg-gray-700 mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateShipment;
