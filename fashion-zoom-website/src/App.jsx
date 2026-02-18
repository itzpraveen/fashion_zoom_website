import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Menu, 
  X, 
  Phone, 
  MessageCircle,
  Mail, 
  MapPin, 
  Calendar, 
  Star, 
  Camera, 
  Users, 
  Award,
  Instagram,
  Facebook,
  Youtube,
  ChevronRight
} from 'lucide-react'
import './App.css'
import { locales } from './i18n.js'
import { useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'

// Import assets
import logoWhite from './assets/logo-white.png'
import logo from './assets/logo.png'
import fashionShow1 from './assets/fashion-show-1.jpg'
import fashionShow2 from './assets/fashion-show-2.jpg'
import fashionShow3 from './assets/fashion-show-3.jpg'
import hero2026 from './assets/hero-2026.webp'
import program2026Poster from './assets/program-2026.webp'
import showSeason5 from './assets/show-season-5.webp'
import showSeason6 from './assets/show-season-6.webp'
import showTraditionalFest from './assets/show-traditional-fest.webp'
import showBeautyPageant from './assets/show-beauty-pageant.webp'

const CANONICAL_BASE_URL = 'https://itzpraveen.github.io/fashion_zoom_website'

const routeMeta = {
  '/': {
    title: 'Fashion Zoom Magazine — Kerala’s Fashion Shows & Modeling Academy',
    description: 'Fashion Zoom runs Kerala’s original Fashion Zoom Magazine, modeling academy and the Fashion Star Awards 2025 runway experience.'
  },
  '/about': {
    title: 'About Fashion Zoom — Kerala Fashion Magazine & Academy',
    description: 'Discover how Fashion Zoom blends a modeling academy, magazine, photoshoots and statewide events since 2013.'
  },
  '/shows': {
    title: 'Fashion Zoom Fashion Shows — Fashion Star Awards 2025',
    description: 'Explore Fashion Zoom’s South India Beauty Icon Season 12 with Kids, Teen, Mr, Miss and Mrs categories plus brand showcases in Thrissur.'
  },
  '/courses': {
    title: 'Modeling Courses in Kerala — Beginner to Advanced by Fashion Zoom',
    description: 'Weekend and express modeling courses covering runway, posing, etiquette, camera presence and portfolio building across Kerala.'
  },
  '/portfolio': {
    title: 'Fashion Zoom Portfolio & Gallery — Editorial Shoots from Kerala',
    description: 'Browse the Fashion Zoom gallery with editorial shoots, backstage content and cover stories captured across Kerala.'
  },
  '/admissions': {
    title: 'Admissions — Book Your Fashion Zoom Modeling Academy Callback',
    description: 'Request an admissions callback to join Kerala’s Fashion Zoom Academy. Get batch dates, fees and onboarding guidance within 24 hours.'
  },
  '/magazine': {
    title: 'Fashion Zoom Magazine Hub — Editorials, Covers & Press',
    description: 'Read Kerala editorial picks, cover launches and press mentions powered by Fashion Zoom Magazine.'
  },
  '/faq': {
    title: 'Fashion Zoom FAQ — Admissions, Shows & Portfolio Queries',
    description: 'Answers about Fashion Zoom admissions, training length, portfolio shoots, Kerala city chapters and seasonal shows.'
  },
  '/contact': {
    title: 'Contact Fashion Zoom — Kerala Modeling Academy & Magazine',
    description: 'Reach Fashion Zoom via phone, email or Instagram for admissions, collaborations and statewide fashion shows.'
  },
  default: {
    title: 'Fashion Zoom Magazine — Kerala’s Fashion Shows & Modeling Academy',
    description: 'Fashion Zoom runs Kerala’s original Fashion Zoom Magazine, modeling academy and runway shows with training for ages 3-60.'
  }
}

const heroStats = [
  { value: '10+', label: 'Years mentoring', description: 'Fashion Zoom has trained Kerala talent since 2013.' },
  { value: '5', label: 'City chapters', description: 'Trivandrum • Kochi • Calicut • Thrissur • Kottayam.' },
  { value: 'Season 8', label: 'Runway shows', description: 'Teen, Miss, Kids & Traditional grand finales.' },
  { value: 'Magazine', label: 'Cover spotlight', description: 'Winners feature in Fashion Zoom Magazine.' }
]

const journeySteps = [
  {
    label: 'Step 1',
    title: 'Book orientation',
    description: 'A 15-minute call to understand your goals, location and preferred batch schedule.',
    icon: Calendar,
    points: ['Goal mapping with faculty mentors', 'Recommendation on weekend vs. express batches']
  },
  {
    label: 'Step 2',
    title: 'Studio training',
    description: 'Hands-on runway, etiquette, fitness and camera presence coaching for every age bracket.',
    icon: Users,
    points: ['Small batches across Kerala city chapters', 'Grooming, styling and stagecraft labs']
  },
  {
    label: 'Step 3',
    title: 'Portfolio build',
    description: 'Editorial photoshoots, reels and social media guidance to pitch confidently to brands.',
    icon: Camera,
    points: ['Professional photographers & videographers', 'Content ready for agencies and collaborations']
  },
  {
    label: 'Step 4',
    title: 'Showtime & cover',
    description: 'Walk Fashion Zoom shows, compete across categories and unlock magazine cover features.',
    icon: Award,
    points: ['Seasonal shows across Kerala venues', 'Cover girl/boy & press spotlight opportunities']
  }
]

const fashionStarHighlights = [
  { value: '300+', label: 'New models', detail: 'Fresh talents debuting on the Season 12 runway.' },
  { value: '100', label: 'Pro models', detail: 'Runway regulars mentoring every category.' },
  { value: '2,000', label: 'Invited guests', detail: 'Entrepreneurs, families and brand owners through the day.' },
  { value: '9 AM – 9 PM', label: 'Show window', detail: 'Lifestyle expo, rehearsals and grand finale across 12 hours.' }
]

const fashionStarFeatures = [
  'Kids, Teen, Mr, Miss and Mrs beauty pageant categories with dedicated crowns.',
  'Brand showcase runway plus lifestyle exhibition managed by KB Group International.',
  'Portfolio and photoshoot bays with personal branding, public speaking and casting support.',
  'One 10×10 partner stall with every sponsorship plus digital and on-ground collateral placements.'
]

const fashionStarContacts = [
  { name: 'K.B. Bineesh', role: 'Chief Editor & Founder', phone: '+91 99614 44539' },
  { name: 'Sajith Vijayan', role: 'Director & Show Manager', phone: '+91 98479 85798' },
  { name: 'Shashi P. Shivaram', role: 'Chief Coordinator', phone: '+91 88488 02525' },
  { name: 'Deepthi Rajesh', role: 'Office Administrator', phone: '+91 70126 19060' },
]

const enrollmentNote = {
  message: 'Summer 2025 admissions close on 25 March.',
  actionLabel: 'Book orientation',
  actionHref: '#/admissions',
  secondaryLabel: 'Call 8590866865',
  secondaryHref: 'tel:+918590866865'
}

const primaryPhoneNumber = '+918590866865'
const primaryPhoneLabel = '+91 85908 66865'
const secondaryPhoneNumber = '+919961444539'
const secondaryPhoneLabel = '+91 99614 44539'
const admissionsWhatsappLink = `https://wa.me/918590866865?text=${encodeURIComponent(
  'Hi Fashion Zoom, I want details about admissions, next batch dates and fees.'
)}`

const audienceTracks = [
  {
    title: 'Aspiring models',
    description: 'Build confidence, portfolio and runway exposure with mentor-led batches.',
    ctaLabel: 'Apply for admissions',
    ctaHref: '#/admissions'
  },
  {
    title: 'Parents of kids & teens',
    description: 'Safe, age-group training with clear schedules and direct counselor support.',
    ctaLabel: 'Talk to a counselor',
    ctaHref: 'tel:+918590866865'
  },
  {
    title: 'Brands & sponsors',
    description: 'Get on-ground visibility through Fashion Star Awards and citywide showcases.',
    ctaLabel: 'Partner with Season 12',
    ctaHref: 'tel:+919961444539'
  }
]

const trustBadges = ['No audition for academy entry', 'Ages 3-60', 'English & Malayalam support', '5 Kerala city chapters']

const legacyShowcase = [
  {
    key: 'season-5',
    title: 'Season 5',
    subtitle: 'Fashion Zoom Fashion Show',
    caption: 'Runway evening at Sree Gokulam Residency, Thrissur',
    image: showSeason5,
    tag: 'Runway legacy',
    className: 'md:col-span-2 xl:col-span-2 xl:row-span-2',
    objectPosition: 'center'
  },
  {
    key: 'season-6',
    title: 'Season 6',
    subtitle: 'Timeless Style',
    caption: 'Editorial concept campaign from our previous show season',
    image: showSeason6,
    tag: 'Season archive',
    className: '',
    objectPosition: 'center'
  },
  {
    key: 'traditional-fest',
    title: 'Kerala Traditional Fest',
    subtitle: 'Cultural spotlight runway',
    caption: 'Celebrating classic styling and regional costume storytelling',
    image: showTraditionalFest,
    tag: 'Traditional edit',
    className: '',
    objectPosition: 'center'
  },
  {
    key: 'beauty-pageant',
    title: 'Beauty Pageant',
    subtitle: 'Kids • Teen • Mr • Miss • Mrs',
    caption: 'Pageant-stage moments from previous Fashion Zoom programs',
    image: showBeautyPageant,
    tag: 'Pageant moments',
    className: '',
    objectPosition: 'center'
  }
]

const primaryNavItems = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'shows', to: '/shows' },
  { key: 'courses', to: '/courses' },
  { key: 'contact', to: '/contact' }
]

