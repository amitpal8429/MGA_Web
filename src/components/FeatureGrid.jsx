import {
  IconMentor,
  IconFlex,
  IconCertificate,
  IconCompass,
  IconSupport,
  IconCurriculum,
} from "./icons";

const FEATURES = [
  {
    icon: IconMentor,
    title: "Learn from practising specialists",
    body: "Every module is taught by consultants and department heads who still see patients — not career lecturers.",
  },
  {
    icon: IconFlex,
    title: "Built around a working schedule",
    body: "Online and hybrid formats let you study around OPD hours, on-call weeks and family commitments.",
  },
  {
    icon: IconCertificate,
    title: "Certification that holds up",
    body: "Programs map to recognised curricula, so the credential means the same thing to a hiring committee as it does to you.",
  },
  {
    icon: IconCompass,
    title: "Case-based, not slide-based",
    body: "Modules are structured around real presentations and decision points, the way the condition actually shows up in clinic.",
  },
  {
    icon: IconSupport,
    title: "A mentor you can actually reach",
    body: "Faculty stay reachable for questions after the session ends, for the length of the program.",
  },
  {
    icon: IconCurriculum,
    title: "A curriculum that keeps moving",
    body: "Modules are revised as guidelines and protocols change, instead of staying frozen at launch.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <h2>What every MGA program includes</h2>
        </div>
        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon"><Icon /></div>
              <h4>{title}</h4>
              <p className="muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
