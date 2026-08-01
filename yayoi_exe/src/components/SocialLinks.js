import React, { useEffect, useRef, useState } from 'react';
import { EmailIcon, GithubIcon, LinkedinIcon } from './icons';

// TODO: replace with the real address later
const EMAIL = 'taichi.shir4kawa@gmail.com';

const SOCIAL_LINKS = [
    {
        href: 'https://github.com/yayoi-exe',
        label: 'GitHub',
        Icon: GithubIcon,
        external: true,
    },
    {
        href: '#',
        label: 'LinkedIn',
        Icon: LinkedinIcon,
    },
];

const linkClassName =
    'inline-flex text-sub1 transition-transform duration-200 hover:-translate-y-1';

const SocialLinks = () => {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard may be unavailable (permissions / insecure context).
        }
    };

    return (
        <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon, external }) => (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={linkClassName}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    <Icon />
                </a>
            ))}
            <div className="relative inline-flex">
                <button
                    type="button"
                    aria-label="Copy email"
                    className={`${linkClassName} cursor-pointer border-0 bg-transparent p-0`}
                    onClick={handleCopyEmail}
                >
                    <EmailIcon />
                </button>
                {copied && (
                    <span
                        role="status"
                        className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-sub1 px-2 py-1 font-sans text-xs font-bold text-main"
                    >
                        Copied!
                    </span>
                )}
            </div>
        </div>
    );
};

export default SocialLinks;
