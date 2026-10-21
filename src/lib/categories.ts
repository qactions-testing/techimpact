import type { ComponentType } from 'react';
import { Bot, Bug, Database, ShieldCheck } from 'lucide-react';
import { Category } from '@/types';

// Plain module (not 'use client') so server and client components get real values.
export const CATEGORY_ICON: Record<Category, ComponentType<{ className?: string }>> = {
  'Software Testing': Bug,
  Ciberseguridad: ShieldCheck,
  'RPA + IA': Bot,
  'Data Management': Database,
};

export const CATEGORY_ACCENT: Record<Category, string> = {
  'Software Testing': 'text-sky',
  Ciberseguridad: 'text-violet',
  'RPA + IA': 'text-aqua',
  'Data Management': 'text-beige',
};
