import { z } from "zod";
import { Social } from "./types";

const REQUIRED_= "Campo obrigatório"

const SkillSchema = z.object({
    name: z.string().nonempty(REQUIRED_),
})

const LanguageSchema = z.object({
    name: z.string().nonempty(REQUIRED_),
})
const PersonalInfoSchema = z.object({
    name: z.string().nonempty(REQUIRED_),
    title: z.string().nonempty(REQUIRED_),
    about: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email().optional()
})

const ProjectSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    description: z.string().nonempty(REQUIRED_),
    techs: z.string(),
    link: z.string().url().nonempty(REQUIRED_),
})

const ExperienceSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    company: z.string().nonempty(REQUIRED_),
    location: z.string().nonempty(REQUIRED_),
    start_date: z.coerce.date(),
    end_date: z.coerce.date().optional(),
    responsibilities: z.string()
})

const CertificationSchema = z.object({
    title: z.string().nonempty(REQUIRED_),
    provider: z.string().nonempty(REQUIRED_),
    date: z.coerce.date(),
})

const ContactSchema = z.object({
    type: z.nativeEnum(Social),
    link: z.string().url(),
})

export const PortfolioSchema = z.object({
    personal: PersonalInfoSchema,
    skills: z.array(SkillSchema),
    projects: z.array(ProjectSchema),
    experiences: z.array(ExperienceSchema),
    certifications: z.array(CertificationSchema),
    languages: z.array(LanguageSchema),
    contacts: z.array(ContactSchema),
})
