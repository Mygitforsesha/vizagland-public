import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Building, Headphones, MessageSquare, Info, ChevronDown, ChevronUp, Send, RotateCcw } from 'lucide-react';
import { useContactSubmission } from '@/lib/contact/useContactSubmission';
import { fetchContactUs, getInitialContactUsView } from '@/services/contactUsService';

const INITIAL_FORM_DATA = {
  name: '',
  mobile: '',
  email: '',
  subject: 'Property Enquiry',
  propertyId: '',
  district: '',
  message: '',
  consent: false,
};

export function ContactPage() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [openFaq, setOpenFaq] = useState(null);
  const [contactUs, setContactUs] = useState(getInitialContactUsView);
  const { isSubmitting, submitted, submitEnquiry } = useContactSubmission();

  useEffect(() => {
    fetchContactUs().then(setContactUs);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await submitEnquiry(formData, { onSuccess: resetForm });
  }

  function resetForm() {
    setFormData(INITIAL_FORM_DATA);
  }

  const { helpline, districtOffices, workingHours, faqs } = contactUs;

  return (
    <>
      {/* Page Header */}
      <div className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-white text-xl font-bold m-0 flex items-center gap-2">
            <Phone size={20} /> Contact Us
          </h2>
          <p className="text-blue-200 text-[13px] mt-1 mb-0">Reach out to our helpdesk or district offices</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500">
            <a href="/" className="text-gray-500 no-underline hover:text-accent">Home</a>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Helpline */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-primary text-white text-[13px] font-bold px-4 py-3 flex items-center gap-2">
                  <Headphones size={14} /> Helpline
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-primary text-base">{helpline.phone}</div>
                      <div className="text-[12px] text-gray-500">{helpline.phoneLabel}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-[13px]">{helpline.email}</div>
                      <div className="text-[12px] text-gray-500">{helpline.emailLabel}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-[13px]">{helpline.officeName}</div>
                      <div className="text-[12px] text-gray-500">{helpline.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* District Offices */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                  <Building size={14} /> District Offices
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead className="bg-gray-50">
                      <tr><th className="text-left px-4 py-2 font-semibold text-gray-600">District</th><th className="text-left px-4 py-2 font-semibold text-gray-600">Phone</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {districtOffices.map(([d, p]) => (
                        <tr key={d}><td className="px-4 py-2">{d}</td><td className="px-4 py-2 text-gray-600">{p}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                  <Clock size={14} /> Working Hours
                </div>
                <div className="p-4 space-y-2">
                  {workingHours.map(([day, time, red]) => (
                    <div key={day} className="flex justify-between items-center text-[13px]">
                      <span className="text-gray-600 font-medium">{day}</span>
                      <span className={red ? 'text-red-600 font-semibold' : 'text-gray-800 font-semibold'}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form + FAQ */}
            <div className="lg:col-span-2 space-y-4">
              {/* Contact Form */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-primary text-white text-[13px] font-bold px-4 py-3 flex items-center gap-2">
                  <MessageSquare size={14} /> Send a Message
                </div>
                <div className="p-5">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 flex items-start gap-2 text-[13px] text-blue-800">
                    <Info size={16} className="flex-shrink-0 mt-0.5" />
                    For property-related enquiries, please mention the Property ID (e.g., APRE-001) in your message for faster resolution.
                  </div>

                  {submitted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-[13px] text-green-800 font-medium">
                      Your enquiry has been submitted successfully. We will contact you within 24 hours.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Mobile Number <span className="text-red-500">*</span></label>
                        <input type="tel" required value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} placeholder="10-digit mobile number" className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com (optional)" className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Subject</label>
                        <select value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent">
                          <option>Property Enquiry</option>
                          <option>Property Complaint</option>
                          <option>Agent Registration</option>
                          <option>Technical Issue</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Property ID (if applicable)</label>
                        <input type="text" value={formData.propertyId} onChange={e => setFormData({ ...formData, propertyId: e.target.value })} placeholder="E.g. APRE-001" className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">District</label>
                        <select value={formData.district} onChange={e => setFormData({ ...formData, district: e.target.value })} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent">
                          <option value="">Select District</option>
                          <option>Hyderabad</option>
                          <option>Vijayawada</option>
                          <option>Visakhapatnam</option>
                          <option>Tirupati</option>
                          <option>Guntur</option>
                          <option>Nellore</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[12px] font-semibold text-gray-600 block mb-1">Message <span className="text-red-500">*</span></label>
                        <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your query or issue in detail..." className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-accent resize-y" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" required checked={formData.consent} onChange={e => setFormData({ ...formData, consent: e.target.checked })} className="mt-0.5 accent-primary" />
                          <span className="text-[12px] text-gray-600">I consent to being contacted by AP Real Estate Portal officials regarding my enquiry.</span>
                        </label>
                      </div>
                      <div className="md:col-span-2 flex gap-2">
                        <button type="submit" disabled={isSubmitting} className="bg-primary text-white text-[13px] font-semibold px-5 py-2.5 rounded-md flex items-center gap-2 hover:bg-primary-dark transition-colors disabled:cursor-not-allowed disabled:opacity-60">
                          <Send size={14} /> {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                        </button>
                        <button type="button" onClick={resetForm} className="border border-gray-300 text-gray-600 text-[13px] font-semibold px-5 py-2.5 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors">
                          <RotateCcw size={14} /> Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 text-gray-700 text-[13px] font-bold px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                  Frequently Asked Questions
                </div>
                <div className="divide-y divide-gray-100">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-gray-800 bg-transparent border-0 cursor-pointer text-left hover:bg-gray-50 transition-colors">
                        {faq.q}
                        {openFaq === i ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-3 text-[13px] text-gray-600 animate-slide-down">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
