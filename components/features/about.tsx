import { CheckCircle2, Award, Users, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const highlights = [
  { icon: Award, text: "10+ godina profesionalnog iskustva" },
  { icon: Users, text: "500+ uspješno organiziranih evenata" },
  { icon: Clock, text: "Fleksibilnost i prilagodba vašim željama" },
  { icon: CheckCircle2, text: "Vrhunska audio i video oprema" },
];

const skills = [
  "Vjenčanja & romantične proslave",
  "Klubska i elektronska glazba",
  "Retro & hitovi svih vremena",
  "Pop, rock i domaća glazba",
  "Korporativni & formalni eventi",
  "Live remixevi i mashupovi",
];

export function About() {
  return (
    <section id="o-meni" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Placeholder for DJ image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-accent/60 to-secondary/80 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-6xl">🎧</span>
                  </div>
                  <p className="text-lg font-medium opacity-90">DJ Domzy</p>
                  <p className="text-sm opacity-75">Vaš DJ za sve prilike</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 md:right-6 glass rounded-2xl p-4 shadow-xl">
              <div className="text-3xl font-bold gradient-text">10+</div>
              <div className="text-sm text-muted-foreground">Godina iskustva</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <SectionHeading
              title="O meni"
              subtitle="Glazba nije samo moj posao - to je moja strast"
              centered={false}
              className="mb-6"
            />

            <p className="text-muted-foreground text-lg leading-relaxed font-serif">
              Zdravo! Ja sam <span className="text-[#A855F7] font-semibold">DJ Domzy</span>, 
              profesionalni DJ s više od desetljeća iskustva u glazbenoj industriji. 
              Moja misija je stvoriti nezaboravnu atmosferu na svakom događaju.
            </p>

            <p className="text-muted-foreground leading-relaxed font-serif">
              Bilo da se radi o intimnom vjenčanju, velikom korporativnom eventu ili 
              energičnoj klubskoj noći - prilagođavam svaki nastup publici i vašim željama. 
              Vjerujem da prava glazba u pravom trenutku može pretvoriti običan događaj 
              u nezaboravno iskustvo.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item) => (
                <div key={item.text} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="pt-4">
              <h3 className="font-semibold mb-3">Specijalizacije:</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
