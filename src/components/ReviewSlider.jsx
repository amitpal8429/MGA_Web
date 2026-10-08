import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INSTAGRAM_REVIEWS, INSTAGRAM_PROFILE } from "../config/reviews";

const SPEED = 0.6;          // auto-scroll speed (px per frame)
const CARD_W = 230;         // card ki chaudai (video ke size ke barabar)
const GAP = 14;             // cards ke beech ka gap
const RESUME_DELAY = 2500;  // manual scroll ke baad auto-scroll wapas kab shuru ho

// Instagram URL -> embed URL
function toEmbed(url) {
  const m = String(url).match(/instagram\.com\/(p|reel)\/([^/?#]+)/i);
  if (!m) return null;
  return { code: m[2], src: `https://www.instagram.com/${m[1]}/${m[2]}/embed` };
}

const ITEMS = INSTAGRAM_REVIEWS.map(toEmbed).filter(Boolean);

const CSS = `
  .rv-side {
    padding: 22px 18px 18px;
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .rv-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;
  }

  .rv-title {
    margin: 0;
    color: #16324f;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 750;
  }

  .rv-sub {
    margin: 4px 0 0;
    color: #596b7e;
    font-size: 13px;
    line-height: 1.4;
  }

  .rv-arrows { display: flex; gap: 6px; flex: 0 0 auto; }

  .rv-arrow {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid #dce4ea;
    background: #ffffff;
    color: #16324f;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.15s ease, color 0.15s ease;
  }

  .rv-arrow:hover { border-color: #1f7ac4; color: #1f7ac4; }

  .rv-track {
    display: flex;
    gap: ${GAP}px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .rv-track::-webkit-scrollbar { display: none; }

  /* Card = sirf video wala hissa. Header, footer aur kali patti crop ho jati hai.
     Upar header ka hissa dikhe to --rv-top badhao,
     video ka upar ka hissa kat jaye to --rv-top ghatao. */
  .rv-card {
    --rv-top: 54px;       /* Instagram header ki height jo chhupani hai */
    --rv-frame-w: 328px;  /* iframe ki chaudai */
    position: relative;
    flex: 0 0 ${CARD_W}px;
    height: 409px;        /* 9:16 video: 230 x 409 */
    border-radius: 12px;
    overflow: hidden;
    background: #000000;
  }

  .rv-card iframe {
    position: absolute;
    top: calc(var(--rv-top) * -1);
    left: 50%;
    width: var(--rv-frame-w);
    height: 760px;
    border: 0;
    transform: translateX(-50%);
  }

  .rv-follow {
    display: inline-block;
    margin-top: 12px;
    color: #1f7ac4;
    font-weight: 600;
    font-size: 14px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (max-width: 480px) {
    .rv-arrows { display: none; }
  }
`;

export default function ReviewSlider() {
  const trackRef = useRef(null);
  const hold = useRef({ hover: false, manual: false });
  const timer = useRef(null);

  // Auto-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let raf;
    let pos = el.scrollLeft;

    const tick = () => {
      const h = hold.current;

      if (h.hover || h.manual) {
        pos = el.scrollLeft; // user jahan chhode wahin se aage badho
      } else {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          pos += SPEED;
          if (pos >= max - 1) pos = 0; // end par wapas shuru
          el.scrollLeft = pos;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const holdManual = () => {
    hold.current.manual = true;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      hold.current.manual = false;
    }, RESUME_DELAY);
  };

  const nudge = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    holdManual();
    el.scrollBy({ left: dir * (CARD_W + GAP), behavior: "smooth" });
  };

  if (ITEMS.length === 0) return null;

  return (
    <div className="rv-side" aria-labelledby="learner-reviews-title">
      <style>{CSS}</style>

      <div className="rv-head">
        <div>
          <h4 id="learner-reviews-title" className="rv-title">
            What our learners say
          </h4>
          <p className="rv-sub">Real feedback from doctors who learned with us</p>
        </div>

        <div className="rv-arrows">
          <button
            type="button"
            className="rv-arrow"
            onClick={() => nudge(-1)}
            aria-label="Previous reviews"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            type="button"
            className="rv-arrow"
            onClick={() => nudge(1)}
            aria-label="Next reviews"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div
        className="rv-track"
        ref={trackRef}
        onMouseEnter={() => {
          hold.current.hover = true;
        }}
        onMouseLeave={() => {
          hold.current.hover = false;
        }}
        onTouchStart={() => {
          hold.current.manual = true;
          clearTimeout(timer.current);
        }}
        onTouchEnd={holdManual}
        onWheel={holdManual}
      >
        {ITEMS.map((item) => (
          <div className="rv-card" key={item.code}>
            <iframe
              src={item.src}
              title={`Learner review video ${item.code}`}
              loading="lazy"
              scrolling="no"
              allow="encrypted-media; autoplay"
            />
          </div>
        ))}
      </div>

      <a
        className="rv-follow"
        href={INSTAGRAM_PROFILE}
        target="_blank"
        rel="noopener noreferrer"
      >
        See more on Instagram →
      </a>
    </div>
  );
}