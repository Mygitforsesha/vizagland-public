import FormSection from '@/components/post-property/FormSection';
import ImageUploadField from '@/components/post-property/ImageUploadField';
import DocumentUploadField from '@/components/post-property/DocumentUploadField';
import { formInnerCardClass } from '@/components/post-property/formStyles';

export default function MediaDocumentsSection({ formState, updateField }) {
  return (
    <FormSection title="Media & Documents">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div className={formInnerCardClass}>
          <ImageUploadField
            label="Property Images"
            description="Drag and drop property photos here, or click to browse"
            value={formState.propertyImages}
            onChange={(images) => updateField('propertyImages', images)}
          />
        </div>
        <div className={formInnerCardClass}>
          <DocumentUploadField
            label="Property Documents"
            description="Drag and drop deeds, approvals, or plans here"
            value={formState.propertyDocuments}
            onChange={(documents) => updateField('propertyDocuments', documents)}
          />
        </div>
      </div>
    </FormSection>
  );
}
