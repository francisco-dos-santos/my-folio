"use client";
import { SOCIAIS } from "@/helpers/constants";
import { PortfolioSchema } from "@/helpers/schema";
import { Portfolio, Social } from "@/helpers/types";
import { Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiChevronDown, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { CiDesktop, CiMobile1 } from "react-icons/ci";
import { GoRocket } from "react-icons/go";
import { Desktop } from "../_components/devices/desktop";
import { Mobile } from "../_components/devices/mobile";
import { CopyLinkModal } from "../_components/modal";
import { Template } from "../_components/template";
import { EditorFormLabel } from "./components/EditorFormLabel";
import { EditorSectionHeader } from "./components/EditorSectionHeader";

export default function Page() {
  const [mobileView, setMobileView] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [link, setLink] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Portfolio>({
    resolver: zodResolver(PortfolioSchema),
  });

  const portfolioData = watch();

  const closeModal = () => {
    setViewModal((prev) => !prev);
  };

  const {
    append: appendSkill,
    remove: removeSkill,
    fields: skills,
  } = useFieldArray({
    name: "skills",
    control,
  });
  const {
    append: appendProject,
    remove: removeProject,
    fields: projects,
  } = useFieldArray({
    name: "projects",
    control,
  });
  const {
    append: appendExperience,
    remove: removeExperience,
    fields: experiences,
  } = useFieldArray({
    name: "experiences",
    control,
  });
  const {
    append: appendCertification,
    remove: removeCertification,
    fields: certifications,
  } = useFieldArray({
    name: "certifications",
    control,
  });
  const {
    append: appendContact,
    remove: removeContact,
    fields: contacts,
  } = useFieldArray({
    name: "contacts",
    control,
  });
  const {
    append: appendLanguage,
    remove: removeLanguage,
    fields: languages,
  } = useFieldArray({
    name: "languages",
    control,
  });

  const onSubmit = async (data: Portfolio) => {
    try {
      const request = await fetch("/api/serialize", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await request.json();
      setLink(result.url);
      closeModal();
      console.log(result);
    } catch (error) {
      console.error("Serialize", error);
    }
  };

  return (
    <main className="w-screen h-screen flex items-center">
      <aside className="h-screen p-4 overflow-y-auto bg-white w-[400px]">
        <header className="flex items-center justify-between">
          <h5 className="text-base font-semibold text-gray-500">
            🚀MyFolio Editor
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:text-gray-900 text-sm px-1"
          >
            <BiX className="size-6" />
          </button>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
          className="mt-8 space-y-3"
        >
          {/*Personal*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Dados pessoais" />
            <div className="px-5 py-2 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <EditorFormLabel text="Nome" />
                <input
                  {...register("personal.name")}
                  className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.personal?.name && (
                  <span className="text-xs text-red-500">
                    {errors.personal.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <EditorFormLabel text="Título" />
                <input
                  {...register("personal.title")}
                  className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.personal?.title && (
                  <span className="text-xs text-red-500">
                    {errors.personal?.title.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <EditorFormLabel text="Biografia" />
                <textarea
                  {...register("personal.about")}
                  className="w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm p-2"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex flex-col gap-1">
                <EditorFormLabel text="E-mail" />
                <input
                  {...register("personal.email")}
                  type="email"
                  className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
                {errors.personal?.email && (
                  <span className="text-xs text-red-500">
                    {errors.personal.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <EditorFormLabel text="Endereço" />
                <input
                  {...register("personal.address")}
                  className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </div>
          {/*Projects*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Projectos">
              <button
                type="button"
                onClick={() =>
                  appendProject({
                    title: "",
                    description: "",
                    link: "",
                    techs: "",
                  })
                }
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {projects.map((item, index) => (
                <div key={index} className="py-2">
                  <details className="group" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span className="text-sm">Projecto {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-none transition group-open:rotate-180">
                          <BiChevronDown />
                        </span>
                        <button
                          onClick={() => removeProject(Number(item.id))}
                          type="button"
                          className="p-1 text-red-500"
                        >
                          <BiTrash className="size-4" />
                        </button>
                      </div>
                    </summary>
                    <div className="group-open:animate-fadeIn mt-2 text-neutral-600 flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Nome" />
                        <input
                          {...register(`projects.${index}.title`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Descrição" />
                        <textarea
                          {...register(`projects.${index}.description`)}
                          className="w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm p-2"
                          rows={4}
                        ></textarea>
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Link" />
                        <input
                          {...register(`projects.${index}.link`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Tecnologias (separado por vírgula)" />
                        <input
                          {...register(`projects.${index}.techs`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
          {/*Skills*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Habilidades">
              <button
                type="button"
                onClick={() => appendSkill({ name: "" })}
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className="py-4 text-neutral-600 flex flex-col gap-1"
                >
                  <EditorFormLabel text="Habilidade" />
                  <div className="flex items-center gap-2">
                    <input
                      {...register(`skills.${index}.name`)}
                      className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                    <button
                      onClick={() => removeSkill(Number(item.id))}
                      type="button"
                      className="p-1 text-red-500"
                    >
                      <BiTrash className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*Experiences*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Experiências">
              <button
                type="button"
                onClick={() =>
                  appendExperience({
                    title: "",
                    company: "",
                    location: "",
                    start_date: "",
                    responsibilities: "",
                  })
                }
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {experiences.map((item, index) => (
                <div key={index} className="py-4">
                  <details className="group" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span className="text-sm">Experiência {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-none transition group-open:rotate-180">
                          <BiChevronDown />
                        </span>
                        <button
                          onClick={() => removeExperience(Number(item.id))}
                          type="button"
                          className="p-1 text-red-500"
                        >
                          <BiTrash className="size-4" />
                        </button>
                      </div>
                    </summary>
                    <div className="group-open:animate-fadeIn mt-2 text-neutral-600 flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Cargo" />
                        <input
                          {...register(`experiences.${index}.title`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Empresa" />
                        <input
                          {...register(`experiences.${index}.company`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Local" />
                        <input
                          {...register(`experiences.${index}.location`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Data de início" />
                        <input
                          {...register(`experiences.${index}.start_date`)}
                          type="month"
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Data de término" />
                        <input
                          {...register(`experiences.${index}.end_date`)}
                          type="month"
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Responsabilidades (separado por vírgula)" />
                        <textarea
                          {...register(`experiences.${index}.responsibilities`)}
                          className="w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm p-2"
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
          {/*Certificações*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Certificações">
              <button
                type="button"
                onClick={() =>
                  appendCertification({ title: "", provider: "", date: "" })
                }
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {certifications.map((item, index) => (
                <div key={index} className="py-4">
                  <details className="group" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span className="text-sm">Certificação {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-none transition group-open:rotate-180">
                          <BiChevronDown />
                        </span>
                        <button
                          onClick={() => removeCertification(Number(item.id))}
                          type="button"
                          className="p-1 text-red-500"
                        >
                          <BiTrash className="size-4" />
                        </button>
                      </div>
                    </summary>
                    <div className="group-open:animate-fadeIn mt-2 text-neutral-600 flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Título" />
                        <input
                          {...register(`certifications.${index}.title`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Entidade" />
                        <input
                          {...register(`certifications.${index}.provider`)}
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="Data de emissão" />
                        <input
                          {...register(`certifications.${index}.date`)}
                          type="month"
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
          {/*Contacts*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Contactos">
              <button
                type="button"
                onClick={() => appendContact({ type: Social[0], link: "" })}
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {contacts.map((item, index) => (
                <div key={item.id} className="py-4">
                  <details className="group" open>
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span className="text-sm">Contacto {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-none transition group-open:rotate-180">
                          <BiChevronDown />
                        </span>
                        <button
                          onClick={() => removeContact(Number(item.id))}
                          type="button"
                          className="p-1 text-red-500"
                        >
                          <BiTrash className="size-4" />
                        </button>
                      </div>
                    </summary>
                    <div className="group-open:animate-fadeIn mt-2 text-neutral-600 flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          Rede
                        </label>
                        <select
                          {...register(`contacts.${index}.type`)}
                          className="p-2 border w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                        >
                          {SOCIAIS.map((item) => (
                            <option key={item.type} value={Social[item.type]}>
                              {Social[item.type]}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <EditorFormLabel text="URL" />
                        <input
                          {...register(`contacts.${index}.link`)}
                          type="url"
                          className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        />
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
          {/*Languages*/}
          <div className="w-full flex flex-col gap-2 py-4 border">
            <EditorSectionHeader title="Idiomas">
              <button
                type="button"
                onClick={() => appendLanguage({ name: "" })}
                className="rounded-md border shadow-sm inline-block p-3 text-gray-700 hover:bg-gray-50"
              >
                <BiPlus className="size-4" />
              </button>
            </EditorSectionHeader>
            <div className="px-5 divide-y divide-neutral-200 max-h-48 py-2 overflow-y-auto">
              {languages.map((item, index) => (
                <div
                  key={index}
                  className="py-4 text-neutral-600 flex flex-col gap-1"
                >
                  <EditorFormLabel text="Idioma" />

                  <div className="flex items-center gap-2">
                    <input
                      {...register(`languages.${index}.name`)}
                      className="p-2 border w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                    />
                    <button
                      onClick={() => removeLanguage(Number(item.id))}
                      type="button"
                      className="p-1 text-red-500"
                    >
                      <BiTrash className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            leftIcon={<GoRocket />}
            colorScheme={"blue"}
            w={"100%"}
          >
            Publicar
          </Button>
        </form>
      </aside>
      <section className="size-full flex-1 bg-gray-200">
        {mobileView ? (
          <Mobile>
            <Template portfolio={portfolioData} />
          </Mobile>
        ) : (
          <Desktop>
            <Template portfolio={portfolioData} />
          </Desktop>
        )}
        <button
          onClick={() => setMobileView((prev) => !prev)}
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded-full shadow-lg"
        >
          {!mobileView ? (
            <CiMobile1 className="size-6" />
          ) : (
            <CiDesktop className="size-6" />
          )}
        </button>
      </section>
      {viewModal && <CopyLinkModal onClose={closeModal} link={link} />}
    </main>
  );
}
