'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSelectChange('pt')}
        className={`text-xs font-bold transition-colors ${
          locale === 'pt' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
        disabled={isPending}
      >
        PT
      </button>
      <span className="text-muted-foreground/30 text-xs">|</span>
      <button
        onClick={() => onSelectChange('en')}
        className={`text-xs font-bold transition-colors ${
          locale === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
        disabled={isPending}
      >
        EN
      </button>
    </div>
  );
}
