'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// 네비게이션 아이템 타입 정의
type NavItem = {
  title: string
  items: {
    label: string
    href: string
  }[]
}

// 네비게이션 데이터
const navigationItems: NavItem[] = [
  {
    title: 'Tanstack Query',
    items: [
      { label: 'UseQuery', href: '/usage/useQueryExample' },
      { label: 'UseMutation', href: '/usage/useMutationExample' },
      { label: 'Polling', href: '/usage/tanstackQueryPolling' },
      { label: 'Pagination', href: '/usage/tanstackQueryPagination' },
      {
        label: 'Optimistic Update',
        href: '/usage/tanstackQueryOptimisticUpdate',
      },
    ],
  },
  {
    title: 'React Hook Form',
    items: [
      { label: 'Basic', href: '/usage/reactHookFormBasicExample' },
      {
        label: 'Schema Validation',
        href: '/usage/schemaValidationWithZodExample',
      },
      {
        label: 'With Tanstack Query',
        href: '/usage/reactHookFormWithUseMutation',
      },
    ],
  },
  {
    title: 'Zustand',
    items: [{ label: 'Basic', href: '/usage/zustandBasicExample' }],
  },
  {
    title: 'CRUD',
    items: [
      { label: 'Create', href: '/usage/createExample' },
      { label: 'Read', href: '/usage/readExample' },
      { label: 'Update', href: '/usage/updateExample' },
      { label: 'Delete', href: '/usage/deleteExample' },
    ],
  },
  {
    title: 'Auth',
    items: [{ label: 'Login', href: '/usage/loginAndLogout' }],
  },
  {
    title: 'ZX',
    items: [{ label: 'ZX', href: '/usage/zxExample' }],
  },
  {
    title: 'AWS',
    items: [{ label: 'Presigned URL', href: '/usage/presignedUrl' }],
  },
  {
    title: 'Redis',
    items: [{ label: 'Redis', href: '/usage/redisBasic' }],
  },
  {
    title: 'RabbitMQ',
    items: [{ label: 'RabbitMQ', href: '/usage/RabbitMqBasic' }],
  },
  {
    title: 'GraphQL',
    items: [{ label: 'GraphQL', href: '/usage/graphqlSubscribeExample' }],
  },
]

export function UsageNavigation() {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-[284px] pl-2">
      {navigationItems.map(section => (
        <Accordion
          key={section.title}
          type="single"
          collapsible
          defaultValue={section.title}
        >
          <AccordionItem value={section.title}>
            <AccordionTrigger className="text-gray-500 font-medium">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="border-none">
              <ul className="space-y-1 border-l border-gray-200 pl-4 flex flex-col gap-1">
                {section.items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-gray-500 font-medium hover:text-gray-900 transition-colors',
                        pathname === item.href && 'text-blue-500 font-semibold',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
