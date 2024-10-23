export const TAGS_COLOR = {
  not_started: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10 capitalize',
    dot: 'bg-[#10b981]',
  },
  resume_submitted: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10 capitalize',
    dot: 'bg-[#0ea5e9]',
  },
  interview_inprogress: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10 capitalize',
    dot: 'bg-[#ec4899]',
  },
  interview_completed: {
    badge:
      'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10 capitalize',
    dot: 'bg-[#f97316]',
  },
} as Record<string, Record<'badge' | 'dot', string>>;
