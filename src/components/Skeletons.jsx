export function CourseCardSkeleton() {
  return (
    <div className="course-card course-card-skel">
      <div className="skel course-card-img" />
      <div className="course-card-body">
        <div className="skel" style={{ width: 90, height: 22, marginBottom: 14, borderRadius: 999 }} />
        <div className="skel" style={{ width: "85%", height: 20, marginBottom: 10 }} />
        <div className="skel" style={{ width: "100%", height: 14, marginBottom: 6 }} />
        <div className="skel" style={{ width: "70%", height: 14 }} />
      </div>
    </div>
  );
}

export function CourseGridSkeleton({ count = 6 }) {
  return (
    <div className="course-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="wrap detail-skel">
      <div className="skel" style={{ width: 140, height: 14, marginBottom: 18 }} />
      <div className="skel" style={{ width: "60%", height: 44, marginBottom: 14 }} />
      <div className="skel" style={{ width: "40%", height: 16, marginBottom: 36 }} />
      <div className="skel" style={{ width: "100%", height: 260, borderRadius: 20 }} />
    </div>
  );
}
