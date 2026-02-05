import { ReactNode, useEffect, useRef, useState } from "react";

const activity = [
  {
    title: "Released Lumen Drift",
    date: "Feb 4, 2026",
    tag: "Music",
    href: "https://works.mysxan.com/",
  },
  {
    title: "Updated Course Scheduler",
    date: "Feb 1, 2026",
    tag: "Tool",
    href: "https://apps.mysxan.com/",
  },
  {
    title: "Published a new illustration",
    date: "Jan 28, 2026",
    tag: "Art",
    href: "https://works.mysxan.com/",
  },
  {
    title: "Launched Apps Hub",
    date: "Jan 20, 2026",
    tag: "Product",
    href: "https://apps.mysxan.com/",
  },
  {
    title: "Studio dashboard refresh",
    date: "Jan 12, 2026",
    tag: "Studio",
    href: "https://archive.mysxan.com/",
  },
  {
    title: "New portfolio highlight",
    date: "Jan 5, 2026",
    tag: "Works",
    href: "https://works.mysxan.com/",
  },
  {
    title: "Published sound design pack",
    date: "Dec 22, 2025",
    tag: "Music",
    href: "https://works.mysxan.com/",
  },
  {
    title: "Added automation utilities",
    date: "Dec 10, 2025",
    tag: "Tool",
    href: "https://apps.mysxan.com/",
  },
];

const apps = [
  {
    title: "Wordle Helper",
    meta: "Daily puzzle assistant",
    url: "apps.mysxan.com/wordle-helper/",
    href: "https://apps.mysxan.com/wordle-helper/",
  },
  {
    title: "Course Scheduler",
    meta: "Plan and preview schedules",
    url: "apps.mysxan.com/course-scheduler/",
    href: "https://apps.mysxan.com/course-scheduler/",
  },
];

const links = [
  {
    tag: "Game Community",
    title: "Phigrim",
    href: "https://www.phigrim.cn/en/",
    description: "A community-driven rhythm game",
  },
  {
    tag: "Friend's Work",
    title: "nearcade",
    href: "https://nearcade.phizone.cn/",
    description: "An arcade locator for nearby venues",
  },
  {
    tag: "Game Community",
    title: "Simple",
    href: "https://www.taptap.cn/app/267034",
    description: "A minimalist falling-note rhythm game",
  },
  {
    tag: "Organization",
    title: "IVORG",
    href: "https://www.instagram.com/illinois_vocaloid/",
    description: "A Vocaloid Research Group at UIUC",
  },
  {
    tag: "Friend's Link",
    title: "Celestia's Blog",
    href: "https://moerain.cn/",
    description: "Celestia's personal website",
  },
];

function useCursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let currentX = 50;
    let currentY = 20;
    let targetX = 50;
    let targetY = 20;
    let frame: number | null = null;

    const lerp = (start: number, end: number, amt: number) =>
      start + (end - start) * amt;

    const update = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      root.style.setProperty("--mx-glow-x", `${currentX.toFixed(2)}%`);
      root.style.setProperty("--mx-glow-y", `${currentY.toFixed(2)}%`);
      frame = window.requestAnimationFrame(update);
    };

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);
}

function GlassCard({ children }: { children: ReactNode }) {
  return <div className="mx-glass">{children}</div>;
}

type TiltProps = {
  children: ReactNode;
  className?: string;
  maxTiltDeg?: number;
  perspective?: number;
};

function TiltCard({
  children,
  className = "",
  maxTiltDeg = 7,
  perspective = 1000,
}: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotY = (px - 0.5) * (maxTiltDeg * 2);
    const rotX = -(py - 0.5) * (maxTiltDeg * 2);
    const scale = 1.01;

    el.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(
      2,
    )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale})`;
    el.style.setProperty("--mx-card-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--mx-card-y", `${(py * 100).toFixed(1)}%`);
  };

  const onEnter = () => setHover(true);

  const onLeave = () => {
    const el = ref.current;
    setHover(false);
    if (!el) return;
    el.style.transition = "transform 220ms cubic-bezier(.2,.8,.2,1)";
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    window.setTimeout(() => {
      if (el) el.style.transition = "";
    }, 240);
  };

  return (
    <div
      ref={ref}
      className={`mx-glass ${hover ? "is-hover" : ""} ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

export default function App() {
  useCursorGlow();

  const handleLinksClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: maxScroll, behavior: "smooth" });
  };

  return (
    <div className="mx-bg relative text-zinc-900">
      <header className="fixed left-0 right-0 top-0 z-40 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-8">
            <a
              href="https://mysxan.com/"
              className="font-semibold tracking-tight"
            >
              MySxan
            </a>
            <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
              <a
                className="transition hover:text-zinc-900"
                href="https://archive.mysxan.com"
              >
                Archive
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="https://apps.mysxan.com/"
              >
                Apps
              </a>
              <a className="transition hover:text-zinc-900" href="/activities">
                Activities
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="https://works.mysxan.com/"
              >
                Portfolio
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="#"
                onClick={handleLinksClick}
              >
                Links
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 hover:opacity-95"
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pt-16">
        <section className="pt-10 md:pt-16">
          <div className="flex max-w-2xl flex-col">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
              MySxan · Index
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              A Personal Archive <br />
              of What I Build and Create.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-zinc-600">
              Sign in to connect your data across my apps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://archive.mysxan.com/"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-150 hover:opacity-95"
              >
                Explore archive
              </a>
              <a
                href="https://works.mysxan.com/"
                className="rounded-full border border-zinc-200 bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition duration-150 hover:bg-white"
              >
                View portfolio
              </a>
              <a
                href="https://mysxan.com/contact"
                className="rounded-full border border-zinc-200 bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition duration-150 hover:bg-white"
              >
                Contact
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-end justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Latest activity
              </h2>
              <a
                className="text-sm text-slate-600 transition duration-150 hover:text-slate-900"
                href="/activities"
              >
                View all
              </a>
            </div>
            <GlassCard>
              <ul className="divide-y divide-zinc-200/60">
                {activity.map((item) => (
                  <li key={item.title} className="px-5 py-4">
                    <a href={item.href} className="group block">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium text-slate-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          {item.date}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <span className="rounded-full border border-zinc-200 bg-white/60 px-2 py-0.5">
                          {item.tag}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <div>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="text-xl font-bold text-slate-900">Apps</h2>
              <a
                className="text-sm text-slate-600 transition duration-150 hover:text-slate-900"
                href="https://apps.mysxan.com/"
              >
                View all
              </a>
            </div>
            <div className="grid gap-4">
              {apps.map((item) => (
                <TiltCard key={item.title} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="h-[68px] w-[68px] rounded-2xl border border-slate-300/60 bg-white/70" />
                    <div>
                      <div className="font-medium text-slate-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-slate-600">{item.meta}</div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Links</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {links.map((item) => (
              <a key={item.title} href={item.href} className="block">
                <TiltCard className="p-6">
                  <div className="flex h-full flex-col">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400 pb-1">
                      {item.tag}
                    </div>
                    <div className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-600 leading-tight">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-zinc-200/60 py-8 text-sm text-slate-600 md:flex-row">
          <div>© {new Date().getFullYear()} MySxan</div>
          <div className="flex gap-4">
            <a
              className="transition hover:text-slate-900"
              href="https://github.com/MySxan"
            >
              GitHub
            </a>
            <a
              className="transition hover:text-slate-900"
              href="https://works.mysxan.com/"
            >
              Portfolio
            </a>
            <a
              className="transition hover:text-slate-900"
              href="mailto:mysxan@163.com"
            >
              Email
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
