import { TESTIMONIALS } from "../lib/testimonials";
import { IconQuote } from "./icons";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>What graduates say about the training</h2>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure className="testimonial-card" key={i}>
              <IconQuote className="testimonial-mark" />
              <blockquote>{t.quote}</blockquote>
              <figcaption className="muted">{t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