const sectionByPath = {
  '/': 'home',
  '/about': 'about',
  '/why': 'why',
  '/shows': 'fashion-shows',
  '/courses': 'academy',
  '/portfolio': 'gallery',
  '/admissions': 'admissions',
  '/magazine': 'magazine',
  '/faq': 'faq',
  '/contact': 'contact'
}

const baseFaqItems = [
  {
    question: 'Who can join the academy?',
    answer: 'We welcome beginners and experienced aspirants across ages 3–60. Batches are tailored by age group and goals.',
    fullWidth: false
  },
  {
    question: 'Do I need prior experience?',
    answer: 'No. Our curriculum starts with foundations—posture, walk, grooming—and progresses to advanced runway and camera work.',
    fullWidth: false
  },
  {
    question: 'Which cities do you operate in?',
    answer: 'Batches run in Trivandrum, Kochi, Calicut, Thrissur and Kottayam with traveling mentors for nearby towns.',
    fullWidth: false
  }
]

const extendedFaqItems = [
  {
    question: 'Will I get a portfolio?',
    answer: 'Yes. Programs include editorial-style photos and reels to start pitching for assignments.',
    fullWidth: false
  },
  {
    question: 'Are there shows or events?',
    answer: 'Yes. We organize seasonal shows across Kerala. Students get opportunities to participate by category.',
    fullWidth: false
  },
  {
    question: 'How do admissions work?',
    answer: 'Submit the callback form and our team will confirm batch dates, fees and onboarding within 24 hours.',
    fullWidth: true
  }
]

