import { Link } from "react-router-dom";
import { Clock3, ArrowRight } from "lucide-react";
import CourseImage from "./CourseImage";
import { formatDuration, typeClass, cleanText } from "../lib/format";

export default function CourseCard({ course }) {
  const duration = formatDuration(course.duration);
  const excerpt = cleanText(course.description).slice(0, 118);

  return (
    <Link to={`/${course.slug}`} className="course-card">
      <div className="course-card-media">
        <CourseImage src={course.image} alt={course.name} className="course-card-img" />
        <span className={`course-card-type ${typeClass(course.type)}`}>{course.type}</span>
      </div>

      <div className="course-card-body">
        <div className="course-card-badges">
          {duration && (
            <span className="badge">
              <Clock3 size={13} /> {duration}
            </span>
          )}
          <span className="badge badge-muted">All levels</span>
        </div>

        <h3 className="course-card-title">{course.name}</h3>
        <p className="course-card-excerpt muted">{excerpt}…</p>

        <span className="course-card-cta">
          View program <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
