
import React, { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Instagram, Phone, Mail, MapPin, CalendarDays, ArrowRight, Play } from "lucide-react";
import logoWhite from './assets/logo-white.png'
import logo from './assets/logo.png'

const nav = [
  { label: "Academy", href: "#academy" },
  { label: "Courses", href: "#courses" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#events" },
  { label: "Admissions", href: "#admissions" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "backdrop-blur bg-white/75 shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={scrolled ? logo : logoWhite} alt="Fashion Zoom logo" className="h-10 w-auto object-contain" />
          <Badge className="hidden sm:inline-flex bg-[#F81F2E] text-white">Kerala</Badge>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-neutral-700 hover:text-black">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-neutral-100">
            <Instagram size={18} />
          </a>
          <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322]">Apply Now</Button>
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 grid gap-3">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-neutral-800">
                {n.label}
              </a>
            ))}
            <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322]">Apply Now</Button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-28">
      <div className="absolute inset-0 -z-10">
        <img src="/src/assets/fashion-show-2.jpg" alt="Runway" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl text-white">
          <Badge className="bg-[#F81F2E] text-white">Since 2013</Badge>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            Kerala’s Premier Fashion & <span className="text-[#F81F2E]">Modeling Academy</span>
          </h1>
          <p className="mt-4 text-neutral-100/90">
            Train with industry mentors, build your portfolio, and walk real runway shows. From grooming to reels, get career‑ready.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button size="lg" className="bg-[#F81F2E] text-white hover:bg-[#d11322]">
              Join the Academy
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-[#F81F2E] text-[#F81F2E] hover:bg-[#F81F2E] hover:text-white">
              Watch Reels
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-neutral-100/90">
            <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Monthly Batches</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 85908 66865</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Calicut • Kerala</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ children }) {
  return <div className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">{children}</div>;
}

