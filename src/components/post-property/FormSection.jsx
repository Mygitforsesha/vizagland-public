import { cn } from '@/lib/utils';
import {
  formSectionBodyClass,
  formSectionClass,
  formSectionHeaderClass,
} from './formStyles';

export default function FormSection({ title, children, className, bodyClassName }) {
  return (
    <section className={cn(formSectionClass, className)}>
      {title ? <header className={formSectionHeaderClass}>{title}</header> : null}
      <div className={cn(formSectionBodyClass, bodyClassName)}>{children}</div>
    </section>
  );
}
