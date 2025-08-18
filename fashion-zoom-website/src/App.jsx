import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Menu, 
  X, 
  Phone, 
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
  ChevronRight,
  Play
} from 'lucide-react'
import './App.css'
import { locales } from './i18n.js'
import { useLocation } from 'react-router-dom'
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const L = locales[lang]
  const location = useLocation()
  const path = location?.pathname || '/'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
    <main id="main" role="main" className="min-h-screen bg-white">
      {/* Navigation */}
      <nav role="navigation" aria-label="Primary" className="bg-black text-white sticky top-0 z-50 border-t-2 border-[#F81F2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={logoWhite} alt="Fashion Zoom logo" className="h-12 w-auto" />
            </div>
            <div className="hidden md:block" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" aria-label="Go to Home section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.home}</a>
              <a href="#about" aria-label="Go to About section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.about}</a>
              <a href="#fashion-shows" aria-label="Go to Fashion Shows section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.shows}</a>
              <a href="#academy" aria-label="Go to Academy section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.courses}</a>
              <a href="#gallery" aria-label="Go to Gallery section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.portfolio}</a>
              <a href="#faq" aria-label="Go to FAQs" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.faq}</a>
              <a href="#/admissions" aria-label="Go to Admissions" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.admissions}</a>
              <a href="#/magazine" aria-label="Go to Magazine hub" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.magazine}</a>
              <a href="#contact" aria-label="Go to Contact section" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E] focus-visible:ring-offset-2 focus-visible:ring-offset-black">{L.nav.contact}</a>
            </div>
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
              <a href="#home" aria-label="Go to Home section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.home}</a>
              <a href="#about" aria-label="Go to About section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.about}</a>
              <a href="#fashion-shows" aria-label="Go to Fashion Shows section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.shows}</a>
              <a href="#academy" aria-label="Go to Academy section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.courses}</a>
              <a href="#gallery" aria-label="Go to Gallery section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.portfolio}</a>
              <a href="#faq" aria-label="Go to FAQs" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.faq}</a>
              <a href="#/admissions" aria-label="Go to Admissions" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.admissions}</a>
              <a href="#/magazine" aria-label="Go to Magazine hub" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.magazine}</a>
              <a href="#contact" aria-label="Go to Contact section" className="block hover:bg-gray-700 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F81F2E]">{L.nav.contact}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-black to-gray-800 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F81F2E]/25 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" dangerouslySetInnerHTML={{__html: L.hero.title}} />
            <p className="text-xl md:text-2xl mb-8 text-gray-300" dangerouslySetInnerHTML={{__html: L.hero.subtitle}} />
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Discover your fashion potential with professional modeling training, 
              seasonal fashion shows, and magazine features across Kerala.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" aria-label="Join the Fashion Zoom Academy" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
                {L.hero.ctaPrimary}
              </Button>
              <Button size="lg" aria-label="View Fashion Shows" variant="outline" className="h-12 px-8 text-base border-[#F81F2E] text-[#F81F2E] hover:bg-[#F81F2E] hover:text-white transition-colors transition-transform duration-200 hover:scale-[1.02]">
                {L.hero.ctaSecondary}
              </Button>
            </div>
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

          <div className="text-center">
            <Button size="lg" aria-label="View all fashion shows" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              View All Fashion Shows
            </Button>
          </div>
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
            <details className="rounded-lg border p-4"><summary className="font-semibold cursor-pointer">Who can join the academy?</summary><p className="mt-2 text-sm">We welcome beginners and experienced aspirants across ages 3–60. Batches are tailored by age group and goals.</p></details>
            <details className="rounded-lg border p-4"><summary className="font-semibold cursor-pointer">Do I need prior experience?</summary><p className="mt-2 text-sm">No. Our curriculum starts with fundamentals — posture, walk, grooming — and progresses to advanced runway and camera work.</p></details>
            <details className="rounded-lg border p-4"><summary className="font-semibold cursor-pointer">Will I get a portfolio?</summary><p className="mt-2 text-sm">Yes. Programs include editorial‑style photos and short reels to start pitching for assignments.</p></details>
            <details className="rounded-lg border p-4"><summary className="font-semibold cursor-pointer">Are there shows or events?</summary><p className="mt-2 text-sm">Yes. We organize seasonal shows across Kerala. Students get opportunities to participate by category.</p></details>
            <details className="rounded-lg border p-4 md:col-span-2"><summary className="font-semibold cursor-pointer">How do admissions work?</summary><p className="mt-2 text-sm">Submit the callback form, and our team will contact you with batch dates, fees, and a short orientation call.</p></details>
          </div>
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

          <div className="text-center mt-12">
            <p className="text-lg mb-6">
              <strong>Age Range:</strong> 3-60 years | <strong>Direct Entry:</strong> No auditions required
            </p>
            <Button size="lg" aria-label="Register for the Modeling Academy" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              Register Now
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{L.sections.gallery}</h2>
            <div className="h-1 w-16 sm:w-20 md:w-24 bg-[#F81F2E] rounded mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">
              Highlights from our fashion shows, photoshoots, and academy events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src={fashionShow1} alt="Traditional Fashion" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src={fashionShow2} alt="Contemporary Fashion" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img src={fashionShow3} alt="Fashion Show" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" aria-label="View full gallery" className="h-12 px-8 text-base border-[#F81F2E] text-[#F81F2E] hover:bg-[#F81F2E] hover:text-white transition-colors transition-transform duration-200 hover:scale-[1.02]">
              View Full Gallery
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Phone Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>Primary: 8590866865</p>
                <p>Secondary: 9961444539</p>
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

            <Card className="bg-gray-900 border-gray-700 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Instagram className="h-5 w-5 mr-2 text-[#F81F2E]" />
                  Social Media
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>@fashion_zoom_magazine</p>
                <p>@fashionzoom_modeling_academy</p>
                <div className="flex space-x-4 mt-4">
                  <Instagram className="h-6 w-6 hover:text-[#F81F2E] cursor-pointer" />
                  <Facebook className="h-6 w-6 hover:text-[#F81F2E] cursor-pointer" />
                  <Youtube className="h-6 w-6 hover:text-[#F81F2E] cursor-pointer" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" aria-label="Get started and contact Fashion Zoom" className="h-12 px-8 text-base bg-[#F81F2E] hover:bg-[#d11322] text-white font-semibold shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img src={logoWhite} alt="Fashion Zoom logo" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 mb-4">
              Kerala's Premier Fashion Magazine & Modeling Academy Since 2013
            </p>
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
    </main>
  )
}

export default App
