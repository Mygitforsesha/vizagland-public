import FormSection from '@/components/post-property/FormSection';
import ImageUploadField from '@/components/post-property/ImageUploadField';
import DocumentUploadField from '@/components/post-property/DocumentUploadField';
import { formInnerCardClass } from '@/components/post-property/formStyles';

export default function MediaDocumentsSection({ formState, updateField }) {
  return (
    <FormSection>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
        <div className={formInnerCardClass}>
          <ImageUploadField
            hideTitle
            description="Drag and drop property photos here, or click to browse"
            value={formState.propertyImages}
            onChange={(images) => updateField('propertyImages', images)}
          />
        </div>
        <div className={formInnerCardClass}>
          <DocumentUploadField
            hideTitle
            description="Drag and drop deeds, approvals, or plans here"
            value={formState.propertyDocuments}
            onChange={(documents) => updateField('propertyDocuments', documents)}
          />
        </div>
      </div>
    </FormSection>
  );
}
