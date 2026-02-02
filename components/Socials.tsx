import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

const socials = [
    { icon: <FaGithub />, href: 'https://github.com/Blissmal' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/bethuel-maluti-2b227b3aa/' },
    { icon: <FaInstagram />, href: 'https://instagram.com/_de_bliss_' },
    { icon: <FaFacebook />, href: 'https://facebook.com/bethuel.maluti.39' },
];

const Socials = ({containerStyles, iconStyles}: {containerStyles?: string, iconStyles?: string}) => {
    return (
        <div className={containerStyles}>
            {socials.map((social, index) => (
                <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconStyles}
                >
                    {social.icon}
                </Link>
            ))}
        </div>
    )
}

export default Socials