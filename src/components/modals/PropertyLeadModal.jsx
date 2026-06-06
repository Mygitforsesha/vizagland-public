import { X, Phone, User, Mail, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function PropertyLeadModal({
    isOpen,
    onClose,
    onSubmit,
}) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState({});


    const validate = () => {
        const newErrors = {};

        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid mobile number";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        onSubmit(formData);

        setFormData({
            name: "",
            phone: "",
            email: "",
        });

        setErrors({});
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                className="
      bg-white
      w-full
      max-w-sm
      rounded-2xl
      shadow-2xl
      overflow-hidden

      max-h-[85vh]
      flex
      flex-col
    "
            >


                {/* Header */}
                <div className="relative px-5 pt-5 pb-4 text-center border-b border-gray-100 shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>

                    <div className="w-10 h-10 mx-auto rounded-full bg-accent-light flex items-center justify-center">
                        <Phone
                            size={16}
                            className="text-accent"
                        />
                    </div>

                    <h3 className="mt-3 text-lg sm:text-xl font-bold text-primary">
                        Submit Property
                    </h3>

                    <p className="mt-1 text-[13px] sm:text-xs sm:text-sm text-gray-500">
                        Enter your mobile number and our team will contact you after reviewing your property.
                    </p>
                </div>

                {/* Body */}
                <div
                    className="
    flex-1
    overflow-y-auto
    p-5
    space-y-4
  "
                >
                    {/* Name */}
                    <div className="overflow-auto">
                        <label className="text-[11px] sm:text-xs font-medium text-gray-600 mb-1 block">
                            Full Name
                        </label>

                        <div className="relative">
                            <User
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Your name (optional)"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
                            />
                        </div>
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="text-[11px] sm:text-xs font-medium text-gray-600 mb-1 block">
                            Mobile Number *
                        </label>

                        <div className="flex">

                            <div className="px-3 flex items-center bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-xs sm:text-sm font-medium text-gray-700">
                                +91
                            </div>

                            <input
                                type="tel"
                                maxLength={10}
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value.replace(/\D/g, ""),
                                    })
                                }
                                className="flex-1 px-4 py-3 text-xs sm:text-sm border border-gray-200 rounded-r-xl focus:outline-none focus:border-accent"
                            />
                        </div>

                        {errors.phone && (
                            <p className="text-red-500 text-[11px] sm:text-xs mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-[11px] sm:text-xs font-medium text-gray-600 mb-1 block">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                placeholder="Email (optional)"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-accent"
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-accent-light rounded-xl p-3 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-700">
                            <ShieldCheck
                                size={14}
                                className="text-green-600"
                            />
                            Free Property Listing
                        </div>

                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-700">
                            <ShieldCheck
                                size={14}
                                className="text-green-600"
                            />
                            Verified by Vizag Land Team
                        </div>

                        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-700">
                            <ShieldCheck
                                size={14}
                                className="text-green-600"
                            />
                            Response within 24–48 Hours
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all"
                    >
                        Submit Request
                    </button>

                    <p className="text-[11px] text-center text-gray-400">
                        By submitting, you agree to be contacted regarding your property listing.
                    </p>

                </div>

            </div>
        </div>
    );
}