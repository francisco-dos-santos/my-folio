import { z } from "zod";

const REQUIRED_= "Campo obrigatório"

const PersonalInfoSchema = z.object({
    name: z.string().nonempty(REQUIRED_),
    title: z.string().nonempty(REQUIRED_),
    about: z.string().optional(),
    address: z.string().optional(),
})

const ContactSchema = z.object({
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    email: z.string().url().optional()
})

const ProjectSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    description: z.string().nonempty(REQUIRED_),
    techs: z.array(z.string()),
    link: z.string().url().nonempty(REQUIRED_),
})

const ExperienceSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    company: z.string().nonempty(REQUIRED_),
    location: z.string().nonempty(REQUIRED_),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    responsibilities: z.array(z.string())
})

const CertificationSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    provider: z.string().nonempty(REQUIRED_),
    date: z.coerce.date(),
})

export const PortfolioSchema = z.object({
    personal: PersonalInfoSchema,
    contact: ContactSchema,
    skills: z.array(z.string()),
    projects: z.array(ProjectSchema),
    experiences: z.array(ExperienceSchema),
    certifications: z.array(CertificationSchema),
    languages: z.array(z.string())
})
