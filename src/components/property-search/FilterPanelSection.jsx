import { filterPanelSectionBodyClass, filterPanelSectionTitleClass } from './filterPanelStyles';

export function FilterPanelSection({ title, children, trailing }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className={filterPanelSectionTitleClass}>{title}</h3>
        {trailing}
      </div>
      <div className={filterPanelSectionBodyClass}>{children}</div>
    </section>
  );
}