const upcomingEvent = {
  name: 'Fashion Star Awards 2025 — South India Beauty Icon Season 12',
  startDate: '2025-11-30T09:00:00+05:30',
  endDate: '2025-11-30T21:00:00+05:30',
  location: 'Parekkatt Convention Centre, Mala, Thrissur',
  image: 'https://itzpraveen.github.io/fashion_zoom_website/og-image.jpg',
  description: 'Kids, Teen, Mr, Miss and Mrs categories with beauty pageant, brand showcases, portfolio labs and casting support.'
}

const StructuredData = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
)

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const L = locales[lang]
  const location = useLocation()
  const path = location?.pathname || '/'
  const canonicalUrl = useMemo(() => (path === '/' ? `${CANONICAL_BASE_URL}/` : `${CANONICAL_BASE_URL}/#${path}`), [path])
  const visibleFaq = useMemo(() => (path === '/faq' ? [...baseFaqItems, ...extendedFaqItems] : baseFaqItems), [path])

  useEffect(() => {
    const metadata = routeMeta[path] || routeMeta.default
    const setMeta = (selector, attribute, value) => {
      const tag = document.querySelector(selector)
      if (tag && value) {
        tag.setAttribute(attribute, value)
      }
    }
    document.title = metadata.title
    setMeta('meta[name="description"]', 'content', metadata.description)
    setMeta('meta[property="og:title"]', 'content', metadata.title)
    setMeta('meta[property="og:description"]', 'content', metadata.description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[name="twitter:title"]', 'content', metadata.title)
    setMeta('meta[name="twitter:description"]', 'content', metadata.description)
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl)
    }
  }, [canonicalUrl, path])

  const scrollToSectionForPath = (targetPath, behavior = 'smooth') => {
    const sectionId = sectionByPath[targetPath]
    if (!sectionId) return
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior, block: 'start' })
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollToSectionForPath(path, path === '/' ? 'auto' : 'smooth')
    }, 0)
    return () => window.clearTimeout(timer)
  }, [path])

  const structuredDataPayloads = useMemo(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: visibleFaq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }

    const eventSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: upcomingEvent.name,
      startDate: upcomingEvent.startDate,
      endDate: upcomingEvent.endDate,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      image: [upcomingEvent.image],
      description: upcomingEvent.description,
      organizer: {
        '@type': 'Organization',
        name: 'Fashion Zoom Magazine & Modeling Academy',
        url: CANONICAL_BASE_URL
      },
      location: {
        '@type': 'Place',
        name: upcomingEvent.location,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Kerala',
          addressCountry: 'IN'
        }
      },
      url: `${CANONICAL_BASE_URL}/#/shows`
    }

    const academySchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Fashion Zoom Modeling Academy',
      url: CANONICAL_BASE_URL,
      description: routeMeta['/courses'].description,
      sameAs: ['https://www.instagram.com/fashion_zoom_magazine/'],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-85908-66865',
          contactType: 'customer service',
          areaServed: 'IN-KL',
          availableLanguage: ['English', 'Malayalam']
        }
      ],
      course: [
        {
          '@type': 'Course',
          name: 'Beginner Modeling Course',
          description: 'Basic runway walking, posing techniques, confidence building and portfolio foundations.',
          provider: { '@type': 'Organization', name: 'Fashion Zoom' }
        },
        {
          '@type': 'Course',
          name: 'Advanced Modeling Course',
          description: 'Professional runway techniques, camera work, industry networking and career guidance.',
          provider: { '@type': 'Organization', name: 'Fashion Zoom' }
        },
        {
          '@type': 'Course',
          name: 'Kids Talent Program',
          description: 'Age-appropriate grooming, confidence development and fun on-stage training for young talents.',
          provider: { '@type': 'Organization', name: 'Fashion Zoom' }
        }
      ]
    }

    return [faqSchema, eventSchema, academySchema]
  }, [visibleFaq])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (targetPath) => {
    setIsMenuOpen(false)
    if (targetPath === path) {
      scrollToSectionForPath(targetPath)
    }
  }

  // Admissions form (classic)
  const schema = z.object({
    fullName: z.string().min(2, 'Name is too short'),
    phone: z.string().min(7, 'Enter a valid phone').max(15, 'Phone too long'),
    email: z.string().email('Enter a valid email').optional().or(z.literal('')),
    city: z.string().min(2, 'City is required'),
    goals: z.string().min(10, 'Please add a short message'),
  })
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { fullName: '', phone: '', email: '', city: '', goals: '' } })
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = async (values) => {
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    setSubmitted(false)
    try {
      if (endpoint) {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source: 'fashion-zoom-site', ...values }) })
        if (!res.ok) throw new Error('Request failed')
      } else {
        console.log('Admission Request (no endpoint configured)', values)
      }
      setSubmitted(true)
      form.reset()
    } catch (e) {
      alert('Could not submit the form right now. Please try again later.')
    }
  }

  return (
    <main id="main" role="main" className="min-h-screen bg-white pb-24 md:pb-0">
      <section aria-label="Admissions update" className="bg-[#F81F2E] text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold tracking-wide">{enrollmentNote.message}</p>
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <a href={enrollmentNote.actionHref} className="inline-flex items-center gap-1 font-semibold underline decoration-white/40 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              {enrollmentNote.actionLabel}
            </a>
            <a href={enrollmentNote.secondaryHref} className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 transition text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80">
              {enrollmentNote.secondaryLabel}
            </a>
          </div>
        </div>
      </section>
      {/* Navigation */}
      <nav role="navigation" aria-label="Primary" className="bg-black text-white sticky top-0 z-50 border-t-2 border-[#F81F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" aria-label="Go to homepage" className="flex items-center">
              <img src={logoWhite} alt="Fashion Zoom logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:block" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {primaryNavItems.map((item) => {
                  const isActive = path === item.to
                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      onClick={() => handleNavClick(item.to)}
                      aria-label={`Go to ${L.nav[item.key]}`}
                      className={`${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
                    >
                      {L.nav[item.key]}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Desktop social icons */}
            <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-gray-800">
              <Button asChild size="sm" className="h-9 bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold">
                <Link to="/admissions" onClick={() => handleNavClick('/admissions')}>Apply now</Link>
              </Button>
              <a
                href="https://www.instagram.com/fashion_zoom_magazine/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Instagram: @fashion_zoom_magazine"
                className="p-2 rounded-md hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                title="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
              {primaryNavItems.map((item) => {
                const isActive = path === item.to
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    aria-label={`Go to ${L.nav[item.key]}`}
                    className={`${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'} block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]`}
                  >
                    {L.nav[item.key]}
                  </Link>
                )
              })}
              <div className="pt-2 px-3">
                <div className="flex items-center gap-3">
                  <Button asChild size="sm" className="h-9 bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold">
                    <Link to="/admissions" onClick={() => handleNavClick('/admissions')}>Apply now</Link>
                  </Button>
                  <a
                    href="https://www.instagram.com/fashion_zoom_magazine/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open Instagram: @fashion_zoom_magazine"
                    className="p-2 rounded-md hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]"
                    title="Instagram"
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[78vh] overflow-hidden text-white flex items-center">
        <img
          src={hero2026}
          alt="Fashion model in red styling hat"
          className="absolute inset-0 h-full w-full object-cover object-[74%_center] md:object-right"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F81F2E]/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" dangerouslySetInnerHTML={{__html: L.hero.title}} />
            <p className="text-xl md:text-2xl mb-8 text-gray-200" dangerouslySetInnerHTML={{__html: L.hero.subtitle}} />
            <p className="text-lg mb-8">
              Discover your fashion potential with professional modeling training, 
              seasonal fashion shows, and magazine features across Kerala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" aria-label="Join the Fashion Zoom Academy" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                <a href="#/admissions">{L.hero.ctaPrimary}</a>
              </Button>
              <Button asChild size="lg" aria-label="View Fashion Shows" variant="outline" className="h-12 px-8 text-base border-white text-white hover:bg-white hover:text-black transition-colors transition-transform duration-200 hover:scale-[1.02]">
                <a href="#/shows">{L.hero.ctaSecondary}</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
              {trustBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/90">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 text-left">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <dt className="text-[11px] uppercase tracking-widest text-white/70">{stat.label}</dt>
                <dd className="mt-2">
                  <span className="block text-2xl font-semibold text-white">{stat.value}</span>
                  <span className="mt-1 block text-sm text-white/85">{stat.description}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="audience" className="py-12 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F81F2E]">Built for your goal</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Choose your track and take the next step</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {audienceTracks.map((track) => (
              <Card key={track.title} className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>{track.title}</CardTitle>
                  <CardDescription className="text-gray-300">{track.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={track.ctaHref} className="inline-flex items-center gap-2 text-[#F81F2E] font-semibold underline underline-offset-4">
                    {track.ctaLabel}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <section id="journey" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F81F2E]">Path to the runway</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">How we take you from inquiry to cover story</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Every cohort follows a transparent journey—book an orientation, attend immersive training, build your portfolio and walk real Fashion Zoom shows.</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journeySteps.map((step) => {
              const Icon = step.icon
              return (
                <li key={step.label} className="rounded-3xl border border-gray-100 bg-white shadow-[0_25px_70px_rgba(0,0,0,0.04)] p-6">
                  <div className="flex items-center gap-3 text-[#F81F2E] text-sm font-semibold uppercase tracking-widest">
                    <span className="inline-flex items-center justify-center rounded-full border border-[#F81F2E]/40 px-3 py-1 text-[10px]">{step.label}</span>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                  <ul className="mt-4 list-disc pl-5 text-sm text-gray-500 space-y-1">
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section id="fashion-star" className="py-16 bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F81F2E]">Season announcements</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Fashion Star Awards — South India Beauty Icon</h2>
            <p className="mt-4 text-gray-200 max-w-3xl mx-auto">
              Our 2025 flagship at Parekkatt Convention Centre, Mala (Thrissur), featured Kids, Teen, Mr, Miss and Mrs crowns with brand showcases and portfolio labs.
              The <strong className="font-semibold">latest 2026 program registration</strong> is now open in the poster announcement below.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[300px,1fr] items-stretch">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <img
                src={program2026Poster}
                alt="Fashion Star Awards 2026 beauty pageant registration poster"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Latest Program Announced: Fashion Star Awards 2026</CardTitle>
                <CardDescription className="text-gray-300">
                  Registration has started for Kids, Teen, Mr, Miss and Mrs categories.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-200">
                <p>
                  The 2026 campaign creative is now live. Aspirants can register early to secure category slots, orientation support and audition details.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-[#F81F2E] hover:bg-[#d11322] text-white">
                    <a href="#/admissions">Start registration</a>
                  </Button>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                    <a href={admissionsWhatsappLink} target="_blank" rel="noreferrer noopener">Ask on WhatsApp</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fashionStarHighlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="text-[11px] uppercase tracking-[0.35em] text-white/70">{item.label}</dt>
                <dd className="mt-2">
                  <span className="block text-3xl font-semibold">{item.value}</span>
                  <span className="mt-1 block text-sm text-white/80">{item.detail}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>30 November 2025 · Parekkatt Convention Centre</CardTitle>
                <CardDescription className="text-gray-300">
                  Mala, Thrissur · 9:00 AM – 9:00 PM IST · Managed by KB Group International
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 text-sm text-gray-200">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">Categories</p>
                    <p className="mt-2 font-medium">Kids • Teen • Mr • Miss • Mrs</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">Audience</p>
                    <p className="mt-2 font-medium">2,000+ invited guests, Thrissur entrepreneurs & brand partners</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">Participants</p>
                    <p className="mt-2 font-medium">300 emerging models + 100 professional mentors</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-gray-400">Opportunities</p>
                    <p className="mt-2 font-medium">Beauty pageant titles, brand show slots, magazine & cover shoots</p>
                  </div>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Full-day lifestyle exhibition with partner stalls inside the convention centre.</li>
                  <li>Portfolio, public speaking and personal branding labs embedded in the schedule.</li>
                  <li>Dedicated casting support for agency tie-ups and upcoming Fashion Zoom seasons.</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="h-11 px-6 bg-white text-black hover:bg-gray-100" aria-label="See Fashion Star schedule">
                    <a href="#/shows">Explore run of show</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-11 px-6 border-white text-white hover:bg-white/10" aria-label="Call Fashion Star show desk">
                    <a href="tel:+919961444539">Talk to the show desk</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Partner deliverables</CardTitle>
                <CardDescription className="text-gray-300">Inclusions across Title, Presented, Powered and Associate tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-gray-200">
                  {fashionStarFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#F81F2E]" aria-hidden="true"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Season 12 contacts</CardTitle>
                <CardDescription className="text-gray-300">Reach the core team for sponsorship, participation or media</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-200">
                {fashionStarContacts.map((person) => (
                  <div key={person.name} className="border-b border-white/10 pb-3 last:border-none last:pb-0">
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">{person.role}</p>
                    <a href={`tel:${person.phone.replace(/\s+/g, '')}`} className="mt-1 inline-flex items-center gap-2 text-[#F81F2E] underline underline-offset-4">
                      <Phone className="h-3.5 w-3.5" />
                      {person.phone}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admissions (only on route) */}
      {path === '/admissions' && (
      <section id="admissions" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admissions</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Request a callback. Our team will contact you with batch dates, fees and a short orientation call.</p>
          </div>
          <Form {...form}>
            <form className="grid gap-4 max-w-3xl mx-auto" onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="+91 85908 66865" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="city" render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl><Input placeholder="Calicut" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="goals" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your goals</FormLabel>
                  <FormControl><Textarea placeholder="What do you want to achieve with us?" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {submitted && (<div className="text-sm text-emerald-600 text-center">Thanks! We’ll contact you within 24 hours.</div>)}
              <div className="flex items-center gap-3 justify-center">
                <Button className="h-12 px-8 text-base bg-[#F81F2E] text-white hover:bg-[#d11322]" type="submit">Request Callback</Button>
                <span className="text-xs text-neutral-500">By submitting, you agree to our terms.</span>
              </div>
            </form>
          </Form>
        </div>
      </section>
      )}
      {/* Magazine Hub (only on route) */}
      {path === '/magazine' && (
      <section id="magazine" className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{L.sections.magazine}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardHeader><CardTitle>Editorials</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <a className="block underline underline-offset-4" href="#">Kerala Couture — Monsoon Edit</a>
                <a className="block underline underline-offset-4" href="#">Traditional Elegance — Onam Special</a>
                <a className="block underline underline-offset-4" href="#">Street to Studio — Calicut</a>
              </CardContent>
            </Card>
            <Card className="transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardHeader><CardTitle>Covers</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <a className="block underline underline-offset-4" href="#">Season 8 — Cover Girl Aditri</a>
                <a className="block underline underline-offset-4" href="#">Teens Edition — Kochi</a>
                <a className="block underline underline-offset-4" href="#">Festival Issue — Thrissur</a>
              </CardContent>
            </Card>
            <Card className="transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardHeader><CardTitle>Press</CardTitle></CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-2">
                <a className="block underline underline-offset-4" href="#">Local Daily: Fashion Zoom Season 8</a>
                <a className="block underline underline-offset-4" href="#">Channel Feature: Modeling Careers</a>
                <a className="block underline underline-offset-4" href="#">Photo Expo: Alumni Showcase</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}
      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{L.sections.about}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Since 2013, Fashion Zoom has been Kerala's leading fashion magazine and modeling academy,
              nurturing talent and celebrating fashion across multiple cities.
            </p>
            {path !== '/about' && (
              <div className="mt-6">
                <a href="#/about" className="inline-flex items-center underline underline-offset-4 text-[#F81F2E]">Learn more about us →</a>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-[#F81F2E] mb-4" />
                <CardTitle>Professional Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive modeling courses for ages 3-60 with expert instructors and industry professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Camera className="h-12 w-12 mx-auto text-[#F81F2E] mb-4" />
                <CardTitle>Fashion Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Regular seasonal fashion shows featuring traditional and contemporary fashion across Kerala.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 mx-auto text-[#F81F2E] mb-4" />
                <CardTitle>Magazine Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Winners become cover models in our professional fashion magazine with high-quality photoshoots.
                </p>
              </CardContent>
            </Card>
          </div>
          {path === '/about' && (
            <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2 text-gray-700">
                <h3 className="font-semibold">Fast facts</h3>
                <ul className="list-disc pl-5 text-sm">
                  <li>Founded: 2013</li>
                  <li>Magazine • Academy • Events • Productions</li>
                  <li>Cover model program for show winners</li>
                </ul>
              </div>
              <div className="space-y-2 text-gray-700">
                <h3 className="font-semibold">Cities in Kerala</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {['Trivandrum','Kochi','Calicut','Thrissur','Kottayam'].map(c => (
                    <span key={c} className="px-2 py-1 rounded-full bg-neutral-100">{c}</span>
                  ))}
                </div>
                <div className="mt-4 text-sm">
                  <div>Phone: <a className="underline" href="tel:+918590866865">8590866865</a>, <a className="underline" href="tel:+919961444539">9961444539</a></div>
                  <div>Instagram: <a className="underline" href="https://instagram.com/fashion_zoom_magazine" target="_blank" rel="noreferrer">@fashion_zoom_magazine</a></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Fashion Zoom */}
      <section id="why" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Why Fashion Zoom</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">A complete ecosystem to get show‑ready — guided by mentors, supported by state‑wide events, and backed by a strong alumni network.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Users className="h-10 w-10 mx-auto text-[#F81F2E] mb-3" />
                <CardTitle>Industry Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Hands‑on runway, posing, grooming and camera presence with experienced coaches.</p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Camera className="h-10 w-10 mx-auto text-[#F81F2E] mb-3" />
                <CardTitle>Portfolio Shoots</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Editorial‑style photos and reels to start pitching to brands and agencies.</p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <Award className="h-10 w-10 mx-auto text-[#F81F2E] mb-3" />
                <CardTitle>Real Shows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Walk seasonal fashion shows across Kerala with categories for every age.</p>
              </CardContent>
            </Card>
            <Card className="text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <MapPin className="h-10 w-10 mx-auto text-[#F81F2E] mb-3" />
                <CardTitle>State‑wide Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Multiple city chapters, alumni network, and brand partners to open doors.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fashion Shows Section */}
      <section id="fashion-shows" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{L.sections.shows}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Experience the glamour of our seasonal fashion shows featuring talented models and stunning designs.
            </p>
          </div>

          {path === '/shows' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Season 8 - Current</h3>
              <p className="text-gray-600 mb-6">
                Our latest fashion show season featuring traditional and contemporary fashion, 
                with categories for all ages including Teen, Miss, and Traditional Fashion Fest.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-3 bg-[#F81F2E] text-white">Winner</Badge>
                  <span>Cover Girl: Aditri Gouri</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-3 bg-[#F81F2E] text-white">Location</Badge>
                  <span>Thrissur, Kerala</span>
                </div>
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-3 bg-[#F81F2E] text-white">Categories</Badge>
                  <span>Teen, Miss, Traditional, Kids</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={fashionShow1} alt="Fashion Show 1" className="rounded-lg shadow-lg" loading="lazy" />
              <img src={fashionShow2} alt="Fashion Show 2" className="rounded-lg shadow-lg" loading="lazy" />
            </div>
          </div>
          ) : (
            <div className="text-center">
              <a href="#/shows" className="inline-flex items-center underline underline-offset-4 text-[#F81F2E]">Explore shows →</a>
            </div>
          )}

          {path === '/shows' && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Season history</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="rounded-lg border p-4">
                  <div className="font-medium">Season 8 (2024–2025)</div>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Winner: Cover Girl — Aditri Gouri</li>
                    <li>Categories: Teen • Miss • Traditional • Kids</li>
                    <li>Locations: Thrissur and across Kerala</li>
                  </ul>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="font-medium">Season 7 (2023–2024)</div>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Multiple category winners</li>
                    <li>Traditional Fashion Fest highlights</li>
                    <li>State‑wide participation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            {visibleFaq.map((item) => (
              <details key={item.question} className={`rounded-lg border p-4 ${item.fullWidth ? 'md:col-span-2' : ''}`}>
                <summary className="font-semibold cursor-pointer">{item.question}</summary>
                <p className="mt-2 text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
          {path !== '/faq' && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <a href="#/faq" className="inline-flex items-center gap-2 font-semibold text-[#F81F2E] underline underline-offset-4">
                View the full FAQ library
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Academy Section */}
      <section id="academy" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{L.sections.academy}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Professional modeling training with direct entry - no auditions required!
            </p>
          </div>

          {path === '/courses' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Beginner Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Basic runway walking</li>
                  <li>• Posing techniques</li>
                  <li>• Confidence building</li>
                  <li>• Portfolio development</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Advanced Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional runway techniques</li>
                  <li>• Fashion photography</li>
                  <li>• Industry networking</li>
                  <li>• Career guidance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Kids Program
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Age-appropriate training</li>
                  <li>• Fun learning environment</li>
                  <li>• Confidence development</li>
                  <li>• Performance opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          ) : (
            <div className="mt-6 text-gray-600">
              <ul className="space-y-1">
                <li>• Runway, camera presence, grooming</li>
                <li>• Portfolio shoots and reels</li>
                <li>• Batches for kids, teens and adults</li>
              </ul>
              <div className="mt-6">
                <a href="#/courses" className="underline underline-offset-4 text-[#F81F2E]">Explore courses →</a>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-lg mb-6">
              <strong>Age Range:</strong> 3-60 years | <strong>Direct Entry:</strong> No auditions required
            </p>
            <Button asChild size="lg" aria-label="Register for the Modeling Academy" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              <a href="#/admissions">Register Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="scroll-mt-28 md:scroll-mt-32 py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#0F172A] mb-2">{L.sections.gallery}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Legacy visuals from previous Fashion Zoom show seasons, pageants and signature stage campaigns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 auto-rows-[230px] md:auto-rows-[250px] gap-4">
            {legacyShowcase.map((item) => (
              <article
                key={item.key}
                className={`group relative overflow-hidden rounded-3xl border border-neutral-200 shadow-[0_18px_45px_rgba(0,0,0,0.14)] ${item.className}`}
              >
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.subtitle}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: item.objectPosition }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <div className="relative h-full flex flex-col justify-end p-5 text-white">
                  <span className="inline-flex w-fit items-center rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-[11px] uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className="text-base font-semibold text-white/90">{item.subtitle}</p>
                  <p className="mt-2 text-xs text-white/80">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" aria-label="View full gallery" className="h-12 px-8 text-base border-[#F81F2E] text-[#F81F2E] hover:bg-[#F81F2E] hover:text-white transition-colors transition-transform duration-200 hover:scale-[1.02]">
              <a href="#/portfolio">View Full Gallery</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials & Partners */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">What Our Talents Say</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">“The runway coaching and portfolio shoots helped me land my first brand job within weeks. The mentors are world‑class.”</p>
                <div className="mt-4 text-sm text-gray-500">— Aditri Gouri, Cover Girl</div>
              </CardContent>
            </Card>
            <Card className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700">“From confidence to camera presence, I grew across the board. The exposure at shows changed my trajectory.”</p>
                <div className="mt-4 text-sm text-gray-500">— Aarav Menon, Runway Winner</div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{L.sections.contact}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-300">
              Get in touch with us across Kerala for modeling academy enrollment and fashion show participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>
                  Primary:{' '}
                  <a href={`tel:${primaryPhoneNumber}`} className="underline underline-offset-4 hover:text-white">
                    {primaryPhoneLabel}
                  </a>
                </p>
                <p>
                  Secondary:{' '}
                  <a href={`tel:${secondaryPhoneNumber}`} className="underline underline-offset-4 hover:text-white">
                    {secondaryPhoneLabel}
                  </a>
                </p>
                <a
                  href={admissionsWhatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm font-semibold text-black hover:bg-[#1fbe59]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp admissions
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Email desk
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <a href="mailto:fashionzoomkerala@gmail.com" className="underline underline-offset-4">fashionzoomkerala@gmail.com</a>
                <p className="text-sm text-gray-400 mt-2">We reply within 24 hours in English or Malayalam.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>• Trivandrum</p>
                <p>• Kochi</p>
                <p>• Calicut</p>
                <p>• Thrissur</p>
                <p>• Kottayam</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="space-y-1">
                  <a
                    href="https://www.instagram.com/fashion_zoom_magazine/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline underline-offset-4 hover:text-white"
                  >
                    @fashion_zoom_magazine
                  </a>
                  <div>@fashionzoom_modeling_academy</div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://www.instagram.com/fashion_zoom_magazine/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open Instagram"
                    className="p-2 rounded-md hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]"
                    title="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook (coming soon)"
                    className="p-2 rounded-md hover:bg-gray-800"
                    title="Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube (coming soon)"
                    className="p-2 rounded-md hover:bg-gray-800"
                    title="YouTube"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" aria-label="Get started and contact Fashion Zoom" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              <a href="#/admissions">Get Started Today</a>
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/20 bg-white/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-3">
          <a
            href={`tel:${primaryPhoneNumber}`}
            className="flex items-center justify-center gap-1 py-3 text-xs font-semibold text-neutral-900"
            aria-label="Call Fashion Zoom admissions desk"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <a
            href={admissionsWhatsappLink}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-1 py-3 text-xs font-semibold text-green-700 border-x border-black/10"
            aria-label="Chat on WhatsApp for admissions"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="#/admissions"
            className="flex items-center justify-center gap-1 py-3 text-xs font-semibold text-[#F81F2E]"
            aria-label="Open admissions form"
          >
            <ChevronRight className="h-4 w-4" />
            Apply
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Link to="/" aria-label="Go to homepage">
                <img src={logoWhite} alt="Fashion Zoom logo" className="h-12 w-auto" />
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              Kerala's Premier Fashion Magazine & Modeling Academy Since 2013
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <a
                href="https://www.instagram.com/fashion_zoom_magazine/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open Instagram"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Fashion Zoom Magazine. All rights reserved.</p>
            <div className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-4">
              <a href="./privacy.html" className="underline underline-offset-4">Privacy Policy</a>
              <button onClick={() => setLang(lang === 'en' ? 'ml' : 'en')} className="px-2 py-1 rounded-md bg-white text-black hover:bg-gray-100 border" aria-label="Toggle language">
                {lang === 'en' ? 'മലയാളം' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </footer>
      {structuredDataPayloads.map((schema, index) => (
        <StructuredData key={`${schema['@type']}-${index}`} data={schema} />
      ))}
    </main>
  )
}

export default App
