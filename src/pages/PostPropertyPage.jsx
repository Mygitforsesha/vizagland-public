import { useState } from 'react';
import { Building, Phone } from 'lucide-react';
import PropertyLeadModal from '@/components/modals/PropertyLeadModal';
import PropertySuccessModal from '@/components/modals/PropertySuccessModal';
import PostPropertyForm from '@/components/post-property/PostPropertyForm';
import PostModeToggle from '@/components/post-property/PostModeToggle';
import { formHelpLinkClass, formPageClass } from '@/components/post-property/formStyles';
import { usePostPropertyForm } from '@/lib/post-property/usePostPropertyForm';
import { usePropertySubmissionFlow } from '@/lib/post-property/usePropertySubmissionFlow';

export function PostPropertyPage() {
  const [postMode, setPostMode] = useState('owner');
  const { formState, updateField, getFormState, dynamicAreaUnitOptions } = usePostPropertyForm();

  const {
    isLeadModalOpen,
    isSuccessModalOpen,
    submissionReferenceId,
    openLeadModal,
    closeLeadModal,
    closeSuccessModal,
    handleLeadSubmit,
  } = usePropertySubmissionFlow(getFormState);

  return (
    <>
      <div className="bg-primary py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-white text-xl font-bold m-0 flex items-center gap-2">
                <Building size={20} /> Post Property
              </h2>
              <p className="text-blue-200 text-[13px] mt-1 mb-0">
                List your property across Visakhapatnam GVMC &amp; VMRDA area
              </p>
            </div>
            <PostModeToggle value={postMode} onChange={setPostMode} />
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-[12px] text-gray-500">
            <a href="/" className="text-gray-500 no-underline hover:text-accent">
              Home
            </a>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">Post Property</span>
          </nav>
        </div>
      </div>

      <section className={formPageClass}>
        <PostPropertyForm
          formState={formState}
          updateField={updateField}
          dynamicAreaUnitOptions={dynamicAreaUnitOptions}
          onSubmitClick={openLeadModal}
          postMode={postMode}
        />
      </section>

      <a href="tel:9618170406" className={formHelpLinkClass}>
        <Phone size={14} className="sm:size-4" aria-hidden />
        <span className="hidden sm:inline">Need Help?</span> 9618170406
      </a>

      <PropertyLeadModal
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
        onSubmit={handleLeadSubmit}
      />

      <PropertySuccessModal
        isOpen={isSuccessModalOpen}
        referenceId={submissionReferenceId}
        onClose={closeSuccessModal}
      />
    </>
  );
}