function Academy() {
  return (
    <section id="academy" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">What we do</h2>
            <div className="h-1 w-16 bg-[#F81F2E] rounded mt-2"></div>
            <p className="mt-3 text-neutral-600">A complete ecosystem for modeling & fashion careers.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                ["Academy", "Runway, ramp walk, grooming, posing, reels."],
                ["Magazine", "Editorial shoots, cover features, PR."],
                ["Events", "Fashion shows, pageants, brand launches."],
                ["Productions", "Campaign photos & video reels."],
              ].map(([title, desc]) => (
                <Card key={title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{desc}</p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <Pill>Portfolio</Pill><Pill>Mentors</Pill><Pill>Studios</Pill>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="/src/assets/fashion-show-1.jpg" alt="Academy" className="rounded-2xl shadow-2xl ring-1 ring-black/5 object-cover w-full h-[420px]" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-5">
              <div className="text-3xl font-bold">2k+</div>
              <div className="text-sm text-neutral-600 -mt-1">Alumni & talents</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const items = [
    { title: "Modeling Pro", time: "3 Months", tag: "Placement Focus" },
    { title: "Runway Intensive", time: "6 Weeks", tag: "Show Ready" },
    { title: "Grooming & Etiquette", time: "4 Weeks", tag: "Teens & Adults" },
    { title: "Content & Reels", time: "4 Weeks", tag: "Creator Track" },
  ];
  return (
    <section id="courses" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Courses</h2>
            <div className="h-1 w-16 bg-[#F81F2E] rounded mt-2"></div>
            <p className="mt-2 text-neutral-600">Hands-on curriculum with shoots, runway, and brand projects.</p>
          </div>
          <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322] hidden sm:inline-flex">Get Prospectus</Button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((c) => (
            <Card key={c.title} className="group hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-5">
                <Badge className="bg-black text-white">{c.time}</Badge>
                <h3 className="mt-3 font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-neutral-600">{c.tag}</p>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full group-hover:bg-[#F81F2E]/10">
                  View syllabus <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const imgs = ["/src/assets/fashion-show-1.jpg", "/src/assets/fashion-show-2.jpg", "/src/assets/fashion-show-3.jpg"];
  return (
    <section id="portfolio" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">Portfolio</h2>
            <div className="h-1 w-16 bg-[#F81F2E] rounded mt-2"></div>
            <p className="mt-2 text-neutral-600">Editorials, runway, campaigns.</p>
          </div>
          <a href="#" className="text-sm font-medium hover:underline">See all</a>
        </div>

        <div className="mt-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max">
            {imgs.map((src, i) => (
              <div key={i} className="relative w-[320px] h-[420px] shrink-0 transition-transform duration-200 hover:-translate-y-1">
                <img src={src} className="w-full h-full object-cover rounded-2xl ring-1 ring-black/5" alt={`Portfolio ${i+1}`} />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Events() {
  return (
    <section id="events" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Upcoming Event</h2>
            <div className="h-1 w-16 bg-[#F81F2E] rounded mt-2"></div>
            <p className="mt-2 text-neutral-600">Onam Photo Shoot & Video Reels • August 30 • Calicut</p>
            <ul className="mt-5 grid gap-2 text-sm text-neutral-700 list-disc pl-4">
              <li>Makeup, Hairstyle, Costume Styling</li>
              <li>Professional video reel + Onam feast</li>
              <li>Family packages • No age limit • Limited 30 seats</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322] shadow-md hover:shadow-lg transition-transform hover:scale-[1.02]">Register Now</Button>
              <Button variant="outline" className="border-[#F81F2E] text-[#F81F2E] hover:bg-[#F81F2E] hover:text-white transition-transform hover:scale-[1.02]">View past events</Button>
            </div>
          </div>
          <div className="relative">
            <img src="/src/assets/fashion-show-3.jpg" alt="Event" className="rounded-2xl shadow-2xl ring-1 ring-black/5 object-cover w-full h-[420px]" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-white text-black">Aug 30</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Admissions() {
  return (
    <section id="admissions" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">Admissions</h2>
            <div className="h-1 w-16 bg-[#F81F2E] rounded mt-2"></div>
            <p className="mt-2 text-neutral-600">Tell us about you. Our team will call you back within 24 hours.</p>
            <form className="mt-6 grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Full name" />
                <Input placeholder="Phone number" />
              </div>
              <Input placeholder="Email (optional)" />
              <Input placeholder="City" />
              <Textarea placeholder="What do you want to achieve with us?" />
              <div className="flex items-center gap-3">
            <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322]" type="button">Request Callback</Button>
                <span className="text-xs text-neutral-500">By submitting, you agree to our terms.</span>
              </div>
            </form>
          </div>
          <div className="rounded-2xl ring-1 ring-black/5 p-6 bg-neutral-50">
            <h3 className="font-semibold">Quick contact</h3>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 85908 66865</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> fashionzoomkerala@gmail.com</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Calicut, Kerala</div>
            </div>
            <Separator className="my-6" />
            <p className="text-sm text-neutral-600">Follow our latest shoots & reels</p>
            <div className="mt-3 flex items-center gap-3">
              <a className="inline-flex items-center gap-2 text-sm font-medium hover:underline" href="#" target="_blank" rel="noreferrer">
                <Instagram size={16} /> @fashionzoom
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoWhite} alt="Fashion Zoom logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="mt-4 text-sm text-neutral-300 max-w-xs">
              Magazine • Academy • Events • Productions. Building careers since 2013.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li><a href="#academy" className="hover:underline">Academy</a></li>
              <li><a href="#courses" className="hover:underline">Courses</a></li>
              <li><a href="#portfolio" className="hover:underline">Portfolio</a></li>
              <li><a href="#events" className="hover:underline">Events</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li className="flex items-center gap-2"><Phone size={14}/> +91 85908 66865</li>
              <li className="flex items-center gap-2"><Mail size={14}/> fashionzoomkerala@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin size={14}/> Calicut, Kerala</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <div className="mt-3 flex gap-2">
              <Input placeholder="Your email" className="bg-white text-black placeholder:text-neutral-500" />
              <Button className="bg-[#F81F2E] text-white hover:bg-[#d11322]">Subscribe</Button>
            </div>
            <p className="mt-2 text-xs text-neutral-400">We respect your privacy.</p>
          </div>
        </div>
        <Separator className="my-8 bg-white/10" />
        <div className="text-xs text-neutral-400 flex flex-wrap gap-4 justify-between">
          <p>© {new Date().getFullYear()} Fashion Zoom Magazine. All rights reserved.</p>
          <p>Made with ♥ in Kerala</p>
        </div>
      </div>
    </footer>
  );
}

export default function AppRedesigned() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Academy />
        <Courses />
        <Portfolio />
        <Events />
        <Admissions />
      </main>
      <Footer />
    </div>
  );
}
