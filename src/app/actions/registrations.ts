"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const artsSchema = z.object({
  afname: z.string().min(2, "First name is too short"),
  alname: z.string().min(2, "Last name is too short"),
  aage: z.coerce.number().min(3, "Please enter a valid age"),
  acountry: z.string().min(2, "Please enter your country"),
  aemail: z.string().email("Please enter a valid email"),
  aphone: z.string().min(5, "Phone number is too short"),
  proficiency: z.string().min(1, "Please select your proficiency"),
  amotivation: z.string().min(1, "Please enter your motivation"),
});

const festivalSchema = z.object({
  fname: z.string().min(2, "First name must be at least 2 characters"),
  clname: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.coerce.number().min(1, "Please enter a valid age"),
  fcountry: z.string().min(1, "Please select a country"),
  address: z.string().min(1, "Please enter an address"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number is too short"),
  participantType: z.string().min(1, "Please select participant type"),
  festivals: z.string().min(1, "Please select at least one festival"),
  date: z.string().min(1, "Please select a preferred date"),
  cmotivation: z.string().min(1, "Please enter your motivation"),
});

const culinarySchema = z.object({
  cfname: z.string().min(2, "First name is too short"),
  clname: z.string().min(2, "Last name is too short"),
  cage: z.coerce.number().min(1, "Please enter a valid age"),
  ccountry: z.string().min(1, "Please enter your country"),
  cemail: z.string().email("Please enter a valid email"),
  cphone: z.string().min(5, "Phone number is too short"),
  skillLevel: z.string().min(1, "Please select your skill level"),
  categories: z.string().min(1, "Please select at least one category"),
  cmotivation: z.string().min(1, "Please enter your motivation"),
});

const ritualSchema = z.object({
  sname: z.string().min(2, "Spiritual name must be at least 2 characters"),
  clan: z.string().min(2, "Clan name must be at least 2 characters"),
  sage: z.coerce.number().min(18, "Must be at least 18 for sacred rites"),
  rcountry: z.string().min(1, "Please select country"),
  site: z.string().min(2, "Please enter your ancestral village"),
  role: z.string().min(1, "Please select ritual role"),
  semail: z.string().email("Please enter a valid email"),
  sphone: z.string().min(5, "Phone number is too short"),
  ceremonies: z.string().min(1, "Please select ceremony"),
});

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function registerArtsAcademy(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validation = artsSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await prisma.artsAcademyRegistration.create({
      data: {
        firstName: validation.data.afname,
        lastName: validation.data.alname,
        age: validation.data.aage,
        country: validation.data.acountry,
        email: validation.data.aemail,
        phone: validation.data.aphone,
        proficiency: validation.data.proficiency,
        motivation: validation.data.amotivation,
        portfolio: "uploaded_file_placeholder",
      }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Arts Academy Registration Error:", error);
    return { success: false, error: "Failed to register. Please check your data." };
  }
}

export async function registerFestival(formData: FormData) {
  const festivals = formData.getAll("festivals").join(", ");
  const rawData = { ...Object.fromEntries(formData.entries()), festivals };
  const validation = festivalSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await prisma.festivalRegistration.create({
      data: {
        firstName: validation.data.fname,
        lastName: validation.data.clname,
        age: validation.data.age,
        country: validation.data.fcountry,
        address: validation.data.address,
        email: validation.data.email,
        phone: validation.data.phone,
        participantType: validation.data.participantType,
        festivals: validation.data.festivals,
        preferredDate: new Date(validation.data.date),
        motivation: validation.data.cmotivation,
      }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Festival Registration Error:", error);
    return { success: false, error: "Failed to register" };
  }
}

export async function registerCulinaryAcademy(formData: FormData) {
  const categories = formData.getAll("categories").join(", ");
  const rawData = { ...Object.fromEntries(formData.entries()), categories };
  const validation = culinarySchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await prisma.culinaryAcademyRegistration.create({
      data: {
        firstName: validation.data.cfname,
        lastName: validation.data.clname,
        age: validation.data.cage,
        country: validation.data.ccountry,
        email: validation.data.cemail,
        phone: validation.data.cphone,
        skillLevel: validation.data.skillLevel,
        categories: validation.data.categories,
        motivation: validation.data.cmotivation,
      }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Culinary Academy Registration Error:", error);
    return { success: false, error: "Failed to register" };
  }
}

export async function registerRitual(formData: FormData) {
  const ceremonies = formData.getAll("ceremonies").join(", ");
  const rawData = { ...Object.fromEntries(formData.entries()), ceremonies };
  const validation = ritualSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await prisma.ritualRegistration.create({
      data: {
        spiritualName: validation.data.sname,
        clan: validation.data.clan,
        age: validation.data.sage,
        country: validation.data.rcountry,
        site: validation.data.site,
        role: validation.data.role,
        email: validation.data.semail,
        phone: validation.data.sphone,
        ceremonies: validation.data.ceremonies,
      }
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ritual Registration Error:", error);
    return { success: false, error: "Failed to register" };
  }
}

export async function subscribeToNewsletter(formData: FormData) {
  const validation = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await prisma.newsletterRegistration.create({
      data: { email: validation.data.email },
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, error: "You are already part of the Vibe!" };
    }
    return { success: false, error: "Failed to subscribe" };
  }
}
