import Callout from "@/components/Callout";
import SelfAssessment from "@/components/SelfAssessment";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import CritiqueExercise from "@/components/CritiqueExercise";
import MoleculeSim from "@/components/physics/MoleculeSim";
import ConductionSim from "@/components/physics/ConductionSim";
import HeatingCurve from "@/components/physics/HeatingCurve";

export interface Chapter {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  content: React.ReactNode;
}

export const chapters: Chapter[] = [
  {
    slug: "temperature-vs-heat",
    title: "Temperature vs. Thermal Energy",
    subtitle: "They feel the same — but they're completely different.",
    heroImage:
      "https://images.unsplash.com/photo-1766399654242-e3af854f2a94?w=800&q=80",
    heroAlt: "Metal spoons arranged on a wooden surface, contrasting metal and wood materials",
    content: (
      <>
        <p>
          Go to your kitchen. Touch a metal spoon and a wooden spoon. The metal
          one feels colder, right?
        </p>
        <p>
          <strong>They&apos;re the same temperature.</strong>
        </p>
        <p>
          Both have been sitting in the same room. Both reached the same
          temperature overnight. But the metal <em>feels</em> colder because it
          conducts heat away from your hand faster. Your skin doesn&apos;t sense
          temperature — it senses the <em>rate of heat flow</em>.
        </p>
        <p>
          This is the first big idea: <strong>temperature</strong> and{" "}
          <strong>thermal energy</strong> are different things.
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Temperature</strong> = how fast the molecules are vibrating
            (average kinetic energy per molecule)
          </li>
          <li>
            <strong>Thermal energy</strong> = the total energy of ALL the
            molecules combined
          </li>
        </ul>
        <p>
          A bathtub of warm water (40°C) has more thermal energy than a cup of
          boiling water (100°C). Each molecule in the cup is moving faster, but
          the bathtub has <em>billions</em> more molecules. Total energy wins.
        </p>
        <MoleculeSim />
        <Callout type="exercise" title="Try this at home">
          Fill one bowl with warm tap water and another with the same amount of
          cold tap water. Now drop an ice cube in each. Which melts faster? Time
          it. The warm water melts ice faster because there&apos;s a bigger
          temperature <em>difference</em> — heat flows faster when the gap is
          larger.
        </Callout>
        <SelfAssessment
          id="physics-temp-vs-heat"
          question="How confident are you that you could explain the difference between temperature and thermal energy to a friend?"
          type="slider"
          lowLabel="Not sure yet"
          highLabel="Could teach it"
        />
      </>
    ),
  },
  {
    slug: "conduction",
    title: "Conduction: Heat Through Contact",
    subtitle: "Why your metal spoon handle gets hot in soup.",
    heroImage:
      "https://images.unsplash.com/photo-1605035856436-80b082b9a4cd?w=800&q=80",
    heroAlt: "A metal pot heating over an open fire, showing heat conduction through the metal",
    content: (
      <>
        <p>
          When you stir soup with a metal spoon, the handle gets hot. That&apos;s{" "}
          <strong>conduction</strong> — heat traveling through a material by
          molecule-to-molecule contact.
        </p>
        <p>
          Here&apos;s how it works: the hot soup makes molecules at the tip of
          the spoon vibrate faster. Those molecules bump into their neighbors,
          passing energy along. Those neighbors bump into <em>their</em>{" "}
          neighbors. It&apos;s a chain reaction up the handle, all the way to
          your hand.
        </p>
        <p>
          Some materials conduct heat well (metals, especially copper and
          aluminum). Others are terrible conductors (wood, plastic, air). We call
          the terrible ones <strong>insulators</strong>.
        </p>
        <ConductionSim />
        <Callout type="tip" title="That's why pot handles are plastic">
          Metal conducts heat so well that a metal handle would burn you. Plastic
          and wood are insulators — they slow the chain reaction of molecular
          vibration to a crawl.
        </Callout>
        <CritiqueExercise
          id="physics-conduction-critique"
          prompt="Two students explain why tile floors feel cold in the morning. Who has the better understanding?"
          type="pick-best"
          items={[
            {
              label: "Student A",
              content:
                "Tile is colder than carpet because it's made of stone and stone is naturally cold. That's why they put carpet in bedrooms — to keep the floor warm.",
            },
            {
              label: "Student B",
              content:
                "Tile and carpet are the same temperature, actually. But tile is a better conductor, so heat leaves your foot faster when you step on it. That makes it FEEL colder even though it isn't.",
            },
          ]}
          expertAnalysis="Student B nails it. After sitting in the same room overnight, everything reaches the same temperature (thermal equilibrium). Tile feels cold because it's a good conductor — it pulls heat from your foot quickly. Carpet is an insulator (those fluffy fibers trap air), so heat leaves your foot slowly. Your brain interprets fast heat loss as 'cold surface' — but that's a sensation, not a measurement."
        />
      </>
    ),
  },
  {
    slug: "convection",
    title: "Convection: Heat Through Movement",
    subtitle: 'People say "heat rises." That\'s not quite right.',
    heroImage:
      "https://images.unsplash.com/photo-1768912742570-e10b7d2b755b?w=800&q=80",
    heroAlt: "Steam rising from pots on a stove, showing convection currents in action",
    content: (
      <>
        <p>
          Boil a pot of water and watch closely. You&apos;ll see the water{" "}
          <em>circulating</em> — rising in the middle, sinking at the edges.
        </p>
        <p>
          This is <strong>convection</strong>: heat transfer through the bulk
          movement of fluid (liquid or gas).
        </p>
        <p>
          When water at the bottom absorbs heat, it expands slightly and becomes
          less dense. Less dense things float — just like a hot air balloon. The
          warm water rises. Meanwhile, cooler, denser water at the top sinks to
          take its place. This creates a loop called a{" "}
          <strong>convection cell</strong>.
        </p>
        <p>
          People say &quot;heat rises.&quot; That&apos;s not quite right.{" "}
          <em>Hot fluid</em> rises because it&apos;s less dense. Heat itself
          doesn&apos;t have a direction. In space, without gravity, there&apos;s
          no convection at all — there&apos;s nothing to make the less-dense
          fluid float.
        </p>
        <Callout type="warning" title="Common misconception">
          &quot;Heat rises&quot; is one of the most repeated mistakes in physics.
          Heat doesn&apos;t rise. Hot AIR rises because it&apos;s less dense
          than the cold air around it. The cold air sinks underneath and pushes
          it up, like a bubble in water. No gravity = no convection.
        </Callout>
        <ReflectionPrompt
          id="physics-convection-reflection"
          prompt="When you open the oven door, you feel a blast of hot air on your face. Is that conduction, convection, or radiation? Why?"
        />
      </>
    ),
  },
  {
    slug: "radiation",
    title: "Radiation: Heat Through Empty Space",
    subtitle: "How the Sun heats Earth through literal nothingness.",
    heroImage:
      "https://images.unsplash.com/photo-1761665861443-71545198cb02?w=800&q=80",
    heroAlt: "Campfire flames and sparks radiating heat into the night",
    content: (
      <>
        <p>
          Here&apos;s a puzzle: the Sun heats the Earth. But space is a vacuum —
          there&apos;s literally <em>nothing</em> between us. No air for
          convection. No material for conduction. So how does the heat get here?
        </p>
        <p>
          <strong>Radiation.</strong> Electromagnetic waves — light, infrared,
          ultraviolet — that travel through empty space at the speed of light.
        </p>
        <p>
          Every warm object emits radiation. You&apos;re emitting infrared
          radiation right now (that&apos;s how thermal cameras see you). The
          hotter something is, the more radiation it emits. The Sun is so hot it
          emits visible light.
        </p>
        <p>
          When radiation hits something, it can be{" "}
          <strong>absorbed</strong> (converted to heat),{" "}
          <strong>reflected</strong> (bounced away), or{" "}
          <strong>transmitted</strong> (passed through). Dark colors absorb more
          radiation than light colors — that&apos;s why black cars get hotter in
          the sun and why you wear white in summer.
        </p>
        <Callout type="exercise" title="Campfire experiment (in your mind)">
          Stand next to a campfire. Hold your hand to the <strong>side</strong> —
          you feel warmth. That&apos;s radiation (infrared waves traveling
          sideways through air). Now hold your hand <strong>above</strong> —
          it&apos;s much hotter. That&apos;s radiation PLUS convection (hot air
          rising). The side test isolates radiation. The above test combines
          both.
        </Callout>
        <CritiqueExercise
          id="physics-insulation-critique"
          prompt='Your friend says "My jacket keeps me warm because jackets generate heat." What&apos;s wrong with this statement?'
          type="find-problems"
          items={[
            {
              label: "The claim",
              content:
                "Jackets and blankets make you warm because they generate heat. That's why you feel warm when you put one on. If jackets didn't make heat, they wouldn't work.",
            },
          ]}
          expertAnalysis="Jackets don't generate a single joule of heat. YOUR BODY generates heat (about 100 watts, like a light bulb). The jacket's job is to slow down heat LOSS by trapping still air near your body. Air is a terrible conductor, so the trapped air acts as insulation. Proof: wrap a jacket around a rock. Wait an hour. The rock won't be warm — because the rock doesn't generate heat. A jacket on a snowman actually makes it melt SLOWER by insulating it from warm air."
        />
      </>
    ),
  },
  {
    slug: "phase-changes",
    title: "Phase Changes: The Hidden Heat",
    subtitle: "You're adding heat but the temperature won't budge. Where's it going?",
    heroImage:
      "https://images.unsplash.com/photo-1737099950717-929f96f5419f?w=800&q=80",
    heroAlt: "A translucent ice cube melting on a reflective surface",
    content: (
      <>
        <p>
          Add heat to ice and its temperature rises. But when it hits 0°C… the
          temperature <em>stops rising</em>. You&apos;re still adding heat, but
          the thermometer won&apos;t budge. Where&apos;s the energy going?
        </p>
        <p>
          It&apos;s going into <strong>breaking molecular bonds</strong>. In
          ice, water molecules are locked in a rigid crystal structure. To melt,
          those bonds need to break. All the energy you add goes into snapping
          bonds instead of making molecules move faster. Since temperature
          measures molecular speed, the temperature plateaus during a phase
          change.
        </p>
        <p>
          This &quot;hidden&quot; energy is called <strong>latent heat</strong>{" "}
          (from Latin <em>latere</em>, &quot;to hide&quot;). It works in reverse
          too: when steam condenses to liquid, it RELEASES all that latent heat.
        </p>
        <p>
          That&apos;s why steam burns are worse than boiling water burns. Steam
          at 100°C and water at 100°C are the same temperature. But when steam
          hits your skin and condenses, it dumps its latent heat — 2,260 joules
          per gram — directly onto your skin <em>before</em> the resulting hot
          water even starts to cool. Double whammy.
        </p>
        <HeatingCurve />
        <Callout type="tip" title="This is why sweating works">
          When sweat evaporates, it absorbs latent heat from your skin. Each
          gram of sweat that evaporates removes 2,260 joules of energy from your
          body. On a humid day, sweat can&apos;t evaporate easily — that&apos;s
          why humidity feels so miserable. Your cooling system stops working.
        </Callout>
        <SelfAssessment
          id="physics-final-confidence"
          question="After reading this guide, how well do you understand heat and thermal energy?"
          type="radio"
          options={[
            {
              label: "Just getting started",
              description: "I need to read it again or try the quiz",
            },
            {
              label: "Building intuition",
              description:
                "I get the big ideas but some details are fuzzy",
            },
            {
              label: "Feeling solid",
              description:
                "I could explain most of this to someone else",
            },
            {
              label: "Ready to teach",
              description:
                "I could come up with my own examples and thought experiments",
            },
          ]}
        />
      </>
    ),
  },
];
