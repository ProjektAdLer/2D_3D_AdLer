import { AdLerUIComponent } from "src/Components/Core/Types/ReactTypes";
import tailwindMerge from "../../Utils/TailwindMerge";
import { useTranslation } from "react-i18next";

export default function PrivacyContent({ className }: AdLerUIComponent) {
  const { t: translate } = useTranslation("start");

  return (
    <div
      className={`flex h-full w-full flex-col items-start overflow-y-auto px-8 pt-4 text-adlerdarkblue ${className}`}
    >
      <div className={"mb-4 border-b border-gray-500 pb-2"}>
        <h1 className={tailwindMerge("text-2xl font-bold xl:text-3xl")}>
          Datenschutzerklärung
        </h1>
      </div>

      <div className="space-y-4 pb-8">
        <p className="text-base leading-relaxed">{translate("cookieText")}</p>

        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Verantwortliche Stelle</h2>
          <p className="text-base leading-relaxed">
            Projekt AdLer
            <br />
            Technische Hochschule Aschaffenburg
            <br />
            Hochschule für angewandte Wissenschaften Kempten
            <br />
            ZFH - Zentrum für Fernstudien im Hochschulverbund
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Datenverarbeitung</h2>
          <p className="text-base leading-relaxed">
            Wir verwenden Cookies und ähnliche Technologien auf unserer Website
            und verarbeiten personenbezogene Daten (z.B. IP-Adresse), um Inhalte
            zu personalisieren, Medien von Drittanbietern einzubinden oder
            Zugriffe auf unsere Website zu analysieren.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Ihre Rechte</h2>
          <p className="text-base leading-relaxed">
            Sie haben das Recht, nicht einzuwilligen und Ihre Einwilligung zu
            einem späteren Zeitpunkt zu ändern oder zu widerrufen. Die
            Datenverarbeitung kann mit Ihrer Einwilligung oder auf Basis eines
            berechtigten Interesses erfolgen, dem Sie widersprechen können.
          </p>
        </div>
      </div>
    </div>
  );
}
