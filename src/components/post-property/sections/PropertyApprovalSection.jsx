import FormSection from '@/components/post-property/FormSection';
import { ApprovalField } from '@/components/post-property/fields';
import { formGridClass } from '@/components/post-property/formStyles';

export default function PropertyApprovalSection({ formState, updateField }) {
  return (
    <FormSection title="Property Approved By">
      <div className={formGridClass}>
        <ApprovalField
          value={formState.approvedBy}
          onValueChange={(value) => updateField('approvedBy', value)}
        />
      </div>
    </FormSection>
  );
}
