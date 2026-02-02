import { LucideIcon, Sun, Moon, Shield, Calendar, Palette, Sparkles } from "lucide-react";

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
}

export const GALLERY_ITEMS = [
  { id: 1, title: "Warm White (Everyday)", image: "/images/gallery/White.jpg" },
  { id: 2, title: "Holidays", image: "/images/gallery/Holidays.jpeg" },
  { id: 3, title: "Security / Perimeter", image: "/images/gallery/Security.jpg" },
  { id: 4, title: "Game Day", image: "/images/gallery/Game.jpeg" },
  { id: 5, title: "Subtle Accent", image: "/images/gallery/Subtle.jpeg" },
  { id: 6, title: "Full Color Scenes", image: "/images/gallery/Full.jpeg" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Why do you need my address?",
    answer: "We use Google Earth and Maps 3D to view your roofline structure. This allows us to prepare an accurate preliminary design and estimate without needing to disturb you with an on-site visit immediately."
  },
  {
    question: "Will you come to my house right away?",
    answer: "No. We respect your time. First, we provide a digital estimate based on map data. We only schedule an on-site visit for final measurements once you're happy with the proposal."
  },
  {
    question: "What happens after I submit the form?",
    answer: "Our team reviews your property online. Then, we reach out via your preferred method (Call or WhatsApp) for a brief 10-15 minute chat to confirm details before sending the full estimate to your email."
  },
  {
    question: "Front only vs full perimeter — what should I pick?",
    answer: "Most clients start with the front for curb appeal. However, full perimeter is popular for security lighting and backyard entertaining. We can itemize both options for you."
  },
  {
    question: "Will it look obvious during the day?",
    answer: "Not at all. We use color-matched tracks that tuck neatly under your eaves or fascia. From the street, the system is virtually invisible during the day."
  },
  {
    question: "Can I use warm white daily and colors only on holidays?",
    answer: "Yes! That is the most common use case. You have full control in the app to schedule warm architectural lighting year-round and switch to festive themes with one tap."
  },
  {
    question: "Do you work outside Los Angeles?",
    answer: "Currently, we are strictly focused on Los Angeles County to ensure the highest quality of service and support for our local clients."
  },
  {
    question: "How do you contact me (call or WhatsApp)?",
    answer: "In the form below, you can select your preference. We prioritize WhatsApp for quick questions and photo sharing, or a phone call if you prefer a direct conversation."
  }
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Sun,
    title: "Discreet by day",
    description: "Designed to blend into the roofline. Invisible tracks match your home's trim."
  },
  {
    icon: Palette,
    title: "Scenes on demand",
    description: "Warm white architectural glow daily, full vibrant color when you want it."
  },
  {
    icon: Shield,
    title: "Zoned control",
    description: "Control the front, back, and sides independently via the smartphone app."
  },
  {
    icon: Sparkles,
    title: "Clean install",
    description: "Neat wire routing, hidden controllers, and a professional finish every time."
  }
];